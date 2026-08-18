/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  actionText?: string
  dateText?: string
  thresholdText?: string
  descriptionText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}></div>
        <div className={styles.container1}>
          <div className={styles.main}>
            <div className={styles.text}>{props.actionText ?? '立即报名'}</div>
          </div>
        </div>
      </div>
      <div className={styles.text1}>
        <div>
          <span className={styles.text1__seg0}>{props.dateText ?? '8.16–8.18'}</span>
          {' '}
          {props.thresholdText ?? '投放DOU+≥2 单'}
        </div>
      </div>
      <div className={styles.text2}>
        {props.descriptionText ?? '（投点赞评论 / 播放量 / 粉丝量目标）'}
      </div>
    </div>
  )
}
