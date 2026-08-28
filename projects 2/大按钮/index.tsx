/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  buttonText?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
}

const originalColors = {
  buttonGradientStart: '#FF1473',
  buttonGradientEnd: '#FF229F',
}

function normalizeColor(value?: string) {
  return String(value || '').trim().toUpperCase()
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const buttonText = props.buttonText || '去投放'
  const gradientStart = props.buttonGradientStart || originalColors.buttonGradientStart
  const gradientEnd = props.buttonGradientEnd || originalColors.buttonGradientEnd
  const buttonStyle =
    normalizeColor(gradientStart) !== originalColors.buttonGradientStart ||
    normalizeColor(gradientEnd) !== originalColors.buttonGradientEnd
      ? {
          background: `linear-gradient(90deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        }
      : undefined

  return (
    <div className={styles.page}>
      <div className={styles.wrap} style={buttonStyle}>
        <div className={styles.text}>{buttonText}</div>
      </div>
    </div>
  )
}
