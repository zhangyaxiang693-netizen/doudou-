/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'
import image2Raw from './assets/image_2.svg?raw'
import image3Raw from './assets/image_3.svg?raw'
import image4Url from './assets/image_4.svg'

export type IGeneratedComponent = {
  amountText?: string
  conditionText?: string
  giftConditionText?: string
  specialText?: string
  showSpecialTag?: boolean | string
  subtractGradientStart?: string
  subtractGradientEnd?: string
  rectangleColor?: string
  iconGradientStart?: string
  iconGradientEnd?: string
}

const originalColors = {
  subtractGradientStart: '#FF1473',
  subtractGradientEnd: '#FF229F',
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

export default function GeneratedComponent(props: IGeneratedComponent) {
  const amountText = String(props.amountText || '520').replace(/\s*元\s*$/, '')
  const conditionText = props.conditionText || '限量20张'
  const giftConditionText = props.giftConditionText || '满100元赠'
  const rectangleStyle = props.rectangleColor
    ? { background: props.rectangleColor }
    : undefined
  const subtractSvg = themedSubtractSvg(props.subtractGradientStart, props.subtractGradientEnd)
  const iconSvg = themedIconSvg(props.iconGradientStart, props.iconGradientEnd)
  const showSpecialTag =
    props.showSpecialTag !== false &&
    props.showSpecialTag !== 'false' &&
    props.showSpecialTag !== ''

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content} style={rectangleStyle}></div>
          <img src={image1Url} className={styles.image} />
          <div className={styles.image1} dangerouslySetInnerHTML={{__html: subtractSvg}} />
          <div className={styles.image2} dangerouslySetInnerHTML={{__html: iconSvg}} />
        </div>
        {showSpecialTag ? (
          <div className={styles.container1}>
            <img src={image4Url} className={styles.image3} />
            <div className={styles.image4}>{props.specialText || '七夕专项'}</div>
          </div>
        ) : null}
        <div className={styles.container2}>
          <div className={styles.content1}>
            <div className={styles.text}>
              <div className={styles.text__listwrap}>{conditionText}</div>
            </div>
          </div>
          <div className={styles.content2}>
            <div className={styles.text1}>DOU+</div>
            <div className={styles.text2}>优惠券</div>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.content3}>
              <div className={styles.text3}>{giftConditionText}</div>
            <div className={styles.main}>
              <div className={styles.text4}>{amountText}</div>
              <div className={styles.text5}>
                <div className={styles.text5__listwrap}>元</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
