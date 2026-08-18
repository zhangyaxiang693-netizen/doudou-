import React from 'react'
import { createCssVars, toCssLength } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface TwoColumnLiveDataProps {
  leftLabel?: string
  leftValue?: string
  leftUnit?: string
  rightLabel?: string
  rightValue?: string
  iconColor?: string
  labelFontFamily?: string
  labelFontSize?: number | string
  labelLetterSpacing?: number | string
  labelColor?: string
  valueFontFamily?: string
  valueFontSize?: number | string
  valueLetterSpacing?: number | string
  valueColor?: string
  unitFontFamily?: string
  unitFontSize?: number | string
  unitLetterSpacing?: number | string
  unitColor?: string
  itemGap?: number | string
  bgColor?: string
  borderRadius?: number | string
  className?: string
}

export default function TwoColumnLiveData({
  leftLabel = '累计现金消耗',
  leftValue = '9',
  leftUnit = '(元)',
  rightLabel = '可抽奖次数',
  rightValue = '2',
  iconColor,
  labelFontFamily,
  labelFontSize,
  labelLetterSpacing,
  labelColor,
  valueFontFamily,
  valueFontSize,
  valueLetterSpacing,
  valueColor,
  unitFontFamily,
  unitFontSize,
  unitLetterSpacing,
  unitColor,
  itemGap,
  bgColor,
  borderRadius,
  className,
}: TwoColumnLiveDataProps) {
  const iconFillColor = iconColor || '#E9EDEF'
  const style = createCssVars({
    twoColumnLiveDataContainerBackground: bgColor,
    twoColumnLiveDataContainerBorderRadius: borderRadius !== undefined ? toCssLength(borderRadius) : undefined,
    twoColumnLiveDataItemGap: itemGap !== undefined ? toCssLength(itemGap) : undefined,
    twoColumnLiveDataTextFontFamily: labelFontFamily,
    twoColumnLiveDataTextFontSize: labelFontSize !== undefined ? toCssLength(labelFontSize) : undefined,
    twoColumnLiveDataTextLetterSpacing: labelLetterSpacing !== undefined ? toCssLength(labelLetterSpacing) : undefined,
    twoColumnLiveDataTextColor: labelColor,
    twoColumnLiveDataText2FontFamily: labelFontFamily,
    twoColumnLiveDataText2FontSize: labelFontSize !== undefined ? toCssLength(labelFontSize) : undefined,
    twoColumnLiveDataText2LetterSpacing: labelLetterSpacing !== undefined ? toCssLength(labelLetterSpacing) : undefined,
    twoColumnLiveDataText2Color: labelColor,
    twoColumnLiveDataText1FontFamily: valueFontFamily,
    twoColumnLiveDataText1FontSize: valueFontSize !== undefined ? toCssLength(valueFontSize) : undefined,
    twoColumnLiveDataText1LetterSpacing: valueLetterSpacing !== undefined ? toCssLength(valueLetterSpacing) : undefined,
    twoColumnLiveDataText1Color: valueColor,
    twoColumnLiveDataText3FontFamily: valueFontFamily,
    twoColumnLiveDataText3FontSize: valueFontSize !== undefined ? toCssLength(valueFontSize) : undefined,
    twoColumnLiveDataText3LetterSpacing: valueLetterSpacing !== undefined ? toCssLength(valueLetterSpacing) : undefined,
    twoColumnLiveDataText3Color: valueColor,
    twoColumnLiveDataText4FontFamily: unitFontFamily,
    twoColumnLiveDataText4FontSize: unitFontSize !== undefined ? toCssLength(unitFontSize) : undefined,
    twoColumnLiveDataText4LetterSpacing: unitLetterSpacing !== undefined ? toCssLength(unitLetterSpacing) : undefined,
    twoColumnLiveDataText4Color: unitColor,
    twoColumnLiveDataSvgIconColor: iconFillColor,
  })

  return (
    <div className={`${styles.page} ${className || ''}`} style={style}>
      <div className={styles.wrap}>
        <div className={styles.container}></div>
        <svg className={styles.image} width="4" height="58" viewBox="0 0 4 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.6416 9.30113C3.6416 10.1625 2.82645 10.8608 1.82091 10.8608C0.815368 10.8608 0.00021604 10.1625 0.000216078 9.30113L0.000216416 1.55963C0.000287025 0.698323 0.815412 -1.23537e-07 1.82091 -7.9585e-08C2.82641 -3.56333e-08 3.64153 0.698323 3.6416 1.55963L3.6416 9.30113ZM3.6416 24.7841C3.64156 25.6455 2.82643 26.3438 1.82091 26.3438C0.815389 26.3438 0.000251364 25.6455 0.000215401 24.7841L0.000215739 17.0426C0.000215777 16.1813 0.815367 15.483 1.82091 15.483C2.82645 15.483 3.6416 16.1813 3.6416 17.0426L3.6416 24.7841ZM3.6416 40.2671C3.64149 41.1284 2.82638 41.8268 1.82091 41.8268C0.815433 41.8268 0.00032269 41.1284 0.000214724 40.2671L0.000215062 32.5256C0.0002151 31.6643 0.815367 30.966 1.82091 30.966C2.82645 30.966 3.6416 31.6643 3.6416 32.5256L3.6416 40.2671ZM3.6416 55.7501C3.64142 56.6114 2.82634 57.3098 1.82091 57.3098C0.815477 57.3098 0.000394254 56.6114 0.000214047 55.7501L0.000214386 48.0086C0.000214423 47.1473 0.815366 46.449 1.82091 46.449C2.82645 46.449 3.6416 47.1473 3.6416 48.0086L3.6416 55.7501Z" fill="var(--two-column-live-data-svg-icon-color)"/>
        </svg>
        <div className={styles.container1}>
          <div className={styles.text}>
            <span className={styles.text__seg0}>{rightLabel}</span>
          </div>
          <div className={styles.text1}>
            <span className={styles.text1__seg0}>{rightValue}</span>
          </div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text2}>
          <span className={styles.text2__seg0}>{leftLabel}</span>
        </div>
        <div className={styles.text3}>
          <span className={styles.text3__seg0}>{leftValue}</span>
        </div>
        <div className={styles.text4}>
          <span className={styles.text4__seg0}>{leftUnit}</span>
        </div>
      </div>
    </div>
  )
}
