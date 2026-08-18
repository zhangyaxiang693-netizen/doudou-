import React from 'react'
import InlineSvg from '../src/components/InlineSvg'
import { createCssVars, toCssLength } from '../src/utils/cssVars'
import styles from './index.module.scss'
import defaultIcon from './assets/image_1.svg?raw'

export interface AnnouncementProps {
  text?: string
  icon?: string
  textFontFamily?: string
  textFontSize?: number | string
  textLetterSpacing?: number | string
  textColor?: string
  textGradient?: string
  iconGap?: number | string
  bgColor?: string
  borderRadius?: number | string
  className?: string
}

export default function Announcement({
  text = '用户XXXXXXX领到抖仔毛绒挂件奖',
  icon,
  textFontFamily,
  textFontSize,
  textLetterSpacing,
  textColor,
  textGradient,
  iconGap,
  bgColor,
  borderRadius,
  className,
}: AnnouncementProps) {
  const textStyle = textGradient && textGradient.trim() !== ''
    ? {
        background: textGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      } as React.CSSProperties
    : undefined

  const gapValue = iconGap !== undefined && iconGap !== ''
    ? Number.isFinite(Number(iconGap))
      ? `${Number(iconGap) + 12}px`
      : String(iconGap)
    : undefined

  const style = createCssVars({
    announcementWrapBackground: bgColor,
    announcementWrapBorderRadius: borderRadius !== undefined ? toCssLength(borderRadius) : undefined,
    announcementWrap1Left: gapValue,
    announcementTextFontFamily: textFontFamily,
    announcementTextFontSize: textFontSize !== undefined ? toCssLength(textFontSize) : undefined,
    announcementTextLetterSpacing: textLetterSpacing !== undefined ? toCssLength(textLetterSpacing) : undefined,
    announcementTextColor: textGradient && textGradient.trim() !== '' ? undefined : textColor,
  })

  return (
    <div className={`${styles.page} ${className || ''}`} style={style}>
      <div className={styles.wrap}></div>
      <div className={styles.wrap1}>
        <div className={styles.text} style={textStyle}>{text}</div>
      </div>
      <>{icon ? <img src={icon} className={styles.image} /> : <InlineSvg src={defaultIcon} className={styles.image} />}</>
    </div>
  )
}
