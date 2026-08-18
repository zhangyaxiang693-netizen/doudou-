import React from 'react'
import InlineSvg from '../src/components/InlineSvg'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg?raw'
import image2 from './assets/image_2.svg?raw'
import image3 from './assets/image_3.svg?raw'
import image4 from './assets/image_4.svg?raw'

export interface BigDayCouponClassicProps {
  amount?: string
  unit?: string
  expiry?: string
  prefix?: string
  title?: string
  className?: string
}

export default function BigDayCouponClassic({
  amount = '800',
  unit = '元',
  expiry = '仅剩 1 天使用',
  prefix = 'DOU+',
  title = '优惠券',
  className,
}: BigDayCouponClassicProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}>
        <InlineSvg src={image1} className={styles.image} />
        <InlineSvg src={image2} className={styles.image1} />
        <div className={styles.container}>
          <InlineSvg src={image3} className={styles.image2} />
          <InlineSvg src={image4} className={styles.image3} />
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text}>{amount}</div>
        <div className={styles.container1}>
          <div className={styles.text1}>
            <div className={styles.text1__listwrap}>{unit}</div>
          </div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.text2}>{expiry.replace(/ /g, '\u00a0')}</div>
      </div>
      <div className={styles.wrap3}>
        <div className={styles.text3}>{prefix}</div>
        <div className={styles.text4}>{title}</div>
      </div>
    </div>
  )
}