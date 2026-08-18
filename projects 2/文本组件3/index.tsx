/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  text?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.text}>
      {props.text || '*点击报名即成功参与，活动期内投放DOU+「点赞评论量」「视频播放量」「粉丝量」目标，且累计现金消耗达成，第二天账户自动发券，具体奖励以实际下发为准。累计消耗达多档门槛，下发多张优惠券。'}
    </div>
  )
}
