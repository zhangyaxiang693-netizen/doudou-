/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/img_v3_02p3_d690767f-e808-4d62-a777-e602cb777d3g 1.png'

export type IGeneratedComponent = {
  titleText?: string
  contentText?: string
  buttonText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    titleText = '专属管家专业指导投放',
    contentText = 'DOU+认证用户专享',
    buttonText = '立即联系',
  } = props

  return (
    <div className={styles.page}>
      <div className={styles.wrap}></div>
      <img src={image1} className={styles.image} />
      <div className={styles.wrap1}>
        <div className={styles.text}>
          <span className={styles.text__seg0}>{titleText}</span>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.text1}>{contentText}</div>
      </div>
      <div className={styles.wrap3}>
        <div className={styles.text2}>{buttonText}</div>
      </div>
    </div>
  )
}
