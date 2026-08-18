/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/image_4.svg'

export type IGeneratedComponent = {
  title?: string
  description?: string
  buttonText?: string
}

export default function GeneratedComponent({
  title = '优质视频诊断',
  description = '发现你有一条高潜视频！',
  buttonText = '立即生成报告',
}: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <img src={image1} className={styles.image} />
        <div className={styles.container}>
          <div className={styles.content}>
            <img
              src={image2}
              className={styles.image2}
            />
            <img
              src={image3}
              className={styles.image1}
            />
          </div>
          <div className={styles.text}>{title}</div>
          <div className={styles.content1}>
            <img
              src={image4}
              className={styles.image3}
            />
            <div className={styles.main}></div>
          </div>
        </div>
        <div className={styles.text1}>{description}</div>
        <div className={styles.container1}>
          <div className={styles.text2}>
            <span className={styles.text2__seg0}>{buttonText}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
