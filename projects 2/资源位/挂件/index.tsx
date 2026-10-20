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
  'subject-5': {
    transform: 'translateY(-1px) scale(0.9)',
  },
}

const subjectLayerImageStyles: Record<string, Record<number, React.CSSProperties>> = {
  'subject-5': {
    1: {
      transform: 'translateY(12px) scale(1.16)',
    },
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
        className={[
          styles.image,
          mainVisualImage === 'subject-5' ? styles.subject5Image : '',
        ].filter(Boolean).join(' ')}
        style={subjectStyles[mainVisualImage]}
        layerImageStyles={subjectLayerImageStyles[mainVisualImage]}
      />
      <div className={styles.wrap} data-gif-button-pulse>
        <div
          className={styles.container}
          style={{backgroundColor: buttonColor}}
          data-png-button-shine
        >
          <span
            className={styles.buttonText}
            style={{fontSize}}
            data-react-edit-prop="buttonText"
          >
            {buttonText}
          </span>
        </div>
      </div>
    </div>
  )
}
