/* eslint-disable*/
import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  titleText?: string
  bodyText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.text}>{props.titleText || '#如何参与'}</div>
          <div className={styles.text1}>
            {props.bodyText || '活动期间，领取任务后并投放DOU+「点赞评论量」「视频播放量」「粉丝量」目标，且现金消耗大于68元的用户，可参与抽奖。每天均可参与一次抽奖活动。'}
          </div>
        </div>
      </div>
    </div>
  )
}
