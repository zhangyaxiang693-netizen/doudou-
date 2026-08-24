/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'

export type IGeneratedComponent = {
  consumeAmountText?: string
  lotteryCountText?: string
  valueTextColor?: string
  hideNumbers?: boolean
}

const originalColors = {
  valueTextColor: 'rgba(255, 27, 119, 1)',
}

function normalizeValue(value: string | undefined, fallback: string) {
  return String(value || fallback)
    .replace(/\s*元\s*$/, '')
    .replace(/^消耗\s*/, '')
    .trim()
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const consumeAmountText = normalizeValue(props.consumeAmountText, '30')
  const lotteryCountText = normalizeValue(props.lotteryCountText, '2')
  const valueTextStyle =
    props.valueTextColor && props.valueTextColor !== originalColors.valueTextColor
      ? { color: props.valueTextColor }
      : undefined
  const numberStyle = props.hideNumbers
    ? { ...valueTextStyle, visibility: 'hidden' as const }
    : valueTextStyle

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}></div>
        <img src={image1Url} className={styles.image} />
        <div className={styles.container1}>
          <div className={styles.text}>可抽奖次数</div>
          <div className={styles.text1} style={numberStyle}>{lotteryCountText}</div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text2}>累计现金消耗</div>
        <div className={styles.text3} style={numberStyle}>{consumeAmountText}</div>
        <div className={styles.text4}>(元)</div>
      </div>
    </div>
  )
}
