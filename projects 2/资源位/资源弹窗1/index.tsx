/* eslint-disable*/
import React, {useLayoutEffect, useRef} from 'react'
import styles from './index.module.scss'
import image6 from './assets/image_6.png'
import detailCoin from '../../主视觉拆分/详情页弹窗/金币.png'
import detailSpark from '../../主视觉拆分/详情页弹窗/火花.png'
import detailRibbon from '../../主视觉拆分/详情页弹窗/Group 2147242116.png'

export type IGeneratedComponent = {
  campaignText?: string
  showCampaignTag?: boolean
  headlineText?: string
  headlineHighlightText?: string
  background?: string
  headlineTextColor?: string
  headlineHighlightColor?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
  buttonText?: string
  taskText?: string
  rewardText?: string
}

function useFitText(
  value: string,
  maxFontSize: number,
  minFontSize: number,
  fitHeight = true,
) {
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
          (fitHeight && element.scrollHeight > element.clientHeight + 1))
      ) {
        size -= 1
        element.style.fontSize = `${size}px`
      }
    }

    fit()
    document.fonts?.ready.then(fit)
  }, [value, maxFontSize, minFontSize, fitHeight])

  return ref
}

function useFitHeadlineLines(value: string) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const fit = () => {
      const lines = Array.from(element.children) as HTMLElement[]
      lines.forEach((line) => {
        let size = 66
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
    headlineHighlightText = '流量好礼',
    background = 'linear-gradient(165deg, #FF88C1 0%, #FFC1D5 20%, #FFF1F4 100%)',
    headlineTextColor = '#2C0113',
    headlineHighlightColor = '#F00073',
    buttonGradientStart = '#FF1473',
    buttonGradientEnd = '#FF229F',
    buttonText = '立即参与',
  } = props
  const headlineText =
    props.headlineText ??
    [props.taskText || '完成任务', props.rewardText || '抽流量好礼'].join('\n')
  const campaignRef = useFitText(campaignText, 30, 12, false)
  const headlineRef = useFitHeadlineLines(headlineText)
  const buttonTextRef = useFitText(buttonText, 40, 20, false)
  const headlineLines = getHeadlineLines(headlineText)
  const headlineLineParts = getHeadlineLineParts(headlineLines, headlineHighlightText)
  const themeStyle = {
    '--detail-popup-background': background,
    '--detail-popup-text-color': headlineTextColor,
    '--detail-popup-highlight-color': headlineHighlightColor,
    '--detail-popup-button-background': `linear-gradient(90deg, ${buttonGradientStart} 0%, ${buttonGradientEnd} 100%)`,
  } as React.CSSProperties

  return (
    <div className={styles.page} style={themeStyle}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={[styles.content1, !showCampaignTag && styles.content1Hidden].filter(Boolean).join(' ')}>
            <div className={styles.main}>
              <div></div>
            </div>
            <div className={styles.main1}>
              <div className={styles.section1}>
                <div className={styles.image4}></div>
                <div
                  ref={campaignRef}
                  className={styles.image5}
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
                <div className={styles.subSection}></div>
              </div>
            </div>
          </div>
          <div
            ref={headlineRef}
            className={[
              styles.headline,
              headlineLines.length === 1 && styles.headlineSingleLine,
              !showCampaignTag && styles.headlineWithoutCampaignTag,
            ].filter(Boolean).join(' ')}
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
      <div className={styles.mainVisual}>
        <div className={styles.mainVisualCanvas}>
          <img src={detailRibbon} className={styles.detailRibbon} draggable={false} />
          <img src={detailCoin} className={styles.detailCoin} draggable={false} />
          <img src={detailSpark} className={styles.detailSpark} draggable={false} />
        </div>
      </div>
    </div>
  )
}
