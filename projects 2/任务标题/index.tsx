import React from 'react'
import InlineSvg from '../src/components/InlineSvg'
import { createCssVars, toCssLength } from '../src/utils/cssVars'
import styles from './index.module.scss'
import defaultIcon from './assets/icon.svg?raw'

export interface TaskTitleProps {
  title?: string
  subtitle?: string
  icon?: string
  titleFontFamily?: string
  titleFontSize?: number | string
  titleLetterSpacing?: number | string
  titleColor?: string
  titleGradient?: string
  subtitleFontFamily?: string
  subtitleFontSize?: number | string
  subtitleLetterSpacing?: number | string
  subtitleColor?: string
  subtitleGradient?: string
  iconGap?: number | string
  className?: string
}

export default function TaskTitle({
  title = '做任务 抽好礼',
  subtitle = '剩余抽奖次数：2',
  icon,
  titleFontFamily,
  titleFontSize,
  titleLetterSpacing,
  titleColor,
  titleGradient,
  subtitleFontFamily,
  subtitleFontSize,
  subtitleLetterSpacing,
  subtitleColor,
  subtitleGradient,
  iconGap,
  className,
}: TaskTitleProps) {
  const titleStyle = titleGradient && titleGradient.trim() !== ''
    ? {
        background: titleGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      } as React.CSSProperties
    : undefined
  const subtitleStyle = subtitleGradient && subtitleGradient.trim() !== ''
    ? {
        background: subtitleGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      } as React.CSSProperties
    : undefined
  const style = createCssVars({
    taskTitleContentMarginRight: iconGap !== undefined ? toCssLength(iconGap) : undefined,
    taskTitleTextFontFamily: titleFontFamily,
    taskTitleTextFontSize: titleFontSize !== undefined ? toCssLength(titleFontSize) : undefined,
    taskTitleTextLetterSpacing: titleLetterSpacing !== undefined ? toCssLength(titleLetterSpacing) : undefined,
    taskTitleTextColor: titleGradient && titleGradient.trim() !== '' ? undefined : titleColor,
    taskTitleText1FontFamily: subtitleFontFamily,
    taskTitleText1FontSize: subtitleFontSize !== undefined ? toCssLength(subtitleFontSize) : undefined,
    taskTitleText1LetterSpacing: subtitleLetterSpacing !== undefined ? toCssLength(subtitleLetterSpacing) : undefined,
    taskTitleText1Color: subtitleGradient && subtitleGradient.trim() !== '' ? undefined : subtitleColor,
  })

  return (
    <div className={`${styles.page} ${className || ''}`} style={style}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <>{icon ? <img src={icon} className={styles.icon} /> : <InlineSvg src={defaultIcon} className={styles.icon} />}</>
          </div>
          <div className={styles.content1}>
            <div className={styles.text} style={titleStyle}>{title}&nbsp;</div>
          </div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text1} style={subtitleStyle}>
          <span className={styles.text1__seg0}>{subtitle}</span>
        </div>
      </div>
    </div>
  )
}
