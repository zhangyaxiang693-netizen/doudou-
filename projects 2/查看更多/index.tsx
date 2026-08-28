/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  text?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const text = props.text || '查看更多内容诊断信息\u00a0>>'

  return <div className={styles.text}>{text}</div>
}
