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
  rewardType1?: string
  amountText1?: string
  rewardType2?: string
  amountText2?: string
  rewardType3?: string
  amountText3?: string
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

function normalizeConsumeAmount(value: string | undefined, fallback: string) {
  return normalizeAmount(value, fallback).replace(/\D/g, '') || fallback
}

function normalizeRewardType(value: string | undefined, fallback: '抽奖任务' | '消耗返') {
  const normalized = String(value || fallback).trim()
  return normalized === '抽奖' || normalized === '抽奖任务' ? '抽奖任务' : '消耗返'
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
  const rewardType1 = normalizeRewardType(props.rewardType1, '抽奖任务')
  const rewardType2 = normalizeRewardType(props.rewardType2, '消耗返')
  const rewardType3 = normalizeRewardType(props.rewardType3, '消耗返')
  const amountText1 = normalizeAmount(props.amountText1, '30')
  const amountText2 = normalizeAmount(props.amountText2, '30')
  const amountText3 = normalizeAmount(props.amountText3, '30')
  const usesTierAmountMapping =
    props.rewardType1 !== undefined ||
    props.rewardType2 !== undefined ||
    props.rewardType3 !== undefined ||
    props.amountText3 !== undefined
  const displayAmount1 = amountText1
  const displayAmount2 = usesTierAmountMapping ? amountText2 : amountText1
  const displayAmount3 = usesTierAmountMapping ? amountText3 : amountText2
  const consumeAmountText1 = normalizeConsumeAmount(props.consumeAmountText1, '30')
  const consumeAmountText2 = normalizeConsumeAmount(props.consumeAmountText2, '30')
  const consumeAmountText3 = normalizeConsumeAmount(props.consumeAmountText3, '30')
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
  const renderLottery = (isLast = false) => (
    <div className={`${styles.slot} ${isLast ? styles.lastSlot : ''}`}>
      <div className={styles.drawSlot}>
        <div className={styles.image} dangerouslySetInnerHTML={{__html: giftSvg}} />
      </div>
    </div>
  )
  const renderCoupon = (amountText: string, index: number, isLast = false) => {
    const useSecondSet = index % 2 === 0
    return (
      <div className={`${styles.slot} ${isLast ? styles.lastSlot : ''}`}>
        <div className={useSecondSet ? styles.main1 : styles.main}>
          <div className={useSecondSet ? styles.section3 : styles.section}>
            <div className={useSecondSet ? styles.image6 : styles.image1} dangerouslySetInnerHTML={{__html: useSecondSet ? backgroundSvg1 : backgroundSvg}} />
            <div className={useSecondSet ? styles.subSection2 : styles.subSection}>
              <div className={useSecondSet ? styles.subBlock1 : styles.subBlock}></div>
            </div>
            <div className={useSecondSet ? styles.image7 : styles.image2} dangerouslySetInnerHTML={{__html: useSecondSet ? frameSvg1 : frameSvg}} />
          </div>
          <div className={useSecondSet ? styles.section4 : styles.section1}>
            <div className={useSecondSet ? styles.subSection3 : styles.subSection1}>
              <div className={useSecondSet ? styles.text3 : styles.text} style={amountTextStyle}>{amountText}</div>
              <div className={useSecondSet ? styles.text4 : styles.text1} style={amountTextStyle}>元</div>
            </div>
          </div>
          <div className={useSecondSet ? styles.text5 : styles.text2} style={couponLabelStyle}>满赠券</div>
          <div className={useSecondSet ? styles.section5 : styles.section2}>
            <div className={useSecondSet ? styles.image8 : styles.image3} dangerouslySetInnerHTML={{__html: useSecondSet ? leftSemicircleSvg1 : leftSemicircleSvg}} />
            <img
              src={useSecondSet ? image10Url : image5Url}
              className={useSecondSet ? styles.image10 : styles.image5}
            />
            <div className={useSecondSet ? styles.image9 : styles.image4} dangerouslySetInnerHTML={{__html: useSecondSet ? rightSemicircleSvg1 : rightSemicircleSvg}} />
          </div>
        </div>
      </div>
    )
  }
  const renderReward = (rewardType: string, amountText: string, index: number, isLast = false) =>
    rewardType === '抽奖任务' ? renderLottery(isLast) : renderCoupon(amountText, index, isLast)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            {renderReward(rewardType1, displayAmount1, 1)}
            {renderReward(rewardType2, displayAmount2, 2)}
            {renderReward(rewardType3, displayAmount3, 3, true)}
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
        {[consumeAmountText1, consumeAmountText2, consumeAmountText3].map((amount, index) => (
          <div className={[styles.text6, styles.text7, styles.text8][index]} key={index}>
            <span className={styles.consumePrefix}>消耗</span>
            <span className={styles.consumeAmount}>{amount}</span>
            <span className={styles.consumeUnit}>元</span>
          </div>
        ))}
      </div>
    </div>
  )
}
