/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'
import image2Url from './assets/image_2.svg'
import image3Url from './assets/image_3.svg'

export type IGeneratedComponent = {
  buttonText?: string
  titleText?: string
  descriptionText?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const buttonText = props.buttonText || '一键上热门'
  const titleText = props.titleText || '近一周的涨粉速度对比上周下降40%'
  const descriptionText = props.descriptionText || '建议投放「粉丝量」,\u00a0提升涨粉速度。'
  const buttonStyle =
    props.buttonGradientStart || props.buttonGradientEnd
      ? {
          background: `linear-gradient(90deg, ${props.buttonGradientStart || '#FF1473'} 0%, ${props.buttonGradientEnd || '#FF229F'} 100%)`,
        }
      : undefined

  return (
    <div className={styles.page}>
      <div className={styles.wrap}></div>
      <div className={styles.wrap1}>
        <img src={image1Url} className={styles.image} />
        <img src={image2Url} className={styles.image1} />
      </div>
      <img src={image3Url} className={styles.image2} />
      <div className={styles.wrap2} style={buttonStyle}>
        <div className={styles.text}>{buttonText}</div>
      </div>
      <div className={styles.text1}>{titleText}</div>
      <div className={styles.text2}>{descriptionText}</div>
    </div>
  )
}
