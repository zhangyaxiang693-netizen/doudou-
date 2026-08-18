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

export interface TripleOpenCouponProps {
  coupon1Title?: string
  coupon1Amount?: string
  coupon1Unit?: string
  coupon1Condition?: string
  coupon1Limit?: string
  coupon2Title?: string
  coupon2Amount?: string
  coupon2Unit?: string
  coupon2Condition?: string
  coupon2Limit?: string
  coupon3Title?: string
  coupon3Amount?: string
  coupon3Unit?: string
  coupon3Condition?: string
  coupon3Limit?: string
  className?: string
}

export default function TripleOpenCoupon({
  coupon1Title = 'DOU+福利券',
  coupon1Amount = '880',
  coupon1Unit = '元',
  coupon1Condition = '满100元可用',
  coupon1Limit = '限量10个',
  coupon2Title = 'DOU+福利券',
  coupon2Amount = '88',
  coupon2Unit = '元',
  coupon2Condition = '满30元可用',
  coupon2Limit = '限量30个',
  coupon3Title = 'DOU+福利券',
  coupon3Amount = '8',
  coupon3Unit = '元',
  coupon3Condition = '满30元可用',
  coupon3Limit = '限量50个',
  className,
}: TripleOpenCouponProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <InlineSvg src={image1} className={styles.image} />
            <InlineSvg src={image2} className={styles.image1} />
            <InlineSvg src={image3} className={styles.image2} />
          </div>
          <div className={styles.content1}>
            <div className={styles.main}>
              <div className={styles.text}>{coupon1Title}</div>
            </div>
          </div>
          <div className={styles.content2}>
            <div className={styles.text1}>
              <span className={styles.text1__seg0}>{coupon1Amount}</span>
            </div>
            <div className={styles.text2}>
              <div className={styles.text2__listwrap}>
                <span className={styles.text2__seg0}>{coupon1Unit}</span>
              </div>
            </div>
          </div>
          <div className={styles.content3}>
            <div className={styles.text3}>
              <div className={styles.text3__listwrap}>
                <span className={styles.text3__seg0}>{coupon1Condition}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.text4}>{coupon1Limit}</div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container2}>
          <div className={styles.content4}>
            <InlineSvg src={image4} className={styles.image3} />
            <InlineSvg src={image5} className={styles.image4} />
            <InlineSvg src={image6} className={styles.image5} />
          </div>
          <div className={styles.content5}>
            <div className={styles.main1}>
              <div className={styles.text5}>{coupon2Title}</div>
            </div>
          </div>
          <div className={styles.content6}>
            <div className={styles.text6}>
              <span className={styles.text6__seg0}>{coupon2Amount}</span>
            </div>
            <div className={styles.text7}>
              <div className={styles.text7__listwrap}>
                <span className={styles.text7__seg0}>{coupon2Unit}</span>
              </div>
            </div>
          </div>
          <div className={styles.content7}>
            <div className={styles.text8}>
              <div className={styles.text8__listwrap}>
                <span className={styles.text8__seg0}>{coupon2Condition}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.text9}>{coupon2Limit}</div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container4}>
          <div className={styles.content8}>
            <InlineSvg src={image7} className={styles.image6} />
            <InlineSvg src={image8} className={styles.image7} />
            <InlineSvg src={image9} className={styles.image8} />
          </div>
          <div className={styles.content9}>
            <div className={styles.main2}>
              <div className={styles.text10}>{coupon3Title}</div>
            </div>
          </div>
          <div className={styles.content10}>
            <div className={styles.text11}>
              <span className={styles.text11__seg0}>{coupon3Amount}</span>
            </div>
            <div className={styles.text12}>
              <div className={styles.text12__listwrap}>
                <span className={styles.text12__seg0}>{coupon3Unit}</span>
              </div>
            </div>
          </div>
          <div className={styles.content11}>
            <div className={styles.text13}>
              <div className={styles.text13__listwrap}>
                <span className={styles.text13__seg0}>{coupon3Condition}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container5}>
          <div className={styles.text14}>{coupon3Limit}</div>
        </div>
      </div>
    </div>
  )
}
