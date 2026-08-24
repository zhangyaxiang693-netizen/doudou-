/* eslint-disable*/
import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  text?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.text}>
        {props.text || '*奖励将于活动结束后5个工作日内发放至获奖用户DOU+账户'}
      </div>
    </div>
  )
}
