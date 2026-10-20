/* eslint-disable*/
import React, {useLayoutEffect, useRef} from 'react'
import styles from './index.module.scss'
import image6 from './assets/image_6.png'
import LayeredMainVisual from '../分层主视觉'

export type IGeneratedComponent = {
  campaignText?: string
  showCampaignTag?: boolean
  headlineText?: string
  headlineHighlightText?: string
  mainVisualImage?: string
  background?: string
  campaignBackgroundColor?: string
  headlineTextColor?: string
  headlineHighlightColor?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
  buttonText?: string
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

function useFitHeadlineLines(value: string) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const fit = () => {
      const lines = Array.from(element.children) as HTMLElement[]
      lines.forEach((line, index) => {
        let size = index === 1 ? 80 : 66
        line.style.fontSize = `${size}px`
        while (size > 28 && line.scrollWidth > line.clientWidth + 1) {
          size -= 1
          line.style.fontSize = `${size}px`
        }
      })
    }

    fit()
    document.fonts?.ready.then(fit)
  }, [value])

  return ref
}

function getHeadlineLines(value: string) {
  const normalized = value.replace(/\r\n?/g, '\n').trim()
  if (!normalized) return ['']

  const manualLines = normalized.split('\n')
  if (manualLines.length > 1) {
    return [
      manualLines[0].trim(),
      manualLines.slice(1).join(' ').replace(/\s+/g, ' ').trim(),
    ]
  }

  const singleLine = normalized.replace(/\s+/g, ' ')
  const characters = Array.from(singleLine)
  if (characters.length <= 8) return [singleLine]

  return [
    characters.slice(0, 8).join('').trimEnd(),
    characters.slice(8).join('').trimStart(),
  ]
}

function getHeadlineLineParts(lines: string[], highlightText: string) {
  const normalizedHighlight = Array.from(highlightText.replace(/\s+/g, '')).join('')
  const fullText = lines.join('')
  const highlightStart = normalizedHighlight ? fullText.indexOf(normalizedHighlight) : -1
  const highlightEnd = highlightStart + normalizedHighlight.length
  let offset = 0

  return lines.map((line) => {
    const lineStart = offset
    const lineEnd = lineStart + line.length
    offset = lineEnd

    if (highlightStart < 0 || highlightStart >= lineEnd || highlightEnd <= lineStart) {
      return [{text: line, highlighted: false}]
    }

    const localStart = Math.max(0, highlightStart - lineStart)
    const localEnd = Math.min(line.length, highlightEnd - lineStart)
    return [
      {text: line.slice(0, localStart), highlighted: false},
      {text: line.slice(localStart, localEnd), highlighted: true},
      {text: line.slice(localEnd), highlighted: false},
    ].filter((part) => part.text)
  })
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    campaignText = 'DOU+双节狂欢投',
    showCampaignTag = true,
    headlineText = '投一单DOU+ 抽千元流量',
    headlineHighlightText = 'DOU+',
    mainVisualImage = 'subject-1',
    background = 'linear-gradient(165deg, #FF88C1 0%, #FFC1D5 20%, #FFF1F4 100%)',
    campaignBackgroundColor = '#B64CFF',
    headlineTextColor = '#240939',
    headlineHighlightColor = '#8D16E8',
    buttonGradientStart = '#FF180E',
    buttonGradientEnd = '#FF166F',
    buttonText = '立即参与',
  } = props
  const campaignRef = useFitText(campaignText, 30, 14)
  const headlineRef = useFitHeadlineLines(headlineText)
  const buttonTextRef = useFitText(buttonText, 40, 20)
  const headlineLines = getHeadlineLines(headlineText)
  const headlineLineParts = getHeadlineLineParts(headlineLines, headlineHighlightText)
  const themeStyle = {
    '--retention-popup-background': background,
    '--retention-popup-campaign-color': campaignBackgroundColor,
    '--retention-popup-text-color': headlineTextColor,
    '--retention-popup-highlight-color': headlineHighlightColor,
    '--retention-popup-button-background': `linear-gradient(90deg, ${buttonGradientStart} 0%, ${buttonGradientEnd} 100%)`,
  } as React.CSSProperties

  return (
    <div className={styles.page} style={themeStyle}>
      <LayeredMainVisual
        scheme={mainVisualImage}
        className={styles.mainVisual}
        style={mainVisualImage === 'subject-5' ? {transform: 'translateY(6px)'} : undefined}
      />
      <div className={styles.container}>
        <div className={[styles.campaignBadge, !showCampaignTag && styles.campaignBadgeHidden].filter(Boolean).join(' ')}>
          <div
            ref={campaignRef}
            className={styles.campaignText}
            data-react-edit-prop="campaignText"
          >
            {Array.from(campaignText).map((character, index) => (
              <span
                className={/[A-Za-z0-9+]/.test(character) ? styles.campaignLatin : undefined}
                key={`${character}-${index}`}
              >
                {character}
              </span>
            ))}
          </div>
        </div>
        <div
          ref={headlineRef}
          className={[styles.headline, !showCampaignTag && styles.headlineWithoutCampaignTag].filter(Boolean).join(' ')}
          data-react-edit-prop="headlineText"
        >
          {headlineLineParts.map((parts, lineIndex) => (
            <span className={styles.headlineLine} key={`line-${lineIndex}`}>
              {parts.map((part, partIndex) => (
                <span
                  className={part.highlighted ? styles.headlineHighlight : undefined}
                  key={`${lineIndex}-${partIndex}`}
                >
                  {part.text}
                </span>
              ))}
            </span>
          ))}
        </div>
        <div className={styles.button} data-png-button-shine data-gif-button-pulse>
          <div
            ref={buttonTextRef}
            className={styles.buttonText}
            data-react-edit-prop="buttonText"
          >
            {buttonText}
          </div>
        </div>
        <img
          src={image6}
          className={styles.hand}
        />
      </div>
    </div>
  )
}
