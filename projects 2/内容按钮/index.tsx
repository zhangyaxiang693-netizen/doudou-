/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  buttonText?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const buttonText = props.buttonText || '一键上热门'
  const pageStyle =
    props.buttonGradientStart || props.buttonGradientEnd
      ? {
          background: `linear-gradient(90deg, ${props.buttonGradientStart || '#FF1473'} 0%, ${props.buttonGradientEnd || '#FF229F'} 100%)`,
        }
      : undefined

  return (
    <div className={styles.page} style={pageStyle}>
      <div className={styles.text}>{buttonText}</div>
    </div>
  )
}
