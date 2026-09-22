/* eslint-disable*/
import React, {useLayoutEffect, useRef} from 'react'
import styles from './index.module.scss'
import image7 from './assets/image_7.png'
import burstUrl from '../../头图/assets/爆炸 1.png'
import glowUrl from '../../头图/assets/Group 2147240474.png'
import LayeredMainVisual from '../分层主视觉'

export type IGeneratedComponent = {
  headlineText?: string
  campaignText?: string
  headlineHighlightText?: string
  mainVisualImage?: string
  burstColor?: string
  burstOpacity?: number | string
  glowOpacity?: number | string
  background?: string
  ribbonColor?: string
  textColor?: string
  headlineGradientTop?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
  buttonText?: string
}

const subjectStyles: Record<string, React.CSSProperties> = {
  'subject-2': {transform: 'translateY(-18px)'},
  'subject-3': {transform: 'translateY(-18px)'},
  'subject-4': {transform: 'translateY(-18px) scale(1.08)'},
}

function useFitText(value: string, maxFontSize: number, minFontSize: number) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const fit = () => {
      let size = maxFontSize
      element.style.fontSize = `${size}px`
      while (
        size > minFontSize &&
        (element.scrollWidth > element.clientWidth + 1 ||
          element.scrollHeight > element.clientHeight + 1)
      ) {
        size -= 1
        element.style.fontSize = `${size}px`
      }
    }

    fit()
    document.fonts?.ready.then(fit)
  }, [value, maxFontSize, minFontSize])

  return ref
}

function splitHeadlineLines(value: string) {
  const lines = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((segment) => {
      const characters = Array.from(segment)
      const chunks: string[] = []
      for (let index = 0; index < characters.length; index += 6) {
        chunks.push(characters.slice(index, index + 6).join(''))
      }
      return chunks
    })
  return lines.length ? lines : ['']
}

function getHeadlineLineParts(lines: string[], highlightText: string) {
  const normalizedHighlight = Array.from(highlightText.replace(/\s+/g, '')).join('')
  const fullText = lines.join('')
  const highlightStart = normalizedHighlight ? fullText.indexOf(normalizedHighlight) : -1
  const highlightEnd = highlightStart + normalizedHighlight.length
  let offset = 0

  return lines.map((line) => {
    const parts = Array.from(line).map((character) => {
      const index = offset
      offset += 1
      return {
        character,
        highlighted: highlightStart >= 0 && index >= highlightStart && index < highlightEnd,
      }
    })
    return parts
  })
}

function lightenHexColor(color: string, ratio = 0.35) {
  const hex = color.replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(hex)) return color
  const channels = [0, 2, 4].map((offset) => {
    const value = Number.parseInt(hex.slice(offset, offset + 2), 16)
    return Math.round(value + (255 - value) * ratio)
      .toString(16)
      .padStart(2, '0')
  })
  return `#${channels.join('')}`
}

function makeEvenGradient(background: string) {
  const colors = background.match(/#[0-9a-f]{6}/gi) || []
  const selectedColors = colors.length >= 4
    ? [colors[0], colors[1], colors[3]]
    : colors.filter(
        (color, index, list) => index === 0 || color.toLowerCase() !== list[index - 1].toLowerCase(),
      ).slice(0, 3)
  if (selectedColors.length < 3) return background
  const angle = background.match(/linear-gradient\(\s*([^,]+)/i)?.[1] || '180deg'
  return `linear-gradient(${angle}, ${selectedColors[0]} 0%, ${selectedColors[1]} 30%, ${lightenHexColor(selectedColors[2])} 100%)`
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    headlineText = '好礼天天抽 赢千元流量',
    campaignText = 'DOU+双节狂欢投',
    headlineHighlightText = '赢千元流量',
    mainVisualImage = 'subject-1',
    burstColor = '#0FB3FF',
    background = 'linear-gradient(180deg, #ABF9FF 0%, #B5FBFF 30%, #CAF1F3 100%)',
    ribbonColor = '#00C8F5',
    textColor = '#092E39',
    headlineGradientTop = '#008BD4',
    buttonGradientStart = '#FF180E',
    buttonGradientEnd = '#FF166F',
    buttonText = '立即参与',
  } = props
  const burstOpacity = Number(props.burstOpacity ?? 0.3)
  const glowOpacity = Number(props.glowOpacity ?? 0.6)
  const burstStyle: React.CSSProperties = {
    backgroundColor: burstColor,
    opacity: Number.isFinite(burstOpacity) ? burstOpacity : 0.3,
    WebkitMaskImage: `url(${burstUrl})`,
    maskImage: `url(${burstUrl})`,
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
  }
  const glowStyle: React.CSSProperties = {
    opacity: Number.isFinite(glowOpacity) ? glowOpacity : 0.6,
  }
  const headlineLines = splitHeadlineLines(headlineText)
  const headlineLineParts = getHeadlineLineParts(headlineLines, headlineHighlightText)
  const headlineRef = useFitText(headlineText, 66, 20)
  const campaignRef = useFitText(campaignText, 26, 12)
  const buttonRef = useFitText(buttonText, 40, 20)
  const buttonStyle = {
    background: `linear-gradient(90deg, ${buttonGradientStart} 0%, ${buttonGradientEnd} 100%)`,
  }
  const themeStyle = {
    '--checkout-background': makeEvenGradient(background),
    '--checkout-ribbon-color': ribbonColor,
    '--checkout-text-color': textColor,
    '--checkout-highlight-color': headlineGradientTop,
  } as React.CSSProperties

  return (
    <div className={styles.page}>
      <div className={styles.container} style={themeStyle}>
        <div className={styles.image}>
          <div ref={campaignRef} className={styles.campaignText}>
            {campaignText}
          </div>
        </div>
        <div className={styles.content}>
          <div
            ref={headlineRef}
            className={styles.main}
          >
            {headlineLineParts.map((parts, lineIndex) => (
              <span className={styles.headlineLine} key={`line-${lineIndex}`}>
                {parts.map((part, characterIndex) => (
                  <span
                    className={part.highlighted ? styles.headlineHighlight : undefined}
                    key={`${lineIndex}-${characterIndex}`}
                  >
                    {part.character}
                  </span>
                ))}
              </span>
            ))}
          </div>
          <div className={styles.image3}>
            <div className={styles.burst} style={burstStyle} />
            <img src={glowUrl} className={styles.glow} style={glowStyle} />
            <LayeredMainVisual
              scheme={mainVisualImage}
              className={styles.image4}
              style={subjectStyles[mainVisualImage]}
            />
            <div className={styles.actionButton} style={buttonStyle}>
              <div
                ref={buttonRef}
                className={styles.buttonText}
                data-react-edit-prop="buttonText"
              >
                {buttonText}
              </div>
            </div>
            <img
              src={image7}
              className={styles.image6}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
