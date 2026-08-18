import React from 'react'
import styles from './index.module.scss'

export interface PromotionDataProps {
  label1?: string
  value1?: string
  label2?: string
  value2?: string
  buttonText?: string
  className?: string
}

export default function PromotionData({
  label1 = '我的消耗(元)',
  value1 = '900',
  label2 = '已领取优惠券(张)',
  value2 = '1',
  buttonText = '去投放',
  className,
}: PromotionDataProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}></div>
      <div className={styles.wrap1}>
        <div className={styles.container}>
          <div className={styles.text}>
            <span className={styles.text__seg0}>{label1}</span>
          </div>
          <div className={styles.text1}>
            <span className={styles.text1__seg0}>{value1}</span>
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.text2}>
            <span className={styles.text2__seg0}>{label2}</span>
          </div>
          <div className={styles.text3}>
            <span className={styles.text3__seg0}>{value2}</span>
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.content}>
            <div className={styles.text4}>
              <span className={styles.text4__seg0}>{buttonText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
