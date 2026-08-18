import React from 'react'
import InlineSvg from '../src/components/InlineSvg'
import { createCssVars, toCssLength } from '../src/utils/cssVars'
import styles from './index.module.scss'
import defaultIcon from './assets/icon.svg?raw'

export interface IconTitleCountdownProps {
  title?: string
  label?: string
  prefix?: string
  countdownValue?: string
  unit?: string
  icon?: string
  titleFontFamily?: string
  titleFontSize?: number | string
  titleLetterSpacing?: number | string
  titleColor?: string
  countdownFontFamily?: string
  countdownFontSize?: number | string
  countdownLetterSpacing?: number | string
  countdownColor?: string
  countdownBgColor?: string
  iconGap?: number | string
  className?: string
}

export default function IconTitleCountdown({
  title = '端午福利限时用',
  label = '有效期：',
  prefix = '仅剩',
  countdownValue = '12',
  unit = '小时',
  icon,
  titleFontFamily,
  titleFontSize,
  titleLetterSpacing,
  titleColor,
  countdownFontFamily,
  countdownFontSize,
  countdownLetterSpacing,
  countdownColor,
  countdownBgColor,
  iconGap,
  className,
}: IconTitleCountdownProps) {
  const style = createCssVars({
    iconTitleCountdownContainer1MarginRight: iconGap !== undefined ? toCssLength(iconGap) : undefined,
    iconTitleCountdownText4FontFamily: titleFontFamily,
    iconTitleCountdownText4FontSize: titleFontSize !== undefined ? toCssLength(titleFontSize) : undefined,
    iconTitleCountdownText4LetterSpacing: titleLetterSpacing !== undefined ? toCssLength(titleLetterSpacing) : undefined,
    iconTitleCountdownText4Color: titleColor,
    iconTitleCountdownTextFontFamily: countdownFontFamily,
    iconTitleCountdownTextFontSize: countdownFontSize !== undefined ? toCssLength(countdownFontSize) : undefined,
    iconTitleCountdownTextLetterSpacing: countdownLetterSpacing !== undefined ? toCssLength(countdownLetterSpacing) : undefined,
    iconTitleCountdownTextColor: countdownColor,
    iconTitleCountdownText1FontFamily: countdownFontFamily,
    iconTitleCountdownText1FontSize: countdownFontSize !== undefined ? toCssLength(countdownFontSize) : undefined,
    iconTitleCountdownText1LetterSpacing: countdownLetterSpacing !== undefined ? toCssLength(countdownLetterSpacing) : undefined,
    iconTitleCountdownText1Color: countdownColor,
    iconTitleCountdownText2FontFamily: countdownFontFamily,
    iconTitleCountdownText2FontSize: countdownFontSize !== undefined ? toCssLength(countdownFontSize) : undefined,
    iconTitleCountdownText2LetterSpacing: countdownLetterSpacing !== undefined ? toCssLength(countdownLetterSpacing) : undefined,
    iconTitleCountdownText2Color: countdownColor,
    iconTitleCountdownText3FontFamily: countdownFontFamily,
    iconTitleCountdownText3FontSize: countdownFontSize !== undefined ? toCssLength(countdownFontSize) : undefined,
    iconTitleCountdownText3LetterSpacing: countdownLetterSpacing !== undefined ? toCssLength(countdownLetterSpacing) : undefined,
    iconTitleCountdownText3Color: countdownColor,
    iconTitleCountdownContentBackground: countdownBgColor,
  })

  return (
    <div className={`${styles.page} ${className || ''}`} style={style}>
      <div className={styles.wrap1}>
        <div className={styles.container1}>
          <>{icon ? <img src={icon} className={styles.icon} /> : <InlineSvg src={defaultIcon} className={styles.icon} />}</>
        </div>
        <div className={styles.container2}>
          <div className={styles.text4}>{title}</div>
        </div>
      </div>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.text}>{label}</div>
          <div className={styles.text1}>
            <div className={styles.text1__listwrap}>{prefix}</div>
          </div>
          <div className={styles.content}>
            <div className={styles.text2}>{countdownValue}</div>
          </div>
          <div className={styles.text3}>
            <div className={styles.text3__listwrap}>{unit}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
