import React from 'react'
import InlineSvg from '../src/components/InlineSvg'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg?raw'
import image2 from './assets/image_2.svg?raw'
import image3 from './assets/image_3.svg?raw'
import image4 from './assets/image_4.svg?raw'
import image5 from './assets/image_5.svg?raw'
import image6 from './assets/image_6.svg?raw'

export interface DualCouponProps {
  coupon1Title?: string
  coupon1Prefix?: string
  coupon1Amount?: string
  coupon1Unit?: string
  coupon1Label?: string
  coupon2Title?: string
  coupon2Amount?: string
  coupon2Unit?: string
  coupon2Label?: string
  className?: string
}

export default function DualCoupon({
  coupon1Title = 'DOU+满赠券',
  coupon1Prefix = '最高',
  coupon1Amount = '275',
  coupon1Unit = '元',
  coupon1Label = '您可获得',
  coupon2Title = 'DOU+满赠券',
  coupon2Amount = '20',
  coupon2Unit = '元',
  coupon2Label = 'TA可获得',
  className,
}: DualCouponProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <InlineSvg src={image1} className={styles.image} />
          <InlineSvg src={image2} className={styles.image1} />
          <div className={styles.content}>
            <div className={styles.text}>{coupon1Title}</div>
          </div>
          <div className={styles.content1}>
            <div className={styles.main1}>
              <div className={styles.text1}>{coupon1Prefix}</div>
            </div>
            <div className={styles.main2}>
              <div className={styles.text2}>
                <span className={styles.text2__seg0}>{coupon1Amount}</span>
              </div>
              <div className={styles.text3}>
                <div className={styles.text3__listwrap}>{coupon1Unit}</div>
              </div>
            </div>
          </div>
          <InlineSvg src={image3} className={styles.image2} />
        </div>
        <div className={styles.container1}>
          <div className={styles.text4}>{coupon1Label}</div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container2}>
          <InlineSvg src={image4} className={styles.image3} />
          <InlineSvg src={image5} className={styles.image4} />
          <div className={styles.content2}>
            <div className={styles.text5}>{coupon2Title}</div>
          </div>
          <div className={styles.content3}>
            <div className={styles.text6}>
              <span className={styles.text6__seg0}>{coupon2Amount}</span>
            </div>
            <div className={styles.text7}>
              <div className={styles.text7__listwrap}>{coupon2Unit}</div>
            </div>
          </div>
          <InlineSvg src={image6} className={styles.image5} />
        </div>
        <div className={styles.container3}>
          <div className={styles.text8}>{coupon2Label}</div>
        </div>
      </div>
    </div>
  )
}
