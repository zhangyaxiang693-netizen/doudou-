/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'
import image2Raw from './assets/image_2.svg?raw'
import image3Raw from './assets/image_3.svg?raw'

export type IGeneratedComponent = {
  amountText?: string
  conditionText?: string
  subtractGradientStart?: string
  subtractGradientEnd?: string
  rectangleColor?: string
  iconGradientStart?: string
  iconGradientEnd?: string
}

const originalColors = {
  subtractGradientStart: '#FF1473',
  subtractGradientEnd: '#FF229F',
  rectangleStart: '#FFC5E5',
  rectangleEnd: '#FFA7D2',
  iconGradientStart: '#FF44A9',
  iconGradientEnd: '#FF2B8A',
}

function themedSubtractSvg(subtractGradientStart?: string, subtractGradientEnd?: string) {
  return image2Raw
    .replaceAll(originalColors.subtractGradientStart, subtractGradientStart || originalColors.subtractGradientStart)
    .replaceAll(originalColors.subtractGradientEnd, subtractGradientEnd || originalColors.subtractGradientEnd)
}

function themedIconSvg(iconGradientStart?: string, iconGradientEnd?: string) {
  return image3Raw
    .replaceAll(originalColors.iconGradientStart, iconGradientStart || originalColors.iconGradientStart)
    .replaceAll(originalColors.iconGradientEnd, iconGradientEnd || originalColors.iconGradientEnd)
}

function formatConditionText(value: string) {
  return value
    .replace(/\s*([0-9]+(?:\.[0-9]+)?)\s*/g, ' $1 ')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const amountText = String(props.amountText || '880').replace(/\s*元\s*$/, '')
  const conditionText = formatConditionText(props.conditionText || '仅剩 1 天使用')
  const rectangleStyle = props.rectangleColor
    ? { background: props.rectangleColor }
    : undefined
  const subtractSvg = themedSubtractSvg(props.subtractGradientStart, props.subtractGradientEnd)
  const iconSvg = themedIconSvg(props.iconGradientStart, props.iconGradientEnd)

  return (
    <div className={styles.page}>
      <div className={styles.wrap} style={rectangleStyle}></div>
      <img src={image1Url} className={styles.image} />
      <div className={styles.image1} dangerouslySetInnerHTML={{__html: subtractSvg}} />
      <div className={styles.image2} dangerouslySetInnerHTML={{__html: iconSvg}} />
      <div className={styles.wrap1}>
        <div className={styles.container}>
          <div className={styles.text}>
            <div className={styles.text__listwrap}>{conditionText}</div>
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.text1}>DOU+</div>
          <div className={styles.text2}>优惠券</div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container2}>
          <div className={styles.content}>
            <div className={styles.text3}>{amountText}</div>
            <div className={styles.text4}>
              <div className={styles.text4__listwrap}>元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
