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

export interface TripleFlatCouponBgProps {
  coupon1Title?: string
  coupon1Amount?: string
  coupon1Unit?: string
  coupon1Tag?: string
  coupon2Title?: string
  coupon2Amount?: string
  coupon2Unit?: string
  coupon2Tag?: string
  coupon3Title?: string
  coupon3Amount?: string
  coupon3Unit?: string
  coupon3Tag?: string
  className?: string
}

export default function TripleFlatCouponBg({
  coupon1Title = 'DOU+满赠券',
  coupon1Amount = '800',
  coupon1Unit = '元',
  coupon1Tag = '叠加',
  coupon2Title = 'DOU+满赠券',
  coupon2Amount = '800',
  coupon2Unit = '元',
  coupon2Tag = '叠加',
  coupon3Title = 'DOU+满赠券',
  coupon3Amount = '800',
  coupon3Unit = '元',
  coupon3Tag = '叠加',
  className,
}: TripleFlatCouponBgProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}></div>
      <div className={styles.wrap1}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}>
              <InlineSvg src={image1} className={styles.image} />
              <InlineSvg src={image2} className={styles.image1} />
              <InlineSvg src={image3} className={styles.image2} />
            </div>
            <div className={styles.main1}>
              <div className={styles.text}>{coupon1Title}</div>
            </div>
            <div className={styles.main2}>
              <div className={styles.text1}>
                <span className={styles.text1__seg0}>{coupon1Amount}</span>
              </div>
              <div className={styles.text2}>
                <div className={styles.text2__listwrap}>
                  <span className={styles.text2__seg0}>{coupon1Unit}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content1}>
            <div className={styles.text3}>{coupon1Tag}</div>
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.content2}>
            <div className={styles.main3}>
              <InlineSvg src={image4} className={styles.image3} />
              <InlineSvg src={image5} className={styles.image4} />
              <InlineSvg src={image6} className={styles.image5} />
            </div>
            <div className={styles.main4}>
              <div className={styles.text4}>{coupon2Title}</div>
            </div>
            <div className={styles.main5}>
              <div className={styles.text5}>
                <span className={styles.text5__seg0}>{coupon2Amount}</span>
              </div>
              <div className={styles.text6}>
                <div className={styles.text6__listwrap}>
                  <span className={styles.text6__seg0}>{coupon2Unit}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content3}>
            <div className={styles.text7}>{coupon2Tag}</div>
          </div>
          <div className={styles.content4}>
            <InlineSvg src={image7} className={styles.image6} />
            <InlineSvg src={image8} className={styles.image7} />
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.content5}>
            <div className={styles.main6}>
              <InlineSvg src={image9} className={styles.image8} />
              <InlineSvg src={image10} className={styles.image9} />
              <InlineSvg src={image11} className={styles.image10} />
            </div>
            <div className={styles.main7}>
              <div className={styles.text8}>{coupon3Title}</div>
            </div>
            <div className={styles.main8}>
              <div className={styles.text9}>
                <span className={styles.text9__seg0}>{coupon3Amount}</span>
              </div>
              <div className={styles.text10}>
                <div className={styles.text10__listwrap}>
                  <span className={styles.text10__seg0}>{coupon3Unit}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content6}>
            <div className={styles.text11}>{coupon3Tag}</div>
          </div>
          <div className={styles.content7}>
            <InlineSvg src={image12} className={styles.image11} />
            <InlineSvg src={image13} className={styles.image12} />
          </div>
        </div>
      </div>
    </div>
  )
}
