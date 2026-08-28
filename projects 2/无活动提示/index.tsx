/* eslint-disable*/
import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'
import image1 from './assets/Group 2147239563.png'

export type IGeneratedComponent = {}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}></div>
      <div className={styles.text}>
        <div className={styles.text__linebreak}>活动太火爆了</div>
        <div>请稍后再来看看吧～</div>
      </div>
      <img src={image1} className={styles.image} />
    </div>
  )
}
