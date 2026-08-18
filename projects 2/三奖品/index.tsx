import React from 'react'
import { createCssVars, toCssLength } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface ThreePrizesProps {
  prize1?: string
  prize2?: string
  prize3?: string
  prizeImage1?: string
  prizeImage2?: string
  prizeImage3?: string
  textFontFamily?: string
  textFontSize?: number | string
  textLetterSpacing?: number | string
  textColor?: string
  bgColor?: string
  borderRadius?: number | string
  className?: string
}

export default function ThreePrizes({
  prize1 = '抖仔限量盲盒',
  prize2 = '剪映VIP月卡',
  prize3 = 'DOU+流量券',
  prizeImage1,
  prizeImage2,
  prizeImage3,
  textFontFamily,
  textFontSize,
  textLetterSpacing,
  textColor,
  bgColor,
  borderRadius,
  className,
}: ThreePrizesProps) {
  let cardBackground: string | undefined
  if (bgColor !== undefined && bgColor !== '') {
    const hex = bgColor.trim()
    const getRgb = (hexColor: string): { r: number; g: number; b: number } | null => {
      let h = hexColor.replace('#', '')
      if (h.length === 3) {
        h = h.split('').map(c => c + c).join('')
      }
      if (h.length !== 6) return null
      const num = parseInt(h, 16)
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      }
    }
    const rgb = getRgb(hex)
    if (rgb) {
      cardBackground = `linear-gradient(180deg, ${hex} 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 100%)`
    } else {
      cardBackground = `linear-gradient(180deg, ${hex} 0%, rgba(255, 238, 243, 0) 100%)`
    }
  }
  const cardRadius = borderRadius !== undefined ? toCssLength(borderRadius) : undefined
  const style = createCssVars({
    threePrizesCardBackground: cardBackground,
    threePrizesContainerBorderRadius: cardRadius,
    threePrizesContainer6BorderRadius: cardRadius,
    threePrizesContainer3BorderRadius: cardRadius,
    threePrizesTextFontFamily: textFontFamily,
    threePrizesTextFontSize: textFontSize !== undefined ? toCssLength(textFontSize) : undefined,
    threePrizesTextLetterSpacing: textLetterSpacing !== undefined ? toCssLength(textLetterSpacing) : undefined,
    threePrizesTextColor: textColor,
    threePrizesText1FontFamily: textFontFamily,
    threePrizesText1FontSize: textFontSize !== undefined ? toCssLength(textFontSize) : undefined,
    threePrizesText1LetterSpacing: textLetterSpacing !== undefined ? toCssLength(textLetterSpacing) : undefined,
    threePrizesText1Color: textColor,
    threePrizesText2FontFamily: textFontFamily,
    threePrizesText2FontSize: textFontSize !== undefined ? toCssLength(textFontSize) : undefined,
    threePrizesText2LetterSpacing: textLetterSpacing !== undefined ? toCssLength(textLetterSpacing) : undefined,
    threePrizesText2Color: textColor,
  })

  const placeholderStyle = (img?: string): React.CSSProperties => {
    const style: React.CSSProperties = {}
    if (img && img !== '') {
      style.backgroundImage = `url(${img})`
      style.backgroundSize = 'contain'
      style.backgroundPosition = 'center'
      style.backgroundRepeat = 'no-repeat'
      style.boxShadow = 'none'
    }
    return style
  }

  return (
    <div className={`${styles.page} ${className || ''}`} style={style}>
      <div className={styles.wrap}>
        <div className={styles.container}></div>
        <div className={styles.container1}>
          <div className={styles.placeholder} style={placeholderStyle(prizeImage1)} />
        </div>
        <div className={styles.container2}>
          <div className={styles.text}>
            <span className={styles.text__seg0}>{prize1}</span>
          </div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container6}></div>
        <div className={styles.container7}>
          <div className={styles.placeholder} style={placeholderStyle(prizeImage2)} />
        </div>
        <div className={styles.text2Wrap}>
          <div className={styles.text2}>
            <span className={styles.text2__seg0}>{prize2}</span>
          </div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container3}></div>
        <div className={styles.container4}>
          <div className={styles.placeholder} style={placeholderStyle(prizeImage3)} />
        </div>
        <div className={styles.container5}>
          <div className={styles.text1}>
            <span className={styles.text1__seg0}>{prize3}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
