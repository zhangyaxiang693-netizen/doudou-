/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import decorationUrl from './assets/image_2.png'
import currencyUrl from './assets/image_3.png'

export type IGeneratedComponent = {
  amount?: string | number
  className?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const amount = String(props.amount ?? '10').trim() || '10'
const amountClassName = [
    styles.amount,
    amount.length >= 4 ? styles.amountSmall : '',
    amount.length === 3 ? styles.amountMedium : '',
  ].filter(Boolean).join(' ')
  const valueRowClassName = [
    styles.valueRow,
    amount.length === 3 ? styles.valueRowThreeDigits : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={`${styles.page} ${props.className || ''}`}>
      <div className={styles.image}>
        <img src={decorationUrl} className={styles.image3} />
        <div className={valueRowClassName}>
          <img src={currencyUrl} className={styles.currency} />
          <div className={amountClassName}>{amount}</div>
        </div>
      </div>
    </div>
  )
}
