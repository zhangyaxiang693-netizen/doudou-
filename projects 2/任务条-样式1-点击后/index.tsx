/* eslint-disable*/
import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  taskTitle?: string
  taskSubtitle?: string
  rewardCountText?: string
  completionText?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
  lotteryTagGradientStart?: string
  lotteryTagGradientEnd?: string
  rewardCountTextColor?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const style = {
    '--task-bar-button-gradient-start': props.buttonGradientStart || '#FF81BA',
    '--task-bar-button-gradient-end': props.buttonGradientEnd || '#FF81BA',
    '--task-bar-lottery-tag-gradient-start': props.lotteryTagGradientStart || '#FF1473',
    '--task-bar-lottery-tag-gradient-end': props.lotteryTagGradientEnd || '#FF229F',
    '--task-bar-reward-count-text-color': props.rewardCountTextColor || '#FF62A0',
  } as React.CSSProperties

  return (
    <div className={styles.page} style={style}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.text}>{props.taskTitle || '投一单DOU+'}</div>
            <div className={styles.main}>
              <div className={styles.section}>
                <div className={styles.text1}>抽奖</div>
              </div>
              <div className={styles.text2}>{props.rewardCountText || '+1'}</div>
            </div>
          </div>
          <div className={styles.content1}>
            <div className={styles.text3}>
              <div className={styles.text3__listwrap}>
                  {props.taskSubtitle || '投内容加热、粉丝经营目标且消耗达成30元'}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.content2}>
            <div className={styles.main1}>
              <div className={styles.text4}>已完成</div>
            </div>
          </div>
          <div className={styles.content3}>
            <div className={styles.text5}>{props.completionText || '每日可完成1次'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
