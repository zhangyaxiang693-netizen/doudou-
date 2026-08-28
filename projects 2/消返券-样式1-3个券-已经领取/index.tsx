/* eslint-disable*/
import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <img src={require('./assets/image_1.svg')} className={styles.image} />
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}></div>
            <img
              src={require('./assets/image_2.svg')}
              className={styles.image1}
            />
            <img
              src={require('./assets/image_3.svg')}
              className={styles.image2}
            />
          </div>
          <img
            src={require('./assets/image_4.svg')}
            className={styles.image3}
          />
        </div>
        <img src={require('./assets/image_5.svg')} className={styles.image4} />
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text}>满68元可用</div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.text1}>10</div>
        <div className={styles.text2}>元</div>
      </div>
    </div>
  )
}
