/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  contentText?: string
  backgroundColor?: string
  textColor?: string
}

const originalColors = {
  backgroundColor: '#FFDDE2',
  textColor: 'rgba(255, 27, 119, 1)',
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '').trim()
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

function backgroundGradient(backgroundColor?: string) {
  const rgb = hexToRgb(backgroundColor || originalColors.backgroundColor)
  if (!rgb) return undefined
  return {
    background: `linear-gradient(90deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 22.11%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 77.4%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 100%)`,
  }
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const contentText = props.contentText || '抢券开放时间：5月10日10:00-23:59'
  const containerStyle = props.backgroundColor ? backgroundGradient(props.backgroundColor) : undefined
  const textStyle =
    props.textColor && props.textColor !== originalColors.textColor
      ? { color: props.textColor }
      : undefined

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container} style={containerStyle}>
          <div className={styles.text} style={textStyle}>{contentText}</div>
        </div>
      </div>
    </div>
  )
}
