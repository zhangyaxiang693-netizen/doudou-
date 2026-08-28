/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'
import image2Url from './assets/image 8833.png'

export type IGeneratedComponent = {
  titleText?: string
  videoTitle?: string
  userName?: string
  suggestionText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const titleText = props.titleText || '诊断建议'
  const videoTitle = props.videoTitle || '当猫咪发现了扫地机器人'
  const userName = props.userName || '用户昵称'
  const suggestionText =
    props.suggestionText ||
    '你的视频总播放量、点赞率均高于同类水平!\u00a0如果能再优化前几秒的视觉冲击和节奏就更好啦~\u00a0评论区记得加入引导话术哦\u00a0!'

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <img src={image1Url} className={styles.image} />
        <div className={styles.text}>{titleText}</div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container}>
          <div className={styles.content}>
            <img
              src={image2Url}
              className={styles.image1}
            />
            <div className={styles.main}>
              <div className={styles.text1}>{videoTitle}</div>
              <div className={styles.text2}>{userName}</div>
            </div>
          </div>
          <div className={styles.text3}>{suggestionText}</div>
        </div>
      </div>
    </div>
  )
}
