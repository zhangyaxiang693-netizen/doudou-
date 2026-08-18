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

export interface TopicContestNewPrizeProps {
  firstPrizeTitle?: string
  firstPrizeDesc?: string
  firstPrizeAmount?: string
  firstPrizeUnit?: string
  secondPrizeTitle?: string
  secondPrizeDesc?: string
  secondPrizeAmount?: string
  secondPrizeUnit?: string
  thirdPrizeTitle?: string
  thirdPrizeDesc?: string
  thirdPrizeAmount?: string
  thirdPrizeUnit?: string
  className?: string
}

export default function TopicContestNewPrize({
  firstPrizeTitle = 'DOU+流量券',
  firstPrizeDesc = '一等奖*10',
  firstPrizeAmount = '888',
  firstPrizeUnit = '元',
  secondPrizeTitle = 'DOU+流量券',
  secondPrizeDesc = '二等奖*50',
  secondPrizeAmount = '188',
  secondPrizeUnit = '元',
  thirdPrizeTitle = 'DOU+流量券',
  thirdPrizeDesc = '三等奖*100',
  thirdPrizeAmount = '88',
  thirdPrizeUnit = '元',
  className,
}: TopicContestNewPrizeProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}>
        <InlineSvg src={image1} className={styles.image} />
        <InlineSvg src={image2} className={styles.image1} />
        <InlineSvg src={image3} className={styles.image2} />
        <InlineSvg src={image4} className={styles.image3} />
        <div className={styles.text}>
          <span className={styles.text__seg0}>{secondPrizeTitle}</span>
        </div>
        <div className={styles.text1}>{secondPrizeDesc}</div>
        <div className={styles.container}>
          <div className={styles.text2}>
            <span className={styles.text2__seg0}>{secondPrizeAmount}</span>
          </div>
          <div className={styles.text3}>{secondPrizeUnit}</div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container1}>
          <InlineSvg src={image5} className={styles.image4} />
          <InlineSvg src={image6} className={styles.image5} />
          <InlineSvg src={image7} className={styles.image6} />
          <InlineSvg src={image8} className={styles.image7} />
          <div className={styles.text4}>{firstPrizeTitle}</div>
        </div>
        <div className={styles.container2}>
          <div className={styles.text5}>{firstPrizeDesc}</div>
        </div>
        <div className={styles.container3}>
          <div className={styles.text6}>
            <span className={styles.text6__seg0}>{firstPrizeAmount}</span>
          </div>
          <div className={styles.text7}>{firstPrizeUnit}</div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <InlineSvg src={image9} className={styles.image8} />
        <InlineSvg src={image10} className={styles.image9} />
        <InlineSvg src={image11} className={styles.image10} />
        <InlineSvg src={image12} className={styles.image11} />
        <div className={styles.text8}>
          <span className={styles.text8__seg0}>{thirdPrizeTitle}</span>
        </div>
        <div className={styles.text9}>{thirdPrizeDesc}</div>
        <div className={styles.container4}>
          <div className={styles.text10}>
            <span className={styles.text10__seg0}>{thirdPrizeAmount}</span>
          </div>
          <div className={styles.text11}>{thirdPrizeUnit}</div>
        </div>
      </div>
    </div>
  )
}
