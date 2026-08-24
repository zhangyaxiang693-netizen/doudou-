/* eslint-disable*/
import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  taskType?: string
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
  const taskLabel = String(props.taskType || '任务1').includes('2') ? '任务2' : '任务1'
  const style = {
    '--task-bar-button-gradient-start': props.buttonGradientStart || '#FF1473',
    '--task-bar-button-gradient-end': props.buttonGradientEnd || '#FF229F',
    '--task-bar-lottery-tag-gradient-start': props.lotteryTagGradientStart || '#FF1473',
    '--task-bar-lottery-tag-gradient-end': props.lotteryTagGradientEnd || '#FF229F',
    '--task-bar-reward-count-text-color': props.rewardCountTextColor || '#FF62A0',
    '--task-bar-type-label-color': taskLabel === '任务2' ? '#5AB7FF' : '#FFC544',
  } as React.CSSProperties

  return (
    <div className={styles.page} style={style}>
      <div className={styles.taskBadge}>{taskLabel}</div>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.text}>{props.taskTitle || '投放DOU+现金消耗≥30元'}</div>
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
                  {props.taskSubtitle || '投粉丝经营、内容加热目标且消耗达标'}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.content2}>
            <div className={styles.main1}>
              <div className={styles.text4}>去完成</div>
            </div>
          </div>
          <div className={styles.content3}>
            <div className={styles.text5}>{props.completionText || '12次/天'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
