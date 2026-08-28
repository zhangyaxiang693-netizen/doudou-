/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image2 from './assets/image_2.svg'
import image4 from './assets/image_4.svg'
import image7 from './assets/image_7.svg'
import prizeDouziUrl from '../九宫格-奖品库/dou仔周边.png'
import prizeJianyingVipUrl from '../九宫格-奖品库/剪映vip.png'
import prizeTrafficCouponUrl from '../九宫格-奖品库/6元流量券.png'

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
  prize1?: PrizeValue
  prize2?: PrizeValue
  prize3?: PrizeValue
  prize1Name?: string
  prize2Name?: string
  prize3Name?: string
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
  const prize1 = resolvePrize(props.prize1, '抖仔限量盲盒', prizeDouziUrl, props.prize1Name)
  const prize2 = resolvePrize(props.prize2, '剪映VIP月卡', prizeJianyingVipUrl, props.prize2Name)
  const prize3 = resolvePrize(props.prize3, 'DOU+流量券', prizeTrafficCouponUrl, props.prize3Name)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.text}>{prize1.name}</div>
          <div className={styles.content}>
            <div className={styles.main}>
              <img src={prize1.image} className={styles.image} />
            </div>
          </div>
          <img src={image2} className={styles.image1} />
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container1}>
          <div className={styles.text2}>{prize2.name}</div>
          <div className={styles.content1}>
            <div className={styles.main1}>
              <img src={prize2.image} className={styles.image2} />
            </div>
          </div>
          <img src={image4} className={styles.image3} />
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container2}>
          <div className={styles.text3}>{prize3.name}</div>
          <div className={styles.content2}>
            <div className={styles.main2}>
              <img src={prize3.image} className={styles.image4} />
            </div>
          </div>
          <img src={image7} className={styles.image6} />
        </div>
      </div>
    </div>
  )
}
