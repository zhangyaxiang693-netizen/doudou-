/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import prizeCouponPackUrl from '../九宫格-奖品库/券包.png'
import prizeTrafficCoupon5Url from '../九宫格-奖品库/5元流量券.png'
import prizeTrafficCoupon6Url from '../九宫格-奖品库/6元流量券.png'
import prizeTrafficCoupon10Url from '../九宫格-奖品库/10元流量券.png'
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
  buttonGradientStart?: string
  buttonGradientEnd?: string
}

const placeholderPrizes = [
  {name: '1314元心动券包', image: prizeCouponPackUrl},
  {name: '6元流量券', image: prizeTrafficCoupon6Url},
  {name: '10元流量券', image: prizeTrafficCoupon10Url},
  {name: 'DOU仔周边', image: prizeDouziUrl},
  {name: 'DOU仔周边', image: prizeDouziUrl},
  {name: '5元流量券', image: prizeTrafficCoupon5Url},
  {name: 'DOU+官方推荐机会', image: prizeRecommendUrl},
  {name: '内容诊断积分', image: prizePointsUrl},
]

function resolvePrize(
  value: PrizeValue | undefined,
  fallback: {name: string; image: string},
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
        name: resolvedNameOverride || value.trim() || fallback.name,
        image: fallback.image,
      }
    }
  }

  if (prize && typeof prize === 'object') {
    return {
      name: resolvedNameOverride || prize.name || prize.title || prize.label || fallback.name,
      image: prize.image || prize.imageUrl || prize.url || prize.src || fallback.image,
    }
  }

  return {
    name: resolvedNameOverride || fallback.name,
    image: fallback.image,
  }
}

function isPointsPrize(prize: {name: string; image: string}) {
  return prize.name.trim() === '内容诊断积分'
}

function isSingleLinePrize(prize: {name: string; image: string}) {
  return ['DOU+官方推荐机会', 'DOU仔帆布包'].includes(prize.name.trim())
}

function PrizeCard({prize}: {prize: {name: string; image: string}}) {
  return (
    <div className={styles.prizeCard}>
      <img
        src={prize.image}
        className={`${styles.prizeImage} ${isPointsPrize(prize) ? styles.pointsPrizeImage : ''}`}
      />
      <div className={`${styles.prizeName} ${isSingleLinePrize(prize) ? styles.prizeNameRecommend : ''}`}>{prize.name}</div>
    </div>
  )
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const prizes = placeholderPrizes.map((fallback, index) =>
    resolvePrize(
      props[`prize${index + 1}` as keyof IGeneratedComponent],
      fallback,
      props[`prize${index + 1}Name` as keyof IGeneratedComponent] as string | undefined,
    ),
  )
  const style = {
    '--lottery-registered-button-gradient-start': props.buttonGradientStart || '#FF1473',
    '--lottery-registered-button-gradient-end': props.buttonGradientEnd || '#FF229F',
  } as React.CSSProperties

  return (
    <div className={styles.page} style={style}>
      <div className={styles.wrap}>
        <PrizeCard prize={prizes[0]} />
        <PrizeCard prize={prizes[1]} />
        <PrizeCard prize={prizes[2]} />
      </div>
      <div className={styles.wrap1}>
        <PrizeCard prize={prizes[3]} />
        <div className={styles.container4}>
          <div className={styles.text4}>抽</div>
        </div>
        <PrizeCard prize={prizes[4]} />
      </div>
      <div className={styles.wrap2}>
        <PrizeCard prize={prizes[5]} />
        <PrizeCard prize={prizes[6]} />
        <PrizeCard prize={prizes[7]} />
      </div>
    </div>
  )
}
