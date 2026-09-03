/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import burstUrl from './assets/爆炸 1.png'
import glowUrl from './assets/Group 2147240474.png'
import mainVisualUrl from './assets/主视觉.png'
import ribbonUrl from './assets/彩带 1.png'

export type IGeneratedComponent = {
  text?: string
  headlineText?: string
  dateText?: string
  burstColor?: string
  burstOpacity?: number | string
  mainVisualImage?: string
  ribbonColor?: string
  glowOpacity?: number | string
  textColor?: string
  buttonBackgroundColor?: string
  headlineGradientTop?: string
  headlineGradientBottom?: string
}

function getTextUnit(char: string) {
  if (/[\u4e00-\u9fff]/.test(char)) return 1
  if (/[0-9]/.test(char)) return 0.56
  if (/[a-zA-Z]/.test(char)) return 0.62
  return 0.5
}

function splitTitleLines(value: string) {
  const lines: string[] = []
  let current = ''
  let width = 0
  const maxWidth = 4.2
  Array.from(value).forEach((char) => {
    const charWidth = getTextUnit(char)
    if (current && width + charWidth > maxWidth) {
      lines.push(current)
      current = char
      width = charWidth
      return
    }
    current += char
    width += charWidth
  })
  if (current) lines.push(current)
  return lines
}

function renderTitleTextWithNumberFont(value: string) {
  const segments = value.split(/([0-9０-９]+)/g)
  return segments.map((segment, index) => {
    if (!segment) return null
    if (/^[0-9０-９]+$/.test(segment)) {
      return (
        <span key={`${segment}-${index}`} className={styles.douyinNumber}>
          {segment}
        </span>
      )
    }
    return segment
  })
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const hasText = props.text !== undefined && props.text !== null
  const text =
    props.headlineText && (!hasText || props.text === '流量大奖')
      ? `${props.headlineText}${props.text || '流量大奖'}`
      : hasText
        ? props.text || ''
        : '抽666元流量大奖'
  const titleLines = splitTitleLines(text)
  const dateText = props.dateText || '6月10日-6月21日'
  const mainTextColor = props.textColor || '#2C0113'
  const burstOpacity = Number(props.burstOpacity ?? 0.5)
  const glowOpacity = Number(props.glowOpacity ?? 0.6)
  const burstStyle: React.CSSProperties = {
    backgroundColor: props.burstColor || props.headlineGradientTop || '#FF88C1',
    opacity: Number.isFinite(burstOpacity) ? burstOpacity : 0.5,
    WebkitMaskImage: `url(${burstUrl})`,
    maskImage: `url(${burstUrl})`,
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
  }
  const ribbonStyle: React.CSSProperties = {
    backgroundColor: props.ribbonColor || props.buttonBackgroundColor || '#FF62B8',
    WebkitMaskImage: `url(${ribbonUrl})`,
    maskImage: `url(${ribbonUrl})`,
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
  }
  const buttonStyle = props.buttonBackgroundColor ? {background: props.buttonBackgroundColor} : undefined
  const glowStyle: React.CSSProperties = {
    opacity: Number.isFinite(glowOpacity) ? glowOpacity : 0.6,
  }
  const titleStyle = {
    color: mainTextColor,
  }
  const firstLineStyle = {
    backgroundImage: `linear-gradient(180deg, ${props.headlineGradientTop || '#FF5F5F'} 0%, ${mainTextColor} 34%, ${props.headlineGradientBottom || mainTextColor} 100%)`,
  }

  return (
    <div className={styles.page}>
      <div className={styles.image} style={burstStyle} />
      <img src={glowUrl} className={styles.image1} style={glowStyle} />
      <img src={props.mainVisualImage || mainVisualUrl} className={styles.image2} />
      <div className={styles.image3} style={ribbonStyle} />
      <div className={styles.wrap}>
        <div className={styles.text} style={titleStyle} data-react-edit-prop="text">
          {titleLines.map((line, index) => (
            <span
              key={`${line}-${index}`}
              className={`${styles.textLine} ${index === 0 ? styles.textLineGradient : styles.textLineSolid}`}
              style={index === 0 ? firstLineStyle : undefined}
            >
              {renderTitleTextWithNumberFont(line)}
            </span>
          ))}
        </div>
        <div className={styles.container}>
          <div className={styles.content} style={buttonStyle}></div>
          <div className={styles.text1} data-react-edit-prop="dateText">{dateText}</div>
        </div>
      </div>
    </div>
  )
}
