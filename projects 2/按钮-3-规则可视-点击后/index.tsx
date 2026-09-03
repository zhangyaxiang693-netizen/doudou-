/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  limitedText?: string
  actionText?: string
  orderText?: string
  targetText?: string
  buttonText?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
}

const originalColors = {
  buttonGradientStart: '#FF1473',
  buttonGradientEnd: '#FF229F',
}

function normalizeColor(value?: string) {
  return String(value || '').trim().toUpperCase()
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const limitedText = props.limitedText || '仅限8.18–8.20'
  const actionText = props.actionText || '投放DOU+'
  const orderText = props.orderText || '≥2单'
  const targetText = props.targetText || '（投点赞评论\xa0/\xa0播放量\xa0/\xa0粉丝量目标）'
  const buttonText = props.buttonText && props.buttonText !== '立即报名' ? props.buttonText : '已报名'
  const gradientStart = props.buttonGradientStart || originalColors.buttonGradientStart
  const gradientEnd = props.buttonGradientEnd || originalColors.buttonGradientEnd
  const buttonStyle =
    normalizeColor(gradientStart) !== originalColors.buttonGradientStart ||
    normalizeColor(gradientEnd) !== originalColors.buttonGradientEnd
      ? {
          background: `linear-gradient(90deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        }
      : undefined

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.text}>
          {limitedText}<span className={styles.text__seg1}>&nbsp;{actionText}</span>
          <span className={styles.text__seg2}>{orderText}</span>
        </div>
        <div className={styles.text1}>
          {targetText}
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container} style={buttonStyle}>
          <div className={styles.text2}>{buttonText}</div>
        </div>
      </div>
    </div>
  )
}
