import React from 'react'
import styles from './index.module.scss'

const resultBgUrl = new URL('./assets/image_1.svg', import.meta.url).href
const resultPrizeUrl = new URL('./assets/image_3.svg', import.meta.url).href

export interface LotteryResultPopupProps {
  hintText?: string
  titleText?: string
  buttonText?: string
  badgeText?: string
}

export default function LotteryResultPopup({
  hintText = '快去填写地址吧~',
  titleText = '恭喜抽中抖仔盲盒！',
  buttonText = '填写地址',
  badgeText = '？',
}: LotteryResultPopupProps) {
  return (
    <div
      className={styles.page}
      role="group"
      aria-label={`${titleText} ${hintText} ${buttonText}`}
    >
      <div className={styles.wrap}>
        <div className={styles.container}>
          <img src={resultBgUrl} className={styles.image} alt="" />
        </div>
      </div>
      <div className={styles.text}>{hintText}</div>
      <div className={styles.text1}>{titleText}</div>
      <div className={styles.wrap1}>
        <div className={styles.container1} />
        <div className={styles.text2}>{buttonText}</div>
      </div>
      <div className={styles.wrap2}>
        <img src={resultPrizeUrl} className={styles.image2} alt="" />
        <div className={styles.text3}>
          <span className={styles.text3__seg0}>{badgeText}</span>
        </div>
      </div>
    </div>
  )
}
