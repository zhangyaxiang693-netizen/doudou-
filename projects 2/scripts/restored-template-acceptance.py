"""Use synthetic legacy records to verify template identity and audience round trips.

Only runs against the isolated local history server. Never reads production records.
"""
import argparse
from copy import deepcopy
import json
import re
from pathlib import Path
from urllib.parse import urlparse
import uuid

from playwright.sync_api import expect, sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument("--url", default="http://127.0.0.1:5091")
parser.add_argument("--output", type=Path, required=True)
args = parser.parse_args()
assert urlparse(args.url).hostname in {"127.0.0.1", "localhost"}
assert args.output.is_dir()
results = []
errors = []
old_id = "acceptance-saved-consumption"
template_name = "模板3 抽奖 + 消耗返"
names = [f"回归人群{i + 1:02d}" for i in range(26)]


def passed(label):
    results.append(label)
    print("PASS", label, flush=True)


def is_save(response):
    return (
        response.request.method == "PUT"
        and bool(re.search(r"/api/project-records/[^/]+$", response.url))
    ) or (
        response.request.method == "POST" and response.url.endswith("/commit")
    )


def save(page, current=False):
    page.locator("[data-save]:visible").click()
    with page.expect_response(is_save, timeout=30000) as response:
        page.locator("[data-save-current]" if current else
                     '[data-save-scope="personal"]').click()
    body = response.value.json()
    assert response.value.ok and body["success"], body
    return body["data"]["record"]["id"]


def fetch_snapshot(context, record_id):
    response = context.request.get(f"{args.url}/api/project-records/{record_id}")
    assert response.ok, response.text()
    return response.json()["data"]["record"]["snapshot"]


def seed(context, snapshot, name):
    record_id = f"restored-fixture-{uuid.uuid4().hex}"
    response = context.request.put(
        f"{args.url}/api/project-records/{record_id}",
        data={
            "name": name, "scope": "team", "teamId": "acceptance-team",
            "snapshot": snapshot, "create": True, "operationId": str(uuid.uuid4()),
        },
    )
    assert response.ok, response.text()
    return record_id


def open_team_record(page, record_id):
    page.locator("[data-open-my-projects]:visible").click()
    expect(page.locator(".project-gallery")).to_be_visible()
    page.locator('[data-history-scope="team"]').click()
    page.locator("[data-history-group-select]").select_option("acceptance-team")
    page.locator(f'[data-restore-collab-record="{record_id}"]').click()


def reward_key(name):
    return f"页面模板变量版本｜4｜{name}｜3|1.amountText2"


def table_checks(page, snapshot, changed=None):
    group = page.locator(f'[data-prd-template-module-row="{old_id}|3"]')
    expect(group).to_be_visible()
    assert group.locator("[data-prd-version-name]").evaluate_all(
        "els=>els.map(el=>el.value)"
    ) == names
    for index, name in enumerate(names):
        for prop, value in {
            "amountText2": changed if index == 1 and changed else str(20 + index),
            "amountText3": str(40 + index),
            "amountText4": str(110 + index),
            "consumeAmountText1": "30", "consumeAmountText2": "68",
            "consumeAmountText3": "120", "consumeAmountText4": "180",
        }.items():
            key = f"页面模板变量版本｜4｜{name}｜3|1.{prop}"
            row_index = next(i for i, row in enumerate(snapshot["editor"]["prdTableRows"])
                             if row["key"] == key)
            expect(group.locator(f'[data-prd-table-row="{row_index}"]')).to_have_value(value)


def variant_checks(snapshot, changed=None):
    page = next(page for page in snapshot["editor"]["pages"]
                if page.get("sourcePageTemplateId") == old_id)
    node = page["nodes"][3]
    variants = node["guidedLineageVariants"]
    assert [variant["title"] for variant in variants] == names
    for index, variant in enumerate(variants):
        props = variant["node"]["children"][1]["props"]
        assert props["amountText2"] == (
            changed if index == 1 and changed else str(20 + index)
        ), (index, props)
        assert props["amountText3"] == str(40 + index)
        assert props["amountText4"] == str(110 + index)
        assert [props[f"consumeAmountText{i}"] for i in range(1, 5)] == [
            "30", "68", "120", "180",
        ]


