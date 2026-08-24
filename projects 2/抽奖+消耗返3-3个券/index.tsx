/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Raw from './assets/image_1.svg?raw'
import image2Raw from './assets/image_2.svg?raw'
import image3Raw from './assets/image_3.svg?raw'
import image4Raw from './assets/image_4.svg?raw'
import image5Url from './assets/image_5.svg'
import image6Raw from './assets/image_6.svg?raw'
import image7Raw from './assets/image_7.svg?raw'
import image8Raw from './assets/image_8.svg?raw'
import image9Raw from './assets/image_9.svg?raw'
import image10Url from './assets/image_10.svg'
import image11Raw from './assets/image_11.svg?raw'
import image12Url from './assets/image_12.svg'
import image13Url from './assets/image_13.svg'
import image14Url from './assets/image_14.svg'

export type IGeneratedComponent = {
  amountText1?: string
  amountText2?: string
  consumeAmountText1?: string
  consumeAmountText2?: string
  consumeAmountText3?: string
  frameUnionGradientStart?: string
  frameUnionGradientEnd?: string
  iconGradientStart?: string
  iconGradientEnd?: string
  redPacketUnionGradientStart?: string
  redPacketUnionGradientEnd?: string
  redPacketEllipseColor?: string
  backgroundPanelColor?: string
  couponLabelColor?: string
  amountTextColor?: string
  hideProgressGraphic?: boolean
}

const originalColors = {
  frameUnionGradientStart: '#FF237B',
  frameUnionGradientEnd: '#FF5EAE',
  iconGradientStart: '#FF1478',
  iconGradientEnd: '#FF5DAA',
  redPacketEllipseColor: '#FFC4E5',
  backgroundPanelColor: '#FFC5E5',
  couponLabelColor: 'rgba(255, 98, 160, 1)',
  amountTextColor: 'rgba(255, 19, 114, 1)',
}

function sameColor(a?: string, b?: string) {
  return String(a || '').toLowerCase() === String(b || '').toLowerCase()
}

function normalizeAmount(value: string | undefined, fallback: string) {
  return String(value || fallback)
    .replace(/\s*元\s*$/, '')
    .replace(/^消耗\s*/, '')
    .trim()
}

function themedFrameSvg(svg: string, frameUnionGradientStart?: string, frameUnionGradientEnd?: string) {
  return svg
    .replaceAll(originalColors.frameUnionGradientStart, frameUnionGradientStart || originalColors.frameUnionGradientStart)
    .replaceAll(originalColors.frameUnionGradientEnd, frameUnionGradientEnd || originalColors.frameUnionGradientEnd)
}

function themedBackgroundSvg(svg: string, backgroundPanelColor?: string) {
  return svg.replaceAll(originalColors.backgroundPanelColor, backgroundPanelColor || originalColors.backgroundPanelColor)
}

function themedSemicircleSvg(svg: string, redPacketEllipseColor?: string) {
  return svg.replaceAll(originalColors.redPacketEllipseColor, redPacketEllipseColor || originalColors.redPacketEllipseColor)
}

