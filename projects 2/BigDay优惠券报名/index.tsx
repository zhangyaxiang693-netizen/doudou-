import React from 'react'
import SectionTitle from '../SectionTitle'
import BigDayCouponClassic from '../BigDayCouponClassic'
import ThresholdRegistration from '../门槛加报名'
import styles from './index.module.scss'

export interface BigDayCouponSignupProps {
  titleText?: string
  couponAmount?: string
  couponUnit?: string
  couponExpiry?: string
  couponPrefix?: string
  couponTitle?: string
  actionText?: string
  dateText?: string
  thresholdText?: string
  descriptionText?: string
}

export default function BigDayCouponSignup({
  titleText = '消耗达标100%赢流量券',
  couponAmount = '800',
  couponUnit = '元',
  couponExpiry = '仅剩 1 天使用',
  couponPrefix = 'DOU+',
  couponTitle = '优惠券',
  actionText = '立即报名',
  dateText = '8.16–8.18',
  thresholdText = '投放DOU+≥2 单',
  descriptionText = '（投点赞评论 / 播放量 / 粉丝量目标）',
}: BigDayCouponSignupProps) {
  return (
    <section className={styles.wrapper}>
      <SectionTitle text={titleText} />
      <BigDayCouponClassic
        amount={couponAmount}
        unit={couponUnit}
        expiry={couponExpiry}
        prefix={couponPrefix}
        title={couponTitle}
      />
      <ThresholdRegistration
        actionText={actionText}
        dateText={dateText}
        thresholdText={thresholdText}
        descriptionText={descriptionText}
      />
    </section>
  )
}
