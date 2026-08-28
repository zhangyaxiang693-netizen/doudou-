/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'
import image2Url from './assets/image_2.svg'

export type IGeneratedComponent = {
  contentText?: string
  buttonText?: string
  buttonBorderColor?: string
  buttonTextColor?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const contentText = props.contentText || '发现你有一条潜力视频！'
  const buttonText = props.buttonText || '立即生成报告'
  const buttonStyle = props.buttonBorderColor ? { borderColor: props.buttonBorderColor } : undefined
  const buttonTextStyle = props.buttonTextColor ? { color: props.buttonTextColor } : undefined

  return (
    <div className={styles.page}>
      <div className={styles.wrap}></div>
      <img src={image1Url} className={styles.image} />
      <img src={image2Url} className={styles.image1} />
      <div className={styles.text}>{contentText}</div>
      <div className={styles.wrap1} style={buttonStyle}>
        <div className={styles.text1} style={buttonTextStyle}>{buttonText}</div>
      </div>
    </div>
  )
}
