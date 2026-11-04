export function createTemplateOverlay(catalogues) {
  const originals = { pages: new Map(), custom: new Map(), molecules: new Map() };
  function replace(kind, template) {
    const list = catalogues[kind];
    const index = list.findIndex((item) => item.id === template.id);
    if (!originals[kind].has(template.id)) originals[kind].set(template.id, index >= 0 ? list[index] : null);
    const value = structuredClone(template);
    if (index >= 0) list[index] = value;
    else list.push(value);
  }
  function reset() {
    for (const kind of Object.keys(originals)) {
      const list = catalogues[kind];
      for (const [id, original] of originals[kind]) {
        const index = list.findIndex((item) => item.id === id);
        if (index < 0) { if (original) list.push(original); }
        else if (original) list[index] = original;
        else list.splice(index, 1);
      }
      originals[kind].clear();
    }
  }
  return {
    reset,
    apply(snapshot) {
      reset();
      const templates = snapshot.templates || {};
      for (const template of templates.referencedMoleculeTemplates || []) replace("molecules", template);
      const definitions = new Map([
        ...(templates.referencedPageTemplates || []), templates.activePageTemplate,
      ].filter(Boolean).map((item) => [item.id, item]));
      for (const template of definitions.values()) {
        const kind = catalogues.pages.some((item) => item.id === template.id) ? "pages" : "custom";
        replace(kind, { ...template, ...(kind === "custom" ? { isCustom: true } : {}) });
      }
    },
    persistable(list, kind) {
      return list.map((item) => originals[kind].has(item.id) ? originals[kind].get(item.id) : item).filter(Boolean);
    },
  };
}
