/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/铃铛 4.png'

export type IGeneratedComponent = {
  titleText?: string
  contentText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    titleText = '很遗憾没有中奖',
    contentText = '先去看看DOU+其他活动吧~',
  } = props

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <img
              src={image1}
              className={styles.image}
            />
            <div className={styles.text}>{contentText}</div>
            <div className={styles.text1}>{titleText}</div>
            <div className={styles.main}>
              <img
                src={image2}
                className={styles.image1}
              />
              <img
                src={image3}
                className={styles.image2}
              />
            </div>
          </div>
        </div>
        <img src={image4} className={styles.image3} />
      </div>
    </div>
  )
}
