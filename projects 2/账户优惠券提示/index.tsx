/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import imageUrl from './assets/image_1.svg'
import imageRaw from './assets/image_1.svg?raw'
import image1Url from './assets/image_2.svg'

export type IGeneratedComponent = {
  amountText?: string
  actionText?: string
  totalTextColor?: string
  totalBadgeBg?: string
  containerGradientStart?: string
  containerGradientEnd?: string
  iconGradientStart?: string
  iconGradientEnd?: string
  hideExportMetaNumbers?: boolean
}

const originalColors = {
  totalTextColor: '#FF1372',
  actionTextColor: '#FF1B77',
  totalBadgeBg: '#FFD9E5',
  containerGradientStart: '#FF1473',
  containerGradientEnd: '#FF229F',
  iconGradientStart: '#FF44A9',
  iconGradientEnd: '#FF2B8A',
}

function sameColor(a?: string, b?: string) {
  return String(a || '').toLowerCase() === String(b || '').toLowerCase()
}

function themedIconSvg(iconGradientStart?: string, iconGradientEnd?: string) {
  if (
    (!iconGradientStart || sameColor(iconGradientStart, originalColors.iconGradientStart)) &&
    (!iconGradientEnd || sameColor(iconGradientEnd, originalColors.iconGradientEnd))
  ) {
    return null
  }

  return imageRaw
    .replace(
      /<linearGradient id="paint1_linear_623_3658"[^>]*>/,
      '<linearGradient id="paint1_linear_623_3658" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">',
    )
    .replaceAll(originalColors.iconGradientStart, iconGradientStart || originalColors.iconGradientStart)
    .replaceAll(originalColors.iconGradientEnd, iconGradientEnd || originalColors.iconGradientEnd)
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const amountText = String(props.amountText ?? '600').replace(/\s*元\s*$/, '')
  const actionText = props.actionText ?? '立即使用'
  const hideExportMetaNumbers = Boolean(props.hideExportMetaNumbers)
  const iconSvg = themedIconSvg(props.iconGradientStart, props.iconGradientEnd)
  const contentStyle =
    props.containerGradientStart || props.containerGradientEnd
      ? {
          background: `linear-gradient(90deg, ${props.containerGradientStart || originalColors.containerGradientStart} 0%, ${props.containerGradientEnd || originalColors.containerGradientEnd} 100%)`,
        }
      : undefined
  const totalTextStyle = props.totalTextColor ? { color: props.totalTextColor } : undefined
  const actionTextStyle =
    props.totalTextColor && !sameColor(props.totalTextColor, originalColors.totalTextColor)
      ? { color: props.totalTextColor }
      : undefined
  const totalBadgeStyle = props.totalBadgeBg ? { background: props.totalBadgeBg } : undefined

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.content} style={contentStyle}></div>
        {iconSvg ? (
          <div className={styles.image} dangerouslySetInnerHTML={{__html: iconSvg}} />
        ) : (
          <img src={imageUrl} className={styles.image} />
        )}
        <img src={image1Url} className={styles.image1} />
        <div className={styles.container1} style={totalBadgeStyle}>
          <div className={styles.text} style={totalTextStyle}>总计</div>
        </div>
        <div className={styles.container2}>
          <div className={styles.text1} style={actionTextStyle}>{actionText}</div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text2} style={totalTextStyle}>{hideExportMetaNumbers ? '' : amountText}</div>
        <div className={styles.text3} style={totalTextStyle}>
          <div className={styles.text3__listwrap}>元</div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container3}>
          <div className={styles.text4}>DOU+</div>
          <div className={styles.text5}>优惠券</div>
        </div>
        <div className={styles.container4}>
          <div className={styles.content1}>
            <div className={styles.text6}>共有</div>
            <div className={styles.text7}>
                <div className={styles.text7__listwrap}>{hideExportMetaNumbers ? '' : '2'}</div>
            </div>
            <div className={styles.text8}>张券</div>
          </div>
        </div>
      </div>
    </div>
  )
}
