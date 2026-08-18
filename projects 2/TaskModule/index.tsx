import React from 'react'
import InlineSvg from '../src/components/InlineSvg'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg?raw'
import image2 from './assets/image_2.svg?raw'

export interface TaskModuleProps {
  frequency?: string
  buttonText?: string
  title?: string
  rewardLabel?: string
  rewardCount?: string
  description?: string
  className?: string
}

export default function TaskModule({
  frequency = '12次/天',
  buttonText = '去完成',
  title = '投放DOU+现金消耗≥30元',
  rewardLabel = '抽奖',
  rewardCount = '+1',
  description = '投粉丝经营、内容加热目标且消耗达标',
  className,
}: TaskModuleProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}>
        <InlineSvg src={image1} className={styles.image} />
        <div className={styles.container}>
          <div className={styles.text}>{frequency}</div>
        </div>
        <div className={styles.container1}>
          <div className={styles.content}>
            <div className={styles.text1}>{buttonText}</div>
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.content1}>
            <div className={styles.text2}>{title}</div>
            <div className={styles.main}>
              <div className={styles.section}>
                <div className={styles.text3}>{rewardLabel}</div>
              </div>
              <div className={styles.text4}>{rewardCount}</div>
            </div>
          </div>
          <div className={styles.content2}>
            <div className={styles.text5}>{description}</div>
          </div>
        </div>
      </div>
      <InlineSvg src={image2} className={styles.image1} />
    </div>
  )
}
