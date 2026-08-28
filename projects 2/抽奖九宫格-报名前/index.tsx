/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image17Url from './assets/image_17.svg'
import prizeCouponPackUrl from '../九宫格-奖品库/券包.png'
import prizeTrafficCouponUrl from '../九宫格-奖品库/6元流量券.png'
import prizeDouziUrl from '../九宫格-奖品库/dou仔周边.png'
import prizeRecommendUrl from '../九宫格-奖品库/dou+官方推荐机会.png'
import prizePointsUrl from '../九宫格-奖品库/积分.png'

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
  prize4?: PrizeValue
  prize5?: PrizeValue
  prize1Name?: string
  prize2Name?: string
  prize3Name?: string
  prize4Name?: string
  prize5Name?: string
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

function prizeImageClass(prize: {name: string; image: string}) {
  return `${styles.prizeImage} ${prize.name.trim() === '内容诊断积分' ? styles.pointsPrizeImage : ''}`
}

function isRecommendPrize(prize: {name: string; image: string}) {
  return prize.name.trim() === 'DOU+官方推荐机会'
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const prize1 = resolvePrize(props.prize1, 'DOU仔周边', prizeDouziUrl, props.prize1Name)
  const prize2 = resolvePrize(props.prize2, '6元流量券', prizeTrafficCouponUrl, props.prize2Name)
  const prize3 = resolvePrize(props.prize3, '内容诊断积分', prizePointsUrl, props.prize3Name)
  const prize4 = resolvePrize(props.prize4, 'DOU+官方推荐机会', prizeRecommendUrl, props.prize4Name)
  const prize5 = resolvePrize(props.prize5, '1314元心动券包', prizeCouponPackUrl, props.prize5Name)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}></div>
          <div className={styles.content1}>
            <div className={styles.text}>
              <div className={styles.text__listwrap}>{prize1.name}</div>
            </div>
          </div>
          <div className={styles.content2}>
            <img src={prize1.image} className={prizeImageClass(prize1)} />
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.content3}></div>
          <div className={styles.content4}>
            <div className={styles.text1}>
              <div className={styles.text1__listwrap}>{prize2.name}</div>
            </div>
          </div>
          <div className={styles.content5}>
            <img src={prize2.image} className={prizeImageClass(prize2)} />
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.content6}>
            <div className={styles.main}>
              <div className={styles.section}></div>
              <img src={prize3.image} className={prizeImageClass(prize3)} />
              <div className={styles.text2}>{prize3.name}</div>
            </div>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.content8}></div>
          <div className={styles.content9}>
            <div className={`${styles.text5} ${isRecommendPrize(prize4) ? styles.text5Recommend : ''}`}>{prize4.name}</div>
          </div>
          <div className={styles.content10}>
            <img src={prize4.image} className={prizeImageClass(prize4)} />
          </div>
        </div>
        <div className={styles.container4}>
          <div className={styles.content11}></div>
          <div className={styles.content12}>
            <div className={styles.text7}>{prize5.name}</div>
          </div>
          <div className={styles.content13}>
            <img src={prize5.image} className={prizeImageClass(prize5)} />
          </div>
        </div>
        <div className={styles.container5}>
          <div className={styles.main3}>
            <div className={styles.section2}></div>
            <img src={image17Url} className={styles.image16} />
            <div className={styles.text8}>
              <span className={styles.text8__seg0}>更多好礼等你抽</span>
            </div>
            <div className={styles.text9}>
              <span className={styles.text9__seg0}>...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