function themedGiftSvg(props: IGeneratedComponent) {
  let svg = image1Raw
    .replaceAll(originalColors.iconGradientStart, props.iconGradientStart || originalColors.iconGradientStart)
    .replaceAll(originalColors.iconGradientEnd, props.iconGradientEnd || originalColors.iconGradientEnd)

  if (props.redPacketUnionGradientStart || props.redPacketUnionGradientEnd) {
    svg = svg
      .replaceAll(originalColors.frameUnionGradientStart, props.redPacketUnionGradientStart || originalColors.frameUnionGradientStart)
      .replaceAll(originalColors.frameUnionGradientEnd, props.redPacketUnionGradientEnd || originalColors.frameUnionGradientEnd)
  }

  return svg
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const amountText1 = normalizeAmount(props.amountText1, '30')
  const amountText2 = normalizeAmount(props.amountText2, '30')
  const consumeAmountText1 = normalizeAmount(props.consumeAmountText1, '30')
  const consumeAmountText2 = normalizeAmount(props.consumeAmountText2, '30')
  const consumeAmountText3 = normalizeAmount(props.consumeAmountText3, '30')
  const amountTextStyle =
    props.amountTextColor && !sameColor(props.amountTextColor, originalColors.amountTextColor)
      ? { color: props.amountTextColor }
      : undefined
  const couponLabelStyle =
    props.couponLabelColor && !sameColor(props.couponLabelColor, originalColors.couponLabelColor)
      ? { color: props.couponLabelColor }
      : undefined
  const giftSvg = themedGiftSvg(props)
  const backgroundSvg = themedBackgroundSvg(image2Raw, props.backgroundPanelColor)
  const backgroundSvg1 = themedBackgroundSvg(image7Raw, props.backgroundPanelColor)
  const frameSvg = themedFrameSvg(image3Raw, props.frameUnionGradientStart, props.frameUnionGradientEnd)
  const frameSvg1 = themedFrameSvg(image8Raw, props.frameUnionGradientStart, props.frameUnionGradientEnd)
  const leftSemicircleSvg = themedSemicircleSvg(image4Raw, props.redPacketEllipseColor)
  const rightSemicircleSvg = themedSemicircleSvg(image6Raw, props.redPacketEllipseColor)
  const leftSemicircleSvg1 = themedSemicircleSvg(image9Raw, props.redPacketEllipseColor)
  const rightSemicircleSvg1 = themedSemicircleSvg(image11Raw, props.redPacketEllipseColor)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.image} dangerouslySetInnerHTML={{__html: giftSvg}} />
            <div className={styles.main}>
              <div className={styles.section}>
                <div className={styles.image1} dangerouslySetInnerHTML={{__html: backgroundSvg}} />
                <div className={styles.subSection}>
                  <div className={styles.subBlock}></div>
                </div>
                <div className={styles.image2} dangerouslySetInnerHTML={{__html: frameSvg}} />
              </div>
              <div className={styles.section1}>
                <div className={styles.subSection1}>
                  <div className={styles.text} style={amountTextStyle}>{amountText1}</div>
                  <div className={styles.text1} style={amountTextStyle}>元</div>
                </div>
              </div>
              <div className={styles.text2} style={couponLabelStyle}>满赠券</div>
              <div className={styles.section2}>
                <div className={styles.image3} dangerouslySetInnerHTML={{__html: leftSemicircleSvg}} />
                <img
                  src={image5Url}
                  className={styles.image5}
                />
                <div className={styles.image4} dangerouslySetInnerHTML={{__html: rightSemicircleSvg}} />
              </div>
            </div>
            <div className={styles.main1}>
              <div className={styles.section3}>
                <div className={styles.image6} dangerouslySetInnerHTML={{__html: backgroundSvg1}} />
                <div className={styles.subSection2}>
                  <div className={styles.subBlock1}></div>
                </div>
                <div className={styles.image7} dangerouslySetInnerHTML={{__html: frameSvg1}} />
              </div>
              <div className={styles.section4}>
                <div className={styles.subSection3}>
                  <div className={styles.text3} style={amountTextStyle}>{amountText2}</div>
                  <div className={styles.text4} style={amountTextStyle}>元</div>
                </div>
              </div>
              <div className={styles.text5} style={couponLabelStyle}>满赠券</div>
              <div className={styles.section5}>
                <div className={styles.image8} dangerouslySetInnerHTML={{__html: leftSemicircleSvg1}} />
                <img
                  src={image10Url}
                  className={styles.image10}
                />
                <div className={styles.image9} dangerouslySetInnerHTML={{__html: rightSemicircleSvg1}} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container1} style={props.hideProgressGraphic ? { visibility: 'hidden' } : undefined}>
          <div className={styles.content1}>
            <div className={styles.main2}></div>
            <img
              src={image12Url}
              className={styles.image11}
            />
            <img
              src={image13Url}
              className={styles.image12}
            />
            <img
              src={image14Url}
              className={styles.image13}
            />
          </div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text6}>消耗&nbsp;&nbsp;{consumeAmountText1}&nbsp;&nbsp;元</div>
        <div className={styles.text7}>消耗&nbsp;&nbsp;{consumeAmountText2}&nbsp;&nbsp;元</div>
        <div className={styles.text8}>消耗&nbsp;&nbsp;{consumeAmountText3}&nbsp;&nbsp;元</div>
      </div>
    </div>
  )
}
