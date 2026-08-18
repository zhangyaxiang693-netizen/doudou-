/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  text?: string
  totalText?: string
  amountText?: string
  amountUnitText?: string
  brandText?: string
  couponTypeText?: string
  couponCountText?: string
  couponUnitText?: string
  actionText?: string
  validityLabelText?: string
  remainingText?: string
  durationText?: string
  timeUnitText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.content}></div>
        <div className={styles.content1}></div>
        <div className={styles.container1}>
          <div className={styles.text}>{props.totalText ?? '总计'}</div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container2}>
          <div className={styles.text1}>
            <div className={styles.text1__listwrap}>{props.amountText ?? '800'}</div>
          </div>
          <div className={styles.text2}>
            <div className={styles.text2__listwrap}>{props.amountUnitText ?? '元'}</div>
          </div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container3}>
          <div className={styles.content2}>
            <div className={styles.text3}>{props.brandText ?? 'DOU+'}</div>
            <div className={styles.text4}>{props.couponTypeText ?? '优惠券'}</div>
          </div>
          <div className={styles.content3}>
            <div className={styles.text5}>
              {props.text ?? '账户内共有'}
            </div>
            <div className={styles.text6}>{props.couponCountText ?? '2'}</div>
            <div className={styles.text7}>{props.couponUnitText ?? '张券'}</div>
          </div>
        </div>
      </div>
      <div className={styles.wrap3}>
        <div className={styles.text8}>{props.actionText ?? '立即使用'}</div>
      </div>
      <div className={styles.wrap4}>
        <div className={styles.container4}>
          <div className={styles.text9}>{props.validityLabelText ?? '有效期：'}</div>
          <div className={styles.text10}>
            <div className={styles.text10__listwrap}>{props.remainingText ?? '仅剩'}</div>
          </div>
          <div className={styles.content4}>
            <div className={styles.text11}>
              <div className={styles.text11__listwrap}>{props.durationText ?? '12'}</div>
            </div>
          </div>
          <div className={styles.text12}>
            <div className={styles.text12__listwrap}>{props.timeUnitText ?? '小时'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
