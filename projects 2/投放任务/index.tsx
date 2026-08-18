import React from 'react'
import InlineSvg from '../src/components/InlineSvg'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg?raw'

export interface PromotionModuleProps {
  status?: string
  title?: string
  rewardLabel?: string
  rewardCount?: string
  description?: string
  className?: string
}

export default function PromotionModule({
  status = '已完成',
  title = '投放一单DOU+',
  rewardLabel = '抽奖',
  rewardCount = '+1',
  description = '使用粉丝经营、内容加热目标',
  className,
}: PromotionModuleProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}></div>
      <div className={styles.wrap1}>
        <div className={styles.container}>
          <div className={styles.text}>{status}</div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container1}>
          <div className={styles.content}>
            <div className={styles.main}></div>
            <InlineSvg src={image1} className={styles.image} />
          </div>
          <div className={styles.text1}>{title}</div>
          <div className={styles.content1}>
            <div className={styles.main1}>
              <div className={styles.text2}>{rewardLabel}</div>
            </div>
            <div className={styles.text3}>{rewardCount}</div>
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.text4}>{description}</div>
        </div>
      </div>
    </div>
  )
}
