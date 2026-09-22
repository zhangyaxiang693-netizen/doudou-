/* eslint-disable*/
import React, {useLayoutEffect, useRef} from 'react'
import styles from './index.module.scss'
import image6 from './assets/image_6.png'
import BigButton from '../../大按钮'
import detailCoin from '../../主视觉拆分/详情页弹窗/金币.png'
import detailSpark from '../../主视觉拆分/详情页弹窗/火花.png'
import detailRibbon from '../../主视觉拆分/详情页弹窗/Group 2147242116.png'

export type IGeneratedComponent = {
  campaignText?: string
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
    [props.taskText || '完成任务', props.rewardText || '抽流量好礼'].join(' ')
  const campaignRef = useFitText(campaignText, 26, 12, false)
  const headlineRef = useFitHeadlineLines(headlineText)
  const headlineLines = getHeadlineLines(headlineText)
  const themeStyle = {
    '--detail-popup-background': background,
    '--detail-popup-text-color': headlineTextColor,
    '--detail-popup-highlight-color': headlineHighlightColor,
  } as React.CSSProperties

  return (
    <div className={styles.page} style={themeStyle}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content1}>
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
                  {campaignText}
                </div>
                <div className={styles.subSection}></div>
              </div>
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
