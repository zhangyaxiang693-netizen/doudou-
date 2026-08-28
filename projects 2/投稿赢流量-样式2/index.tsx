/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'

export type IGeneratedComponent = {
  amountText?: string
  giftConditionText?: string
  quotaText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    amountText = '200',
    giftConditionText = '满30元赠',
    quotaText = '共计20名',
  } = props

  return (
    <div className={styles.page}>
      <img src={image1Url} className={styles.image} />
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.text}>{amountText}</div>
            <div className={styles.text1}>
              <div className={styles.text1__listwrap}>元</div>
            </div>
          </div>
          <div className={styles.text2}>{giftConditionText}</div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container1}>
          <div className={styles.content1}>
            <div className={styles.text3}>DOU+</div>
            <div className={styles.text4}>优惠券</div>
          </div>
          <div className={styles.text5}>{quotaText}</div>
        </div>
      </div>
    </div>
  )
}
