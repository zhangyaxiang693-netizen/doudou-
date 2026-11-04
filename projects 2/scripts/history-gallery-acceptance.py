"""Browser acceptance for the project gallery, against an isolated history server."""
import argparse
import json
import re
import uuid
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import expect, sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument("--url", default="http://127.0.0.1:5091")
parser.add_argument("--layout-only", action="store_true")
parser.add_argument("--screenshot", type=Path)
args = parser.parse_args()
assert urlparse(args.url).hostname in {"127.0.0.1", "localhost"}, "Use an isolated local server"
errors = []
results = []


def passed(label):
    results.append(label)
    print("PASS", label, flush=True)


def save_response(response):
    return response.request.method == "PUT" and bool(
        re.search(r"/api/project-records/[^/]+$", response.url)
    ) or response.request.method == "POST" and response.url.endswith("/commit")


def mine(page):
    page.locator("[data-open-my-projects]:visible").click()
    expect(page.locator(".project-gallery")).to_be_visible()
    expect(page.get_by_text("正在加载项目…", exact=True)).not_to_be_visible()


def menu(page, record_id):
    return page.locator(
        f'[data-restore-collab-record="{record_id}"]'
    ).locator("xpath=..").locator("[data-history-menu] > summary")


with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    )
    context = browser.new_context(viewport={"width": 1440, "height": 1000})
    user_id = f"gallery-user-{uuid.uuid4().hex}"
    session = context.request.post(
        f"{args.url}/__history_test/session", data={"id": user_id}
    )
    assert session.ok and session.json()["success"], "Isolated acceptance server required"
    page = context.new_page()
    page.on("pageerror", lambda error: errors.append(error.stack))
    try:
        page.goto(args.url)
        page.wait_for_load_state("networkidle")
        mine(page)
        expect(page.locator(".project-history-list")).to_have_count(0)
        expect(page.locator(".project-gallery-new > summary")).to_be_visible()
        if args.layout_only:
            passed("卡片布局入口")
        else:
            page.locator(".project-gallery-new > summary").click()
            page.locator("[data-demo-open-file-modal]").click()
            expect(page.locator("[data-demo-file-modal]")).to_be_visible()
            page.locator("[data-prd-blueprint-template-select]").select_option(
                label="模板3 抽奖 + 消耗返"
            )
            page.locator("[data-prd-blueprint-table-submit]").click()
            expect(page.locator('[data-prd-table-row="1"]')).to_be_visible()
            page.locator('[data-prd-table-row="1"]').fill("周年庆 · 流量好礼")
            page.locator('[data-prd-table-row="3"]').fill("周年\n好礼")
            page.locator('[data-save]:visible').click()
            with page.expect_response(save_response) as response:
                page.locator('[data-save-scope="personal"]').click()
            saved = response.value.json()["data"]["record"]
            record_id = saved["id"]
            mine(page)
            card = page.locator(f'[data-restore-collab-record="{record_id}"]')
            expect(card).to_be_visible()
            expect(card).to_contain_text("周年庆 · 流量好礼")
            card.click()
            expect(page.locator('[data-prd-table-row="3"]')).to_have_value("周年\n好礼")
            page.locator("[data-demo-generate-activity]").click()
            expect(page.locator(".guided-canvas-world")).not_to_have_class(
                re.compile("is-initializing"), timeout=15000
            )
            page.locator('[data-edit-prop="dateText"]:visible').first.fill("11月4日")
            page.locator('[data-edit-prop="dateText"]:visible').first.press("Tab")
            page.locator("[data-demo-back-analysis]").click()
            expect(page.locator('[data-prd-table-row="4"]')).to_have_value("11月4日")
            page.locator('[data-save]:visible').click()
            with page.expect_response(save_response) as response:
                page.locator("[data-save-current]").click()
            assert response.value.json()["data"]["record"]["id"] == record_id
            mine(page)
            page.locator(f'[data-restore-collab-record="{record_id}"]').click()
            expect(page.locator('[data-prd-table-row="4"]')).to_have_value("11月4日")
            mine(page)
            passed("新建会场 → 保存 → 卡片打开 → 预览编辑 → 表格 → 覆盖 → 重开")

            fixture = context.request.get(
                f"{args.url}/api/project-records/{record_id}"
            ).json()["data"]["record"]["snapshot"]
            names = [
                "双十一 · 消耗返活动", "新客专享流量券", "夏日投放计划",
                "任务通关 · 抽奖会场", "品牌增长计划", "会员专属权益",
                "复投激励 · 好礼加码",
            ]
            seeded = []
            for name in names:
                fixture_id = f"gallery-{uuid.uuid4().hex}"
                response = context.request.put(
                    f"{args.url}/api/project-records/{fixture_id}",
                    data={"name": name, "scope": "personal", "snapshot": fixture, "create": True,
                          "operationId": str(uuid.uuid4())},
                )
                assert response.ok, response.text()
                seeded.append(fixture_id)
            page.locator("[data-history-refresh]").click()
            expect(page.locator(".project-card:not(.project-card--local)")).to_have_count(8, timeout=15000)
            assert page.locator('[aria-label="个人项目"] .project-history-grid').evaluate(
                "el => getComputedStyle(el).gridTemplateColumns.split(' ').length"
            ) == 4
            passed("1440px 四列卡片 / 真实名称和时间")
            if args.screenshot:
                # A fresh browser shows saved cards without this editor's local backups.
                preview_context = browser.new_context(viewport={"width": 1440, "height": 1000})
                preview_context.request.post(
                    f"{args.url}/__history_test/session",
                    data={"id": user_id},
                )
                preview = preview_context.new_page()
                preview.goto(args.url)
                preview.wait_for_load_state("networkidle")
                mine(preview)
                expect(preview.locator(".project-card")).to_have_count(8, timeout=15000)
                preview.screenshot(path=str(args.screenshot), full_page=True)
                preview_context.close()

            menu(page, record_id).click()
            expect(page.locator(f'[data-delete-project="{record_id}"]')).to_be_visible()
            menu(page, seeded[0]).click()
            expect(page.locator("[data-history-menu][open]")).to_have_count(1)
            page.keyboard.press("Escape")
            expect(page.locator("[data-history-menu][open]")).to_have_count(0)
            expect(menu(page, seeded[0])).to_be_focused()
            menu(page, record_id).focus()
            page.keyboard.press("Space")
            expect(page.locator(f'[data-delete-project="{record_id}"]')).to_be_visible()
            page.locator(".project-gallery-header h1").click()
            expect(page.locator("[data-history-menu][open]")).to_have_count(0)
            passed("更多菜单 / 单个展开 / 外部点击 / Esc / 键盘空格")

            page.locator('[data-history-scope="personal"]').focus()
            page.keyboard.press("ArrowRight")
            expect(page.locator('[data-history-scope="team"]')).to_have_attribute("aria-selected", "true")
            expect(page.locator('[data-history-scope="team"]')).to_be_focused()
            page.locator("[data-history-group-select]").select_option("acceptance-team")
            expect(page.locator("[data-history-group-select]")).to_have_value("acceptance-team")
            page.locator('[data-history-scope="team"]').focus()
            page.keyboard.press("Home")
            expect(page.locator('[data-history-scope="personal"]')).to_have_attribute("aria-selected", "true")
            expect(page.locator('[data-history-scope="personal"]')).to_be_focused()
            passed("底部键盘范围切换 / 当前组选择")

            menu(page, record_id).click()
            with page.expect_response(save_response) as response:
                page.locator(f'[data-copy-record-team="{record_id}"]').click()
            group_record = response.value.json()["data"]["record"]["id"]
            expect(page.locator('[data-history-scope="team"]')).to_have_attribute(
                "aria-selected", "true"
            )
            expect(page.locator("[data-history-group-select]")).to_have_value("acceptance-team")
            expect(page.locator(f'[data-restore-collab-record="{group_record}"]')).to_be_visible()
            menu(page, group_record).click()
            with page.expect_response(save_response) as response:
                page.locator(f'[data-copy-record-personal="{group_record}"]').click()
            personal_copy = response.value.json()["data"]["record"]["id"]
            expect(page.locator('[data-history-scope="personal"]')).to_have_attribute(
                "aria-selected", "true"
            )
            expect(page.locator(f'[data-restore-collab-record="{personal_copy}"]')).to_be_visible()
            page.locator(f'[data-restore-collab-record="{personal_copy}"]').click()
            expect(page.locator('[data-prd-table-row="4"]')).to_have_value("11月4日")
            mine(page)
            passed("卡片菜单复制到组 / 复制回个人 / 内容完整")

            menu(page, personal_copy).click()
            page.once("dialog", lambda dialog: dialog.dismiss())
            page.locator(f'[data-delete-project="{personal_copy}"]').click()
            expect(page.locator(f'[data-restore-collab-record="{personal_copy}"]')).to_be_visible()
            page.once("dialog", lambda dialog: dialog.accept())
            with page.expect_response(
                lambda response: response.request.method == "DELETE"
                and response.url.endswith(personal_copy)
            ):
                page.locator(f'[data-delete-project="{personal_copy}"]').click()
            expect(page.locator(f'[data-restore-collab-record="{personal_copy}"]')).to_have_count(0)
            passed("删除确认取消 / 确认删除")

            for index in range(14):
                fixture_id = f"gallery-{uuid.uuid4().hex}"
                response = context.request.put(
                    f"{args.url}/api/project-records/{fixture_id}",
                    data={"name": "长标题验证 · " + "活动页面与资源素材" * 8 if index == 0
                          else f"历史分页验证 {index + 1:02d}",
                          "scope": "personal", "snapshot": fixture, "create": True,
                          "operationId": str(uuid.uuid4())},
                )
                assert response.ok, response.text()
            page.locator("[data-history-refresh]").click()
            expect(page.locator(".project-card:not(.project-card--local)")).to_have_count(20, timeout=15000)
            page.locator("[data-history-more]").click()
            expect(page.locator(".project-card:not(.project-card--local)")).to_have_count(22, timeout=15000)
            passed("20条分页 / 继续加载无重复")
            for width, columns in [(2048, 4), (900, 2), (390, 1)]:
                page.set_viewport_size({"width": width, "height": 1000})
                actual_columns = page.locator('[aria-label="个人项目"] .project-history-grid').evaluate(
                    "el => getComputedStyle(el).gridTemplateColumns.split(' ').length"
                )
                assert actual_columns == columns, (width, actual_columns)
                assert page.locator("body").evaluate(
                    "el => el.scrollWidth <= window.innerWidth"
                ), f"{width}px出现横向溢出"
                expect(page.locator("[data-history-scope=team]")).to_be_in_viewport()
                menu(page, record_id).click()
                panel = page.locator(f'[data-copy-record-team="{record_id}"]').locator("xpath=..")
                rect = panel.bounding_box()
                assert rect["x"] >= 0 and rect["x"] + rect["width"] <= width
                page.keyboard.press("Escape")
            passed("2048 / 900 / 390px 响应式 / 长标题 / 菜单与底栏无溢出")

            page.set_viewport_size({"width": 1440, "height": 1000})
            page.locator(".project-gallery-new > summary").click()
            page.locator("[data-open-resource-flow]").click()
            expect(page.locator("[data-resource-generate]")).to_be_visible()
            page.locator('[data-resource-field="top-banner|base|headlineText"]').fill("资源位卡片验收")
            page.locator('[data-save]:visible').click()
            page.locator("[data-save-project-name]").fill("资源位 · 卡片验收")
            with page.expect_response(save_response) as response:
                page.locator('[data-save-scope="personal"]').click()
            resource_id = response.value.json()["data"]["record"]["id"]
            mine(page)
            page.locator(f'[data-restore-collab-record="{resource_id}"]').click()
            expect(page.locator('[data-resource-field="top-banner|base|headlineText"]')).to_have_value("资源位卡片验收")
            passed("新建资源位 / 保存 / 卡片打开")
            page.locator('[data-resource-field="top-banner|base|headlineText"]').fill("断网编辑需要恢复")
            context.set_offline(True)
            page.locator('[data-save]:visible').click()
            page.locator("[data-save-current]").click()
            expect(page.locator("[data-history-save-notice]")).to_contain_text(
                re.compile("网络|保存分片"), timeout=15000
            )
            context.set_offline(False)
            page.reload()
            page.wait_for_load_state("networkidle")
            mine(page)
            draft = page.locator('[data-restore-local-draft]').filter(
                has_text="资源位 · 卡片验收"
            )
            expect(draft).to_be_visible(timeout=15000)
            draft.click()
            expect(page.locator('[data-resource-field="top-banner|base|headlineText"]')).to_have_value("断网编辑需要恢复")
            page.locator('[data-save]:visible').click()
            with page.expect_response(save_response) as response:
                page.locator("[data-save-current]").click()
            assert response.value.json()["data"]["record"]["id"] == resource_id
            passed("断网编辑 / 刷新后本地备份卡片恢复 / 再次保存")
            page.locator('[data-resource-field="top-banner|base|headlineText"]').fill("仅本机保留的修改")
            mine(page)
            draft = page.locator("[data-restore-local-draft]").filter(has_text="资源位 · 卡片验收")
            expect(draft).to_be_visible(timeout=15000)
            draft_card = draft.locator("xpath=..")
            draft_card.locator("[data-history-menu] > summary").click()
            page.once("dialog", lambda dialog: dialog.dismiss())
            draft_card.locator("[data-remove-local-draft]").click()
            expect(draft).to_be_visible()
            page.once("dialog", lambda dialog: dialog.accept())
            draft_card.locator("[data-remove-local-draft]").click()
            expect(draft).to_have_count(0, timeout=15000)
            page.locator(f'[data-restore-collab-record="{resource_id}"]').click()
            expect(page.locator('[data-resource-field="top-banner|base|headlineText"]')).to_have_value("断网编辑需要恢复")
            passed("取消 / 删除本地备份，云端记录保留")
            assert not errors, errors
    finally:
        if errors:
            print(json.dumps(errors, ensure_ascii=False, indent=2))
        browser.close()
