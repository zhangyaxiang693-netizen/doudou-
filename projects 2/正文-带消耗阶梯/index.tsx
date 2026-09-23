/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  titleText?: string
  bodyText?: string
  rewardText1?: string
  rewardText2?: string
  rewardText3?: string
  rewardText4?: string
  amountText1?: string
  amountText2?: string
  amountText3?: string
  amountText4?: string
  footnoteText?: string
  accentGradientStart?: string
  accentGradientEnd?: string
}

const defaults = {
  titleText: '#如何参与',
  bodyText: '活动期间，使用账户内DOU+流量券投放「点赞评论量、视频播放量、粉丝量」目标投放，消耗达标得抽奖次数。',
  rewardTexts: ['抽奖+1', '抽奖+1', '抽奖+2', '抽奖+3'],
  amountTexts: ['30元', '90元', '150元', '200元'],
  footnoteText: '*活动页面数据有延迟请以消耗达成后第二天为准。',
}

function valueOrFallback(value: string | undefined, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const rewardTexts = [
    valueOrFallback(props.rewardText1, defaults.rewardTexts[0]),
    valueOrFallback(props.rewardText2, defaults.rewardTexts[1]),
    valueOrFallback(props.rewardText3, defaults.rewardTexts[2]),
    valueOrFallback(props.rewardText4, defaults.rewardTexts[3]),
  ]
  const amountTexts = [
    valueOrFallback(props.amountText1, defaults.amountTexts[0]),
    valueOrFallback(props.amountText2, defaults.amountTexts[1]),
    valueOrFallback(props.amountText3, defaults.amountTexts[2]),
    valueOrFallback(props.amountText4, defaults.amountTexts[3]),
  ]
  const style = {
    '--consumption-ladder-accent-start': props.accentGradientStart || '#FF1473',
    '--consumption-ladder-accent-end': props.accentGradientEnd || '#FF229F',
  } as React.CSSProperties

  return (
    <div className={styles.page} style={style}>
      <div className={styles.title}>
        {valueOrFallback(props.titleText, defaults.titleText)}
      </div>
      <div className={styles.body}>
        {valueOrFallback(props.bodyText, defaults.bodyText)}
      </div>
      <div className={styles.ladder}>
        <div className={styles.rewardRow}>
          {rewardTexts.map((text, index) => (
            <div className={styles.rewardTag} key={`reward-${index}`}>
              {text}
            </div>
          ))}
        </div>
        <div className={styles.progressRow}>
          <div className={styles.consumeLabel}>消耗达成：</div>
          <div className={styles.progress}>
            <div className={styles.amounts}>
              {amountTexts.map((text, index) => (
                <div className={styles.amount} key={`amount-${index}`}>
                  {text}
                </div>
              ))}
            </div>
            <div className={styles.track} aria-hidden="true">
              <span className={styles.segment} />
              <span className={styles.segment} />
              <span className={styles.segment} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footnote}>
        {valueOrFallback(props.footnoteText, defaults.footnoteText)}
      </div>
    </div>
  )
}
