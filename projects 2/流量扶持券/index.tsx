/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'
import image2Url from './assets/image_2.svg'

export type IGeneratedComponent = {
  supportText?: string
}

function splitSupportText(value?: string) {
  const text = String(value || '520元流量扶持').replace(/\s+/g, '')
  const match = text.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const suffixText = match?.[2] || '元流量扶持'
  return {
    amountText: match?.[1] || '520',
    unitText: suffixText.startsWith('元') ? '元' : '',
    labelText: suffixText.startsWith('元') ? suffixText.slice(1) : suffixText,
  }
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const { amountText, unitText, labelText } = splitSupportText(props.supportText)

  return (
    <div className={styles.page}>
      <img src={image1Url} className={styles.image} />
      <div className={styles.text}>
        <span className={styles.textUnit}>{unitText}</span>
        <span className={styles.textLabel}>{labelText}</span>
      </div>
      <div className={styles.text1}>{amountText}</div>
      <img src={image2Url} className={styles.image1} />
    </div>
  )
}
