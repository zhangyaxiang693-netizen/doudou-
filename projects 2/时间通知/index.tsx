import React from 'react'
import { createCssVars, toCssLength } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface TimeNotificationProps {
  text?: string
  textFontFamily?: string
  textFontSize?: number | string
  textLetterSpacing?: number | string
  textColor?: string
  textGradient?: string
  bgColor?: string
  className?: string
}

export default function TimeNotification({
  text = '抢券开放时间：5月10日10:00-23:59',
  textFontFamily,
  textFontSize,
  textLetterSpacing,
  textColor,
  textGradient,
  bgColor,
  className,
}: TimeNotificationProps) {
  const textStyle = textGradient && textGradient.trim() !== ''
    ? {
        background: textGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      } as React.CSSProperties
    : undefined

  let containerBackground: string | undefined
  if (bgColor && bgColor.trim() !== '') {
    const hex = bgColor.trim()
    let rgb: string
    if (hex.startsWith('#') && hex.length === 7) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      rgb = `${r},${g},${b}`
    } else {
      rgb = '255,221,226'
    }
    containerBackground = `linear-gradient(90deg,rgba(${rgb},0) 0%,rgba(${rgb},0.6) 22%,rgba(${rgb},0.6) 77%,rgba(${rgb},0) 100%)`
  }
  const style = createCssVars({
    timeNotificationContainerBackground: containerBackground,
    timeNotificationTextFontFamily: textFontFamily,
    timeNotificationTextFontSize: textFontSize !== undefined ? toCssLength(textFontSize) : undefined,
    timeNotificationTextLetterSpacing: textLetterSpacing !== undefined ? toCssLength(textLetterSpacing) : undefined,
    timeNotificationTextColor: textGradient && textGradient.trim() !== '' ? undefined : textColor,
  })

  return (
    <div className={`${styles.page} ${className || ''}`} style={style}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.text} style={textStyle}>{text}</div>
        </div>
      </div>
    </div>
  )
}
