const copy = (value) => value === undefined ? undefined : structuredClone(value);
const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function entries(array) {
  const counts = new Map();
  return (array || []).map((item, index) => {
    let key;
    if (!object(item)) key = `index:${index}`;
    else if (item.isSystemFallback) key = `fallback:${item.name}`;
    else if (item.resourceSlotId) key = `slot:${item.resourceSlotId}`;
    else if (item.nodes) key = `page:${item.sourceContextId || item.sourcePageTemplateId || item.id}`;
    else if (item.sourcePageTemplateNodeKey) key = `template-key:${item.sourcePageTemplateNodeKey}`;
    else if (item.sourcePageTemplateNodeIndex !== undefined) key = `template:${item.sourcePageTemplateNodeIndex}`;
    else if (item.schemaId) key = `module:${item.sourceModuleId || item.schemaId}`;
    else key = `id:${item.id ?? index}`;
    const ordinal = counts.get(key) || 0;
    counts.set(key, ordinal + 1);
    return [`${key}:${ordinal}`, item];
  });
}

function merge(current, baseline, generated, field = "") {
  // Generated node/page IDs are implementation details; preserve saved identities.
  if (field === "id" && current !== undefined) return copy(current);
  if (Array.isArray(generated) && Array.isArray(baseline) && Array.isArray(current)) {
    const old = new Map(entries(baseline));
    const edited = new Map(entries(current));
    const next = new Map(entries(generated));
    const result = [];
    const resultKeys = [];
    // Preserve user order for existing entries, append newly generated entries.
    for (const [key, value] of edited) {
      if (!old.has(key) || next.has(key)) {
        result.push(!old.has(key) ? copy(value) : merge(value, old.get(key), next.get(key)));
        resultKeys.push(key);
      }
    }
    let previousKey;
    for (const [key, value] of next) {
      if (!old.has(key) && !edited.has(key)) {
        const previousIndex = resultKeys.indexOf(previousKey);
        const index = previousIndex < 0 ? 0 : previousIndex + 1;
        result.splice(index, 0, copy(value));
        resultKeys.splice(index, 0, key);
      }
      if (resultKeys.includes(key)) previousKey = key;
    }
    const shared = (map) => [...map.keys()].filter((key) => old.has(key) && edited.has(key) && next.has(key));
    if (!equal(shared(old), shared(next))) {
      const values = new Map(resultKeys.map((key, index) => [key, result[index]]));
      const ordered = [...next.keys()].filter((key) => values.has(key));
      // A table reorder is authoritative for its own modules; manually added
      // modules stay attached to the preceding surviving module.
      for (let index = 0; index < resultKeys.length; index++) {
        const key = resultKeys[index];
        if (next.has(key)) continue;
        let previous = index - 1;
        while (previous >= 0 && !ordered.includes(resultKeys[previous])) previous--;
        const position = previous < 0 ? 0 : ordered.indexOf(resultKeys[previous]) + 1;
        ordered.splice(position, 0, key);
      }
      return ordered.map((key) => values.get(key));
    }
    return result;
  }
  if (object(generated) && object(baseline) && object(current)) {
    const result = {};
    for (const key of new Set([...Object.keys(current), ...Object.keys(baseline), ...Object.keys(generated)])) {
      const value = merge(current[key], baseline[key], generated[key], key);
      if (value !== undefined) result[key] = value;
    }
    return result;
  }
  return copy(equal(generated, baseline) ? current : generated);
}

export function reconcileGeneratedPages(current, baseline, generated) {
  if (!current?.length) return copy(generated);
  const adoptKeys = (pages) => (pages || []).map((page) => {
    const identity = page.sourceContextId || page.sourcePageTemplateId || page.id;
    const generatedPage = generated.find((item) =>
      (item.sourceContextId || item.sourcePageTemplateId || item.id) === identity);
    return {
      ...copy(page),
      nodes: (page.nodes || []).map((node) => {
        if (node.sourcePageTemplateNodeKey || node.sourcePageTemplateNodeIndex === undefined) return copy(node);
        const matching = generatedPage?.nodes?.find((item) =>
          item.sourcePageTemplateNodeIndex === node.sourcePageTemplateNodeIndex && item.schemaId === node.schemaId);
        return matching?.sourcePageTemplateNodeKey
          ? { ...copy(node), sourcePageTemplateNodeKey: matching.sourcePageTemplateNodeKey } : copy(node);
      }),
    };
  });
  // The first legacy rebuild establishes a baseline without erasing saved edits.
  return merge(adoptKeys(current), baseline ? adoptKeys(baseline) : generated, generated);
}
