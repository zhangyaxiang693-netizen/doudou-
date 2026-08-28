/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Raw from './assets/image_1.svg?raw'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/铃铛 4.png'

type PrizeValue =
  | string
  | {
      name?: string
      title?: string
      label?: string
      image?: string
      imageUrl?: string
      url?: string
      src?: string
    }

export type IGeneratedComponent = {
  titleText?: string
  amountText?: string
  prizeText?: string
  selectedPrizeIndex?: number | string
  prizeCount?: number | string
  prize1?: PrizeValue
  prize2?: PrizeValue
  prize3?: PrizeValue
  prize4?: PrizeValue
  prize5?: PrizeValue
  prize6?: PrizeValue
  prize7?: PrizeValue
  prize8?: PrizeValue
  prize1Text?: string
  prize2Text?: string
  prize3Text?: string
  prize4Text?: string
  prize5Text?: string
  prize6Text?: string
  prize7Text?: string
  prize8Text?: string
  cardGradientStart?: string
  cardGradientEnd?: string
  amountColor?: string
}

function resolvePrize(value: PrizeValue | undefined, fallbackName: string) {
  let prize = value
  if (typeof value === 'string') {
    try {
      prize = JSON.parse(value)
    } catch {
      return {name: value.trim() || fallbackName, image: ''}
    }
  }
  if (prize && typeof prize === 'object') {
    return {
      name: prize.name || prize.title || prize.label || fallbackName,
      image: prize.image || prize.imageUrl || prize.url || prize.src || '',
    }
  }
  return {name: fallbackName, image: ''}
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    titleText = '恭喜抽中',
    amountText = '1314',
    prizeText = '元心动券包',
    selectedPrizeIndex = 1,
    prizeCount = 8,
    prize1Text = '1314元心动券包',
    prize2Text = '6元流量券',
    prize3Text = '10元流量券',
    prize4Text = 'DOU仔周边',
    prize5Text = 'DOU仔周边',
    prize6Text = '5元流量券',
    prize7Text = 'DOU+官方推荐机会',
    prize8Text = '内容诊断积分',
    cardGradientStart = '#FFB2C3',
    cardGradientEnd = '#FF89A3',
    amountColor = '#FF1372',
  } = props
  const prizeTexts = [
    prize1Text,
    prize2Text,
    prize3Text,
    prize4Text,
    prize5Text,
    prize6Text,
    prize7Text,
    prize8Text,
  ]
  const prizes = prizeTexts.map((fallbackName, index) =>
    resolvePrize(props[`prize${index + 1}` as keyof IGeneratedComponent] as PrizeValue, fallbackName),
  )
  const availablePrizeCount = Math.max(1, Math.min(8, Number(prizeCount) || 1))
  const selectedIndex = Math.max(1, Math.min(availablePrizeCount, Number(selectedPrizeIndex) || 1))
  const selectedPrize = prizes[selectedIndex - 1]
  const displayedPrizeText = prizeText || selectedPrize.name
  const backgroundSvg = image1Raw
    .replaceAll('#FFB2C3', cardGradientStart)
    .replaceAll('#FF89A3', cardGradientEnd)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div
            className={styles.image}
            dangerouslySetInnerHTML={{__html: backgroundSvg}}
          />
          <div className={styles.content}>
            <img
                src={image2}
              className={styles.image1}
            />
            <img
                src={image3}
              className={styles.image2}
            />
          </div>
          <img
            src={selectedPrize.image || image4}
            className={styles.image3}
          />
        </div>
      </div>
        <div className={styles.text}>{titleText}</div>
      <div className={styles.wrap1}>
        <div className={styles.text2} style={{color: amountColor}}>
            <span className={styles.text2__seg0}>{amountText}</span>
        </div>
            <div className={styles.text1}>{displayedPrizeText}</div>
      </div>
    </div>
  )
}
