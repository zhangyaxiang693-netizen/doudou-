/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Raw from './assets/image_1.svg?raw'
import image2Raw from './assets/image_2.svg?raw'
import image3Raw from './assets/image_3.svg?raw'
import image4Raw from './assets/image_4.svg?raw'
import image5Raw from './assets/image_5.svg?raw'
import image6Url from './assets/image_6.svg'
import image7Raw from './assets/image_7.svg?raw'
import image8Raw from './assets/image_8.svg?raw'
import image9Raw from './assets/image_9.svg?raw'
import image10Raw from './assets/image_10.svg?raw'
import image11Url from './assets/image_11.svg'
import image12Raw from './assets/image_12.svg?raw'
import image13Raw from './assets/image_13.svg?raw'
import image14Raw from './assets/image_14.svg?raw'
import image15Raw from './assets/image_15.svg?raw'
import image16Url from './assets/image_16.svg'
import image17Raw from './assets/image_17.svg?raw'
import image18Url from './assets/image_18.svg'
import image19Url from './assets/image_19.svg'
import image20Url from './assets/image_20.svg'
import image21Url from './assets/image_21.svg'

export type IGeneratedComponent = {
  rewardType1?: string
  amountText1?: string
  rewardType2?: string
  amountText2?: string
  rewardType3?: string
  amountText3?: string
  rewardType4?: string
  amountText4?: string
  consumeAmountText1?: string
  consumeAmountText2?: string
  consumeAmountText3?: string
  consumeAmountText4?: string
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

function normalizeRewardType(value: string | undefined, fallback: '抽奖任务' | '消耗返') {
  const normalized = String(value || fallback).trim()
  return normalized === '抽奖' || normalized === '抽奖任务' ? '抽奖任务' : '消耗返'
}

function themedFrameSvg(svg: string, frameUnionGradientStart?: string, frameUnionGradientEnd?: string) {
  return svg
    .replaceAll(originalColors.frameUnionGradientStart, frameUnionGradientStart || originalColors.frameUnionGradientStart)
    .replaceAll(originalColors.frameUnionGradientEnd, frameUnionGradientEnd || originalColors.frameUnionGradientEnd)
}

function themedIconSvg(props: IGeneratedComponent) {
  return image2Raw
    .replaceAll(originalColors.frameUnionGradientStart, props.frameUnionGradientStart || originalColors.frameUnionGradientStart)
    .replaceAll(originalColors.frameUnionGradientEnd, props.frameUnionGradientEnd || originalColors.frameUnionGradientEnd)
    .replaceAll(originalColors.iconGradientStart, props.iconGradientStart || originalColors.iconGradientStart)
    .replaceAll(originalColors.iconGradientEnd, props.iconGradientEnd || originalColors.iconGradientEnd)
}

function themedBackgroundSvg(svg: string, backgroundPanelColor?: string) {
  return svg.replaceAll(originalColors.backgroundPanelColor, backgroundPanelColor || originalColors.backgroundPanelColor)
}

function themedSemicircleSvg(svg: string, redPacketEllipseColor?: string) {
  return svg.replaceAll(originalColors.redPacketEllipseColor, redPacketEllipseColor || originalColors.redPacketEllipseColor)
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const rewardType1 = normalizeRewardType(props.rewardType1, '抽奖任务')
  const rewardType2 = normalizeRewardType(props.rewardType2, '消耗返')
  const rewardType3 = normalizeRewardType(props.rewardType3, '消耗返')
  const rewardType4 = normalizeRewardType(props.rewardType4, '消耗返')
  const amountText1 = normalizeAmount(props.amountText1, '110')
  const amountText2 = normalizeAmount(props.amountText2, '110')
  const amountText3 = normalizeAmount(props.amountText3, '110')
  const amountText4 = normalizeAmount(props.amountText4, '110')
  const usesTierAmountMapping =
    props.rewardType1 !== undefined ||
    props.rewardType2 !== undefined ||
    props.rewardType3 !== undefined ||
    props.rewardType4 !== undefined ||
    props.amountText4 !== undefined
  const displayAmount1 = amountText1
  const displayAmount2 = usesTierAmountMapping ? amountText2 : amountText1
  const displayAmount3 = usesTierAmountMapping ? amountText3 : amountText2
  const displayAmount4 = usesTierAmountMapping ? amountText4 : amountText3
  const consumeAmountText1 = normalizeAmount(props.consumeAmountText1, '30')
  const consumeAmountText2 = normalizeAmount(props.consumeAmountText2, '30')
  const consumeAmountText3 = normalizeAmount(props.consumeAmountText3, '30')
  const consumeAmountText4 = normalizeAmount(props.consumeAmountText4, '30')
  const amountTextStyle =
    props.amountTextColor && !sameColor(props.amountTextColor, originalColors.amountTextColor)
      ? { color: props.amountTextColor }
      : undefined
  const couponLabelStyle =
    props.couponLabelColor && !sameColor(props.couponLabelColor, originalColors.couponLabelColor)
      ? { color: props.couponLabelColor }
      : undefined
  const lotteryFrameSvg = themedFrameSvg(image1Raw, props.frameUnionGradientStart, props.frameUnionGradientEnd)
  const lotteryIconSvg = themedIconSvg(props)
  const backgroundSvg1 = themedBackgroundSvg(image3Raw, props.backgroundPanelColor)
  const backgroundSvg2 = themedBackgroundSvg(image8Raw, props.backgroundPanelColor)
  const backgroundSvg3 = themedBackgroundSvg(image13Raw, props.backgroundPanelColor)
  const redPacketUnionSvg1 = themedFrameSvg(image4Raw, props.redPacketUnionGradientStart, props.redPacketUnionGradientEnd)
  const redPacketUnionSvg2 = themedFrameSvg(image9Raw, props.redPacketUnionGradientStart, props.redPacketUnionGradientEnd)
  const redPacketUnionSvg3 = themedFrameSvg(image14Raw, props.redPacketUnionGradientStart, props.redPacketUnionGradientEnd)
  const leftSemicircleSvg1 = themedSemicircleSvg(image5Raw, props.redPacketEllipseColor)
  const rightSemicircleSvg1 = themedSemicircleSvg(image7Raw, props.redPacketEllipseColor)
  const leftSemicircleSvg2 = themedSemicircleSvg(image10Raw, props.redPacketEllipseColor)
  const rightSemicircleSvg2 = themedSemicircleSvg(image12Raw, props.redPacketEllipseColor)
  const leftSemicircleSvg3 = themedSemicircleSvg(image15Raw, props.redPacketEllipseColor)
  const rightSemicircleSvg3 = themedSemicircleSvg(image17Raw, props.redPacketEllipseColor)
  const renderLottery = (isLast = false) => (
    <div className={`${styles.slot} ${isLast ? styles.lastSlot : ''}`}>
      <div className={styles.main}>
        <div className={styles.image} dangerouslySetInnerHTML={{__html: lotteryFrameSvg}} />
        <div className={styles.image1} dangerouslySetInnerHTML={{__html: lotteryIconSvg}} />
        <div className={styles.section}>
          <div className={styles.text}>抽奖</div>
        </div>
      </div>
    </div>
  )
  const couponStyles = [
    {
      main: styles.main1,
      section: styles.section1,
      background: styles.image2,
      subSection: styles.subSection,
      block: styles.block,
      subBlock: styles.subBlock,
      frame: styles.image3,
      amountSection: styles.section2,
      amountWrap: styles.subSection1,
      amount: styles.text1,
      unit: styles.text2,
      label: styles.text3,
      divider: styles.section3,
      left: styles.image4,
      line: styles.image6,
      right: styles.image5,
      backgroundSvg: backgroundSvg1,
      frameSvg: redPacketUnionSvg1,
      leftSvg: leftSemicircleSvg1,
      rightSvg: rightSemicircleSvg1,
      lineUrl: image6Url,
    },
    {
      main: styles.main2,
      section: styles.section4,
      background: styles.image7,
      subSection: styles.subSection2,
      block: styles.block1,
      subBlock: styles.subBlock1,
      frame: styles.image8,
      amountSection: styles.section5,
      amountWrap: styles.subSection3,
      amount: styles.text4,
      unit: styles.text5,
      label: styles.text6,
      divider: styles.section6,
      left: styles.image9,
      line: styles.image11,
      right: styles.image10,
      backgroundSvg: backgroundSvg2,
      frameSvg: redPacketUnionSvg2,
      leftSvg: leftSemicircleSvg2,
      rightSvg: rightSemicircleSvg2,
      lineUrl: image11Url,
    },
    {
      main: styles.main3,
      section: styles.section7,
      background: styles.image12,
      subSection: styles.subSection4,
      block: styles.block2,
      subBlock: styles.subBlock2,
      frame: styles.image13,
      amountSection: styles.section8,
      amountWrap: styles.subSection5,
      amount: styles.text7,
      unit: styles.text8,
      label: styles.text9,
      divider: styles.section9,
      left: styles.image14,
      line: styles.image16,
      right: styles.image15,
      backgroundSvg: backgroundSvg3,
      frameSvg: redPacketUnionSvg3,
      leftSvg: leftSemicircleSvg3,
      rightSvg: rightSemicircleSvg3,
      lineUrl: image16Url,
    },
  ]
  const renderCoupon = (amountText: string, index: number, isLast = false) => {
    const item = couponStyles[(index - 1) % couponStyles.length]
    return (
      <div className={`${styles.slot} ${isLast ? styles.lastSlot : ''}`}>
        <div className={item.main}>
          <div className={item.section}>
            <div className={item.background} dangerouslySetInnerHTML={{__html: item.backgroundSvg}} />
            <div className={item.subSection}>
              <div className={item.block}>
                <div className={item.subBlock}></div>
              </div>
            </div>
            <div className={item.frame} dangerouslySetInnerHTML={{__html: item.frameSvg}} />
          </div>
          <div className={item.amountSection}>
            <div className={item.amountWrap}>
              <div className={item.amount} style={amountTextStyle}>{amountText}</div>
              <div className={item.unit} style={amountTextStyle}>元</div>
            </div>
          </div>
          <div className={item.label} style={couponLabelStyle}>满赠券</div>
          <div className={item.divider}>
            <div className={item.left} dangerouslySetInnerHTML={{__html: item.leftSvg}} />
            <img
              src={item.lineUrl}
              className={item.line}
            />
            <div className={item.right} dangerouslySetInnerHTML={{__html: item.rightSvg}} />
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
            {renderReward(rewardType3, displayAmount3, 3)}
            {renderReward(rewardType4, displayAmount4, 4, true)}
          </div>
        </div>
        <div className={styles.container1} style={props.hideProgressGraphic ? { visibility: 'hidden' } : undefined}>
          <div className={styles.content1}>
            <div className={styles.main4}></div>
            <div className={styles.main5}>
              <img
                src={image18Url}
                className={styles.image17}
              />
              <img
                src={image19Url}
                className={styles.image18}
              />
              <img
                src={image20Url}
                className={styles.image19}
              />
              <img
                src={image21Url}
                className={styles.image20}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text10}>消耗&nbsp;&nbsp;{consumeAmountText1}&nbsp;&nbsp;元</div>
        <div className={styles.text11}>消耗&nbsp;&nbsp;{consumeAmountText2}&nbsp;&nbsp;元</div>
        <div className={styles.text12}>消耗&nbsp;&nbsp;{consumeAmountText3}&nbsp;&nbsp;元</div>
        <div className={styles.text13}>消耗&nbsp;&nbsp;{consumeAmountText4}&nbsp;&nbsp;元</div>
      </div>
    </div>
  )
}
