/* eslint-disable*/
import React, {useLayoutEffect, useRef} from 'react'
import styles from './index.module.scss'
import image6 from './assets/image_6.png'
import BigButton from '../../大按钮'
import LayeredMainVisual from '../分层主视觉'

export type IGeneratedComponent = {
  campaignText?: string
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

function getHeadlineParts(value: string, highlightText: string) {
  const normalizedHighlight = highlightText.trim()
  if (!normalizedHighlight) return [{text: value, highlighted: false}]
  const start = value.indexOf(normalizedHighlight)
  if (start < 0) return [{text: value, highlighted: false}]
  return [
    {text: value.slice(0, start), highlighted: false},
    {text: normalizedHighlight, highlighted: true},
    {text: value.slice(start + normalizedHighlight.length), highlighted: false},
  ].filter((part) => part.text)
}

function getHeadlineLines(value: string) {
  const explicitLines = value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
  if (explicitLines.length > 1) {
    return [explicitLines[0], explicitLines.slice(1).join('')]
  }

  const wordGroups = value.trim().split(/\s+/).filter(Boolean)
  if (wordGroups.length > 1) {
    return [wordGroups[0], wordGroups.slice(1).join('')]
  }

  const characters = Array.from(value.trim())
  const splitIndex = Math.ceil(characters.length / 2)
  return [
    characters.slice(0, splitIndex).join(''),
    characters.slice(splitIndex).join(''),
  ]
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    campaignText = 'DOU+双节狂欢投',
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
  const campaignRef = useFitText(campaignText, 26, 14)
  const headlineRef = useFitHeadlineLines(headlineText)
  const headlineLines = getHeadlineLines(headlineText)
  const themeStyle = {
    '--retention-popup-background': background,
    '--retention-popup-campaign-color': campaignBackgroundColor,
    '--retention-popup-text-color': headlineTextColor,
    '--retention-popup-highlight-color': headlineHighlightColor,
  } as React.CSSProperties

  return (
    <div className={styles.page} style={themeStyle}>
      <LayeredMainVisual scheme={mainVisualImage} className={styles.mainVisual} />
      <div className={styles.container}>
        <div className={styles.campaignBadge}>
          <div
            ref={campaignRef}
            className={styles.campaignText}
            data-react-edit-prop="campaignText"
          >
            {campaignText}
          </div>
        </div>
        <div
          ref={headlineRef}
          className={styles.headline}
          data-react-edit-prop="headlineText"
        >
          {headlineLines.map((line, lineIndex) => (
            <span className={styles.headlineLine} key={`${line}-${lineIndex}`}>
              {getHeadlineParts(line, headlineHighlightText).map((part, partIndex) => (
                <span
                  className={part.highlighted ? styles.headlineHighlight : undefined}
                  key={`${part.text}-${partIndex}`}
                >
                  {part.text}
                </span>
              ))}
            </span>
          ))}
        </div>
        <div className={styles.button}>
          <BigButton
            buttonText={buttonText}
            buttonGradientStart={buttonGradientStart}
            buttonGradientEnd={buttonGradientEnd}
          />
        </div>
        <img
          src={image6}
          className={styles.hand}
        />
      </div>
    </div>
  )
}
