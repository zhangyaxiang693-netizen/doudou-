import React from 'react'
import InlineSvg from '../src/components/InlineSvg'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg?raw'
import image2 from './assets/image_2.svg?raw'
import image3 from './assets/image_3.svg?raw'
import image4 from './assets/image_4.svg?raw'
import image5 from './assets/image_5.svg?raw'
import image6 from './assets/image_6.svg?raw'
import image7 from './assets/image_7.svg?raw'
import image8 from './assets/image_8.svg?raw'
import image9 from './assets/image_9.svg?raw'
import image10 from './assets/image_10.svg?raw'
import image11 from './assets/image_11.svg?raw'
import image12 from './assets/image_12.svg?raw'
import image13 from './assets/image_13.svg?raw'
import image14 from './assets/image_14.svg?raw'
import image15 from './assets/image_15.svg?raw'

export interface CouponTriplePackProps {
  coupon1Amount?: string
  coupon1Unit?: string
  coupon1Condition?: string
  coupon1Button?: string
  coupon2Amount?: string
  coupon2Unit?: string
  coupon2Condition?: string
  coupon2Button?: string
  coupon3Amount?: string
  coupon3Unit?: string
  coupon3Condition?: string
  coupon3Button?: string
  className?: string
}

export default function CouponTriplePack({
  coupon1Amount = '50',
  coupon1Unit = '元',
  coupon1Condition = '满50元可用',
  coupon1Button = '待完成',
  coupon2Amount = '30',
  coupon2Unit = '元',
  coupon2Condition = '满50元可用',
  coupon2Button = '立即领',
  coupon3Amount = '30',
  coupon3Unit = '元',
  coupon3Condition = '满50元可用',
  coupon3Button = '立即领',
  className,
}: CouponTriplePackProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <InlineSvg src={image1} className={styles.image} />
          <div className={styles.content}>
            <InlineSvg src={image2} className={styles.image1} />
            <InlineSvg src={image3} className={styles.image2} />
          </div>
          <div className={styles.content1}>
            <div className={styles.text}>{coupon1Condition}</div>
          </div>
          <div className={styles.content2}>
            <div className={styles.text1}>{coupon1Amount}</div>
            <div className={styles.text2}>{coupon1Unit}</div>
          </div>
          <div className={styles.content3}>
            <div className={styles.text3}>{coupon1Button}</div>
          </div>
        </div>
        <div className={styles.container1}>
          <InlineSvg src={image4} className={styles.image3} />
          <div className={styles.content4}>
            <InlineSvg src={image5} className={styles.image4} />
            <InlineSvg src={image6} className={styles.image5} />
          </div>
          <div className={styles.content5}>
            <div className={styles.text4}>{coupon2Condition}</div>
          </div>
          <div className={styles.content6}>
            <div className={styles.text5}>{coupon2Amount}</div>
            <div className={styles.text6}>{coupon2Unit}</div>
          </div>
          <div className={styles.content7}>
            <div className={styles.text7}>{coupon2Button}</div>
            <InlineSvg src={image7} className={styles.image6} />
          </div>
          <div className={styles.content8}>
            <InlineSvg src={image8} className={styles.image7} />
            <InlineSvg src={image9} className={styles.image8} />
          </div>
        </div>
        <div className={styles.container2}>
          <InlineSvg src={image10} className={styles.image9} />
          <div className={styles.content9}>
            <InlineSvg src={image11} className={styles.image10} />
            <InlineSvg src={image12} className={styles.image11} />
          </div>
          <div className={styles.content10}>
            <div className={styles.text8}>{coupon3Condition}</div>
          </div>
          <div className={styles.content11}>
            <div className={styles.text9}>{coupon3Amount}</div>
            <div className={styles.text10}>{coupon3Unit}</div>
          </div>
          <div className={styles.content12}>
            <div className={styles.text11}>{coupon3Button}</div>
            <InlineSvg src={image13} className={styles.image12} />
          </div>
          <div className={styles.content13}>
            <InlineSvg src={image14} className={styles.image13} />
            <InlineSvg src={image15} className={styles.image14} />
          </div>
        </div>
      </div>
    </div>
  )
}