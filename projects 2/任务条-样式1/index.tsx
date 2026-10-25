/* eslint-disable*/
import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {getTaskTagAsset} from './task-tag-assets.js'

export type IGeneratedComponent = {
  taskTitle?: string
  title?: string
  taskSubtitle?: string
  description?: string
  rewardCountText?: string
  rewardCount?: string
  completionText?: string
  frequency?: string
  showNewTag?: boolean | string
  buttonGradientStart?: string
  buttonGradientEnd?: string
  lotteryTagGradientStart?: string
  lotteryTagGradientEnd?: string
  rewardCountTextColor?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const taskTag = getTaskTagAsset(props.showNewTag)
  const taskTitle = props.taskTitle || props.title || '投一单DOU+'
  const taskSubtitle = props.taskSubtitle || props.description || '投内容加热、粉丝经营目标且消耗达成30元'
  const rewardCountText = props.rewardCountText || props.rewardCount || '+1'
  const completionText = props.completionText || props.frequency || '每日可完成1次'
  const style = {
    '--task-bar-button-gradient-start': props.buttonGradientStart || '#FF1473',
    '--task-bar-button-gradient-end': props.buttonGradientEnd || '#FF229F',
    '--task-bar-lottery-tag-gradient-start': props.lotteryTagGradientStart || '#FF1473',
    '--task-bar-lottery-tag-gradient-end': props.lotteryTagGradientEnd || '#FF229F',
    '--task-bar-reward-count-text-color': props.rewardCountTextColor || '#FF62A0',
  } as React.CSSProperties

  return (
    <div className={styles.page} style={style}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            {taskTag ? <img src={taskTag.src} alt={taskTag.label} className={styles.newTag}
              style={{width: 33 * taskTag.width / taskTag.height}} /> : null}
            <div className={styles.text}>{taskTitle}</div>
            <div className={styles.main}>
              <div className={styles.section}>
                <div className={styles.text1}>抽奖</div>
              </div>
              <div className={styles.text2}>{rewardCountText}</div>
            </div>
          </div>
          <div className={styles.content1}>
            <div className={styles.text3}>
              <div className={styles.text3__listwrap}>
                  {taskSubtitle}
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
            <div className={styles.text5}>{completionText}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