with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    )
    context = browser.new_context(viewport={"width": 1440, "height": 1000})
    context.request.post(f"{args.url}/__history_test/session",
                         data={"id": f"template-user-{uuid.uuid4().hex}"})
    page = context.new_page()
    page.on("pageerror", lambda error: errors.append(error.stack))
    try:
        # Obtain a valid fixture through real page generation and saving.
        page.goto(args.url)
        page.wait_for_load_state("networkidle")
        page.locator("[data-demo-open-file-modal]").click()
        page.locator("[data-prd-blueprint-template-select]").select_option(label=template_name)
        page.locator("[data-prd-blueprint-table-submit]").click()
        page.locator('[data-prd-table-row="1"]').fill("本地旧模板人群回归")
        page.locator("[data-demo-generate-activity]").click()
        expect(page.locator("[data-demo-back-analysis]")).to_be_visible()
        base_id = save(page)
        base = fetch_snapshot(context, base_id)
        source_id = base["templates"]["activePageTemplate"]["id"]

        def replace_id(value):
            if isinstance(value, dict):
                return {key.replace(source_id, old_id): replace_id(item)
                        for key, item in value.items()}
            if isinstance(value, list):
                return [replace_id(item) for item in value]
            return value.replace(source_id, old_id) if isinstance(value, str) else value

        fixture = replace_id(deepcopy(base))
        # Custom templates serialize materialized nodes; built-ins use schema tuples.
        primary_nodes = next(page["nodes"] for page in fixture["editor"]["pages"]
                             if page.get("sourcePageTemplateId") == old_id)
        for template in [fixture["templates"]["activePageTemplate"],
                         *fixture["templates"]["referencedPageTemplates"]]:
            if template["id"] == old_id:
                template["isCustom"] = True
                template["nodes"] = deepcopy(primary_nodes)
        fixture["schemaVersion"] = 2
        fixture["resume"]["stage"] = "blueprint"
        fixture["editor"]["prdManualModuleVersions"] = {
            f"page-template｜{old_id}｜3": [
                {"id": f"imported_acceptance_{i}", "name": name}
                for i, name in enumerate(names)
            ],
        }
        base_rows = [row for row in fixture["editor"]["prdTableRows"]
                     if row["key"].startswith("页面模板变量｜4｜")]
        for index, name in enumerate(names):
            overrides = {
                "1.amountText2": str(20 + index), "1.amountText3": str(40 + index),
                "1.amountText4": str(110 + index), "1.consumeAmountText1": "30",
                "1.consumeAmountText2": "68", "1.consumeAmountText3": "120",
                "1.consumeAmountText4": "180",
            }
            for row in base_rows:
                compound = row["key"].split("｜")[-1]
                value = overrides.get(compound.split("|")[-1], row["value"])
                fixture["editor"]["prdTableRows"].append({
                    "key": f"页面模板变量版本｜4｜{name}｜{compound}", "value": value,
                })
        first_fixture = seed(context, fixture, "隔离回归 · 26人群旧模板")

        # Simulate another same-name template already present in this browser.
        newer = deepcopy(base["templates"]["activePageTemplate"])
        newer["id"] = "acceptance-newer-local"
        newer["isCustom"] = True
        newer["nodes"] = deepcopy(next(page["nodes"] for page in base["editor"]["pages"]
                                      if page.get("sourcePageTemplateId") == source_id))
        page.evaluate(
            "template=>localStorage.setItem('builder_page_templates_empty_v1',JSON.stringify([template]))",
            newer,
        )
        page.reload()
        page.wait_for_load_state("networkidle")
        open_team_record(page, first_fixture)
        (args.output / "旧记录人群-表格诊断.json").write_text(json.dumps(
            page.locator(f'[data-prd-template-module-row="{old_id}|3"]').evaluate(
                """el=>({text:el.textContent.slice(0,3000),
                inputs:[...el.querySelectorAll('input,textarea,select')].map(i=>
                  ({label:i.getAttribute('aria-label'),value:i.value,data:i.dataset}))})"""
            ), ensure_ascii=False, indent=2), encoding="utf8")
        table_checks(page, fixture)
        passed("同名不同ID旧模板恢复：26人群、78奖励金额、104门槛均与输入一致")

        # Let the real generator produce all preview variants from these rows.
        page.locator("[data-demo-generate-activity]").click()
        expect(page.locator("[data-demo-back-analysis]")).to_be_visible()
        save(page, current=True)
        generated = fetch_snapshot(context, first_fixture)
        variant_checks(generated)
        generated["schemaVersion"] = 2
        generated["resume"]["stage"] = "preview"
        preview_fixture = seed(context, generated, "隔离回归 · 旧记录预览往返")
        open_team_record(page, preview_fixture)
        expect(page.locator("[data-demo-back-analysis]")).to_be_visible()
        page.locator("[data-demo-back-analysis]").click()
        table_checks(page, generated)
        page.locator(f'[data-prd-template-module-row="{old_id}|3"]').scroll_into_view_if_needed()
        page.screenshot(path=str(args.output / "旧记录26人群-返回表格.png"))
        passed("schemaVersion 2小组记录：从预览返回表格保留26人群及全部档位金额")

        target_index = next(i for i, row in enumerate(generated["editor"]["prdTableRows"])
                            if row["key"] == reward_key(names[1]))
        page.locator(f'[data-prd-table-row="{target_index}"]').fill("888")
        page.locator("[data-demo-generate-activity]").click()
        expect(page.locator("[data-demo-back-analysis]")).to_be_visible()
        save(page, current=True)
        after = fetch_snapshot(context, preview_fixture)
        variant_checks(after, changed="888")
        page.locator("[data-demo-back-analysis]").click()
        table_checks(page, after, changed="888")
        page.reload()
        page.wait_for_load_state("networkidle")
        open_team_record(page, preview_fixture)
        expect(page.locator("[data-demo-back-analysis]")).to_be_visible()
        page.locator("[data-demo-back-analysis]").click()
        table_checks(page, after, changed="888")
        variant_checks(fetch_snapshot(context, preview_fixture), changed="888")
        passed("人群02修改为888 → 预览 → 覆盖 → 刷新 → 重开：其余25人群不变")
        assert not errors, errors
    finally:
        (args.output / "旧记录人群-浏览器验收.json").write_text(
            json.dumps({"environment": args.url, "fixture": "synthetic, no production data",
                        "passed": results, "pageErrors": errors}, ensure_ascii=False, indent=2),
            encoding="utf8",
        )
        browser.close()
