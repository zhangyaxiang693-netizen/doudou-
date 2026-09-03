/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image2 from './assets/image_2.svg'
import image4 from './assets/image_4.svg'
import image7 from './assets/image_7.svg'
import prizeDouziUrl from '../九宫格-奖品库/dou仔周边.png'
import prizeJianyingVipUrl from '../九宫格-奖品库/剪映vip.png'
import prizeTrafficCouponUrl from '../九宫格-奖品库/6元流量券.png'

const DISPLAY_PRIZE_COUNT = 3

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
  prizeCount?: number | string
  prize1?: PrizeValue
  prize2?: PrizeValue
  prize3?: PrizeValue
  prize4?: PrizeValue
  prize5?: PrizeValue
  prize6?: PrizeValue
  prize7?: PrizeValue
  prize8?: PrizeValue
  prize1Name?: string
  prize2Name?: string
  prize3Name?: string
  prize4Name?: string
  prize5Name?: string
  prize6Name?: string
  prize7Name?: string
  prize8Name?: string
}

function resolvePrize(
  value: PrizeValue | undefined,
  fallbackName: string,
  fallbackImage: string,
  nameOverride?: string,
) {
  let prize = value
  const resolvedNameOverride = typeof nameOverride === 'string' && nameOverride.trim()
    ? nameOverride.trim()
    : undefined
  if (typeof value === 'string') {
    try {
      prize = JSON.parse(value)
    } catch {
      return {
        name: resolvedNameOverride || value.trim() || fallbackName,
        image: fallbackImage,
      }
    }
  }

  if (prize && typeof prize === 'object') {
    return {
      name: resolvedNameOverride || prize.name || prize.title || prize.label || fallbackName,
      image: prize.image || prize.imageUrl || prize.url || prize.src || fallbackImage,
    }
  }

  return {
    name: resolvedNameOverride || fallbackName,
    image: fallbackImage,
  }
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const fallbackPrizes = [
    { name: '抖仔限量盲盒', image: prizeDouziUrl, ribbon: image2 },
    { name: '剪映VIP月卡', image: prizeJianyingVipUrl, ribbon: image4 },
    { name: 'DOU+流量券', image: prizeTrafficCouponUrl, ribbon: image7 },
    { name: '奖品4', image: prizeDouziUrl, ribbon: image2 },
    { name: '奖品5', image: prizeJianyingVipUrl, ribbon: image4 },
    { name: '奖品6', image: prizeTrafficCouponUrl, ribbon: image7 },
    { name: '奖品7', image: prizeDouziUrl, ribbon: image2 },
    { name: '奖品8', image: prizeJianyingVipUrl, ribbon: image4 },
  ]
  const prizes = fallbackPrizes.slice(0, DISPLAY_PRIZE_COUNT).map((fallback, index) => {
    const prizeIndex = index + 1
    return {
      ...resolvePrize(
        props[`prize${prizeIndex}` as keyof IGeneratedComponent] as PrizeValue | undefined,
        fallback.name,
        fallback.image,
        props[`prize${prizeIndex}Name` as keyof IGeneratedComponent] as string | undefined,
      ),
      ribbon: fallback.ribbon,
    }
  })

  return (
    <div className={styles.page}>
      {prizes.map((prize, index) => (
        <div className={styles.wrap} key={`${index}-${prize.name}`}>
          <div className={styles.container}>
            <div className={styles.text}>{prize.name}</div>
            <div className={styles.content}>
              <div className={styles.main}>
                <img src={prize.image} className={styles.image} />
              </div>
            </div>
            <img src={prize.ribbon} className={styles.image1} />
          </div>
        </div>
      ))}
    </div>
  )
}
