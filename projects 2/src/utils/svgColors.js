const COLOR_ATTRIBUTE = /\b(fill|stroke|stop-color|flood-color)=(['"])(.*?)\2/gi
const COLOR_VALUE = /^(?:#(?:[0-9a-f]{3,8})|rgba?\([^)]*\)|hsla?\([^)]*\)|white|black|red|blue|green|yellow|orange|purple|pink|gray|grey|transparent)$/i

export function hashSvg(source) {
  let hash = 0
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) >>> 0
  }
  return hash.toString(36)
}

export function getSvgColorVariables(source) {
  const hash = hashSvg(source)
  const colors = []
  const seen = new Map()
  for (const match of source.matchAll(COLOR_ATTRIBUTE)) {
    const value = match[3].trim()
    if (!COLOR_VALUE.test(value) || value === 'transparent') continue
    if (!seen.has(value)) {
      const name = `--svg-${hash}-color-${colors.length + 1}`
      seen.set(value, name)
      colors.push({ name, defaultValue: value })
    }
  }
  return colors
}

export function replaceSvgColors(source) {
  const variables = getSvgColorVariables(source)
  const byColor = new Map(variables.map(variable => [variable.defaultValue, variable.name]))
  return source.replace(COLOR_ATTRIBUTE, (full, attribute, quote, value) => {
    const name = byColor.get(value.trim())
    return name ? `${attribute}=${quote}var(${name}, ${value})${quote}` : full
  })
}
