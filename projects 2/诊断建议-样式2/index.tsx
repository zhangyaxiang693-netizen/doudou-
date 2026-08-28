/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'
import image2Url from './assets/Rectangle 2131355079.png'
import image3Url from './assets/image_3.svg'
import image4Url from './assets/image_4.svg'

export type IGeneratedComponent = {
  noticePrefixText?: string
  noticeHighlightText?: string
  noticeSuffixText?: string
  videoTitle?: string
  tagPrefixText?: string
  tagText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const noticePrefixText = props.noticePrefixText || '你有1条'
  const noticeHighlightText = props.noticeHighlightText || '优质视频内容'
  const noticeSuffixText = props.noticeSuffixText || '，表现优于同类，现在加热有机会放大流量！'
  const videoTitle = props.videoTitle || '一起过圣诞'
  const tagPrefixText = props.tagPrefixText || '平台判定标签：'
  const tagText = props.tagText || '潜力视频'

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}></div>
        <img src={image1Url} className={styles.image} />
        <div className={styles.text}>
          {noticePrefixText}<span className={styles.text__seg1}>{noticeHighlightText}</span>
          {noticeSuffixText}
        </div>
        <div></div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container2}>
          <div className={styles.content}>
            <img
              src={image2Url}
              className={styles.image1}
            />
            <div className={styles.main}>
              <img
                src={image3Url}
                className={styles.image2}
              />
              <img
                src={image4Url}
                className={styles.image3}
              />
            </div>
          </div>
          <div className={styles.content1}>
            <div className={styles.text1}>{videoTitle}</div>
            <div className={styles.main1}>
              <div className={styles.text2}>{tagPrefixText}</div>
              <div className={styles.section}>
                <div className={styles.text3}>{tagText}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
