/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import LayeredMainVisual from '../分层主视觉'

export type IGeneratedComponent = {
  buttonText?: string
  buttonColor?: string
  mainVisualImage?: string
}

const subjectStyles: Record<string, React.CSSProperties> = {
  'subject-2': {
    transform: 'translateY(-8px) scale(0.88)',
  },
  'subject-3': {
    transform: 'translateY(-13px) scale(0.88)',
  },
  'subject-4': {
    transform: 'translateY(-8px)',
  },
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    buttonText = '七夕抽奖',
    buttonColor = '#FF1372',
    mainVisualImage = 'subject-1',
  } = props
  const textUnits = Array.from(buttonText).reduce(
    (sum, character) => sum + (/[\u0000-\u00ff]/.test(character) ? 0.55 : 1),
    0,
  )
  const fontSize = Math.min(20, 112 / Math.max(1, textUnits))

  return (
    <div className={styles.page}>
      <LayeredMainVisual
        scheme={mainVisualImage}
        className={styles.image}
        style={subjectStyles[mainVisualImage]}
      />
      <div className={styles.wrap}>
        <div className={styles.container} style={{backgroundColor: buttonColor}}>
          <span className={styles.buttonText} style={{fontSize}}>
            {buttonText}
          </span>
        </div>
      </div>
    </div>
  )
}
