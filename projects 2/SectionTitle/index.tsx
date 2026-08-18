import React from 'react'
import InlineSvg from '../src/components/InlineSvg'
import { createCssVars, toCssLength } from '../src/utils/cssVars'
import styles from './index.module.scss'
import defaultIcon from './assets/icon.svg?raw'

export interface SectionTitleProps {
  text?: string
  icon?: string
  textFontFamily?: string
  textFontSize?: number | string
  iconGap?: number | string
  textLetterSpacing?: number | string
  textColor?: string
  textGradient?: string
  className?: string
}

export default function SectionTitle({
  text = '消耗达标100%赢流量券',
  icon,
  textFontFamily,
  textFontSize,
  iconGap,
  textLetterSpacing,
  textColor,
  textGradient,
  className,
}: SectionTitleProps) {
  const textStyle = textGradient && textGradient.trim() !== ''
    ? {
        background: textGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      } as React.CSSProperties
    : undefined
  const style = createCssVars({
    sectionTitleContainerMarginRight: iconGap !== undefined ? toCssLength(iconGap) : undefined,
    sectionTitleTextFontFamily: textFontFamily,
    sectionTitleTextFontSize: textFontSize !== undefined ? toCssLength(textFontSize) : undefined,
    sectionTitleTextLetterSpacing: textLetterSpacing !== undefined ? toCssLength(textLetterSpacing) : undefined,
    sectionTitleTextColor: textGradient && textGradient.trim() !== '' ? undefined : textColor,
  })

  return (
    <div className={`${styles.page} ${className || ''}`} style={style}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <>{icon ? <img src={icon} className={styles.icon} /> : <InlineSvg src={defaultIcon} className={styles.icon} />}</>
        </div>
        <div className={styles.container1}>
          <div className={styles.text} style={textStyle}>{text}&nbsp;</div>
        </div>
      </div>
    </div>
  )
}
