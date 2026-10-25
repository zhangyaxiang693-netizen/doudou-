import React from 'react'
import TrafficCouponPrize from '../奖品-流量券'
import backgroundImage from '../九宫格-奖品库/ai流量券.png'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  amount?: string | number
  className?: string
}

export default function AiTrafficCouponPrize(props: IGeneratedComponent) {
  return (
    <TrafficCouponPrize
      amount={props.amount}
      className={`${styles.coupon} ${props.className || ''}`}
      backgroundImage={backgroundImage}
      showDecoration={false}
    />
  )
}
