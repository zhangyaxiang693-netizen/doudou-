/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  amountText?: string
  conditionText?: string
  cardGradientStart?: string
  cardGradientEnd?: string
  buttonBackground?: string
  buttonTextColor?: string
  waveAccentColor?: string
}

function WaveDecoration({ color }: { color: string }) {
  return (
    <svg width="162" height="41" viewBox="0 0 162 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M161.489 0C161.563 0.749135 161.603 1.50874 161.603 2.27734C161.603 23.3365 144.531 40.4092 123.472 40.4092H38.1309C17.0717 40.4092 0 23.3365 0 2.27734C1.51712e-05 1.50878 0.0382614 0.749096 0.112305 0C1.61842 19.6803 18.0646 35.1806 38.1309 35.1807H123.472C143.538 35.1807 159.983 19.6803 161.489 0Z"
        fill={color}
      />
    </svg>
  )
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const style = {
    '--single-coupon-card-gradient-start': props.cardGradientStart || '#FF1473',
    '--single-coupon-card-gradient-end': props.cardGradientEnd || '#FF229F',
    '--single-coupon-button-background': props.buttonBackground || 'rgba(255, 94, 164, 1)',
    '--single-coupon-button-text-color': props.buttonTextColor || 'rgba(255, 158, 202, 1)',
  } as React.CSSProperties

  const cardBgStyle = {
    background: `linear-gradient(90deg, ${props.cardGradientStart || '#FF1473'} 0%, ${props.cardGradientEnd || '#FF229F'} 100%)`,
  } as React.CSSProperties

  const buttonStyle = {
    background: props.buttonBackground || 'rgba(255, 94, 164, 1)',
  } as React.CSSProperties

  const buttonTextStyle = {
    color: props.buttonTextColor || 'rgba(255, 158, 202, 1)',
  } as React.CSSProperties

  const waveColor = props.waveAccentColor || '#FF62A0'

  return (
    <div className={styles.page} style={style}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}>
              <div className={styles.section} style={cardBgStyle}>
                <div className={styles.subSection}></div>
                <div className={styles.subSection1}>
                  <WaveDecoration color={waveColor} />
                </div>
                <div className={styles.subSection2}>
                  <div className={styles.text}>{props.conditionText || '满50元可用'}</div>
                </div>
                <div className={styles.subSection3}>
                  <div className={styles.text1}>{props.amountText || '50'}</div>
                  <div className={styles.text2}>元</div>
                </div>
                <div className={styles.subSection4} style={buttonStyle}>
                  <div className={styles.text3} style={buttonTextStyle}>立即领</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
