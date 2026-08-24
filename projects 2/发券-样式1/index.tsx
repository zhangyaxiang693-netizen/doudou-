/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import imageRaw from './assets/image_1.svg?raw'

export type IGeneratedComponent = {
  couponName?: string
  amountText?: string
  conditionText?: string
  actionText?: string
  middleButtonGradientStart?: string
  middleButtonGradientEnd?: string
  amountTextColor?: string
}

const originalColors = {
  middleButtonGradientStart: '#FF1473',
  middleButtonGradientEnd: '#FF229F',
  amountTextColor: '#FF1B77',
}

function sameColor(a?: string, b?: string) {
  return String(a || '').toLowerCase() === String(b || '').toLowerCase()
}

function themedSvg(middleButtonGradientStart?: string, middleButtonGradientEnd?: string) {
  return imageRaw
    .replaceAll(originalColors.middleButtonGradientStart, middleButtonGradientStart || originalColors.middleButtonGradientStart)
    .replaceAll(originalColors.middleButtonGradientEnd, middleButtonGradientEnd || originalColors.middleButtonGradientEnd)
    .replace(/<path d="M533\.487[\s\S]*?fill="white"\/>/, '')
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const couponName = props.couponName || '周年庆惊喜流量补贴券'
  const amountText = String(props.amountText || '800').replace(/^￥\s*/, '')
  const conditionText = props.conditionText || '限量5000张'
  const actionText = props.actionText || '立即抢'
  const amountTextStyle =
    props.amountTextColor && !sameColor(props.amountTextColor, originalColors.amountTextColor)
      ? { color: props.amountTextColor }
      : undefined
  const svg = themedSvg(props.middleButtonGradientStart, props.middleButtonGradientEnd)

  return (
    <div className={styles.page}>
      <div className={styles.image} dangerouslySetInnerHTML={{__html: svg}} />
      <div className={styles.wrap}>
        <div className={styles.text}>{couponName}</div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container}>
          <div className={styles.text1} style={amountTextStyle}>
            <div className={styles.text1__listwrap}>￥</div>
          </div>
          <div className={styles.text2} style={amountTextStyle}>
            <div className={styles.text2__listwrap}>{amountText}</div>
          </div>
        </div>
        <div className={styles.text3}>
          <div className={styles.text3__listwrap}>{conditionText}</div>
        </div>
      </div>
      <div className={styles.buttonText}>{actionText}</div>
    </div>
  )
}
