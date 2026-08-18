import type { CSSProperties } from 'react'

type CssVarValue = string | number | undefined | null

function toKebabCase(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

export function toCssPx(value: number | string) {
  if (typeof value === 'number') return `${value}px`
  return value
}

export function toCssLength(value: number | string) {
  if (typeof value === 'number') return `${value}px`
  const parsed = Number(value)
  return Number.isFinite(parsed) ? `${parsed}px` : value
}

export function createCssVars(values: Record<string, CssVarValue>) {
  return Object.entries(values).reduce((style, [key, value]) => {
    if (value === undefined || value === null || value === '') return style
    style[`--${toKebabCase(key)}`] = value
    return style
  }, {} as Record<string, string | number>) as CSSProperties
}
