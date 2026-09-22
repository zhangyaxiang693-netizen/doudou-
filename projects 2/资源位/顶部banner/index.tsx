/* eslint-disable*/
import React, {useLayoutEffect, useRef} from 'react'
import styles from './index.module.scss'
import subject1 from '../../头图/主体替换/主体替换-方案1.png'
import subject2 from '../../头图/主体替换/主体替换-方案2.png'
import subject3 from '../../头图/主体替换/主体替换-方案3.png'
import subject4 from '../../头图/主体替换/主体替换-方案4.png'

export type IGeneratedComponent = {
  campaignText?: string
  headlineText?: string
  headlineHighlightText?: string
  mainVisualImage?: string
  background?: string
  textColor?: string
  headlineHighlightColor?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
  buttonText?: string
}

const subjectImages: Record<string, string> = {
  'subject-1': subject1,
  'subject-2': subject2,
  'subject-3': subject3,
  'subject-4': subject4,
}

const subjectStyles: Record<string, React.CSSProperties> = {
  'subject-2': {transform: 'translateY(-14px)'},
  'subject-3': {transform: 'translateY(-14px)'},
  'subject-4': {transform: 'translateY(-14px) scale(1.08)'},
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

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    campaignText = 'DOU+双节狂欢投',
    headlineText = '好礼天天抽 赢千元流量',
    headlineHighlightText = '千元流量',
    mainVisualImage = 'subject-1',
    background = 'linear-gradient(90deg, #D39AFF 0%, #F7EBFF 81.44%)',
    textColor = '#240939',
    headlineHighlightColor = '#8D16E8',
    buttonGradientStart = '#FF180E',
    buttonGradientEnd = '#FF166F',
    buttonText = '立即参与',
  } = props
  const campaignRef = useFitText(campaignText, 38, 18)
  const headlineRef = useFitText(headlineText, 58, 28)
  const buttonRef = useFitText(buttonText, 34, 18)
  const headlineParts = getHeadlineParts(headlineText, headlineHighlightText)
  const subjectImage = subjectImages[mainVisualImage] || subject1
  const themeStyle = {
    '--top-banner-background': background,
    '--top-banner-text-color': textColor,
    '--top-banner-highlight-color': headlineHighlightColor,
    '--top-banner-button-start': buttonGradientStart,
    '--top-banner-button-end': buttonGradientEnd,
  } as React.CSSProperties

  return (
    <div className={styles.page}>
      <div className={styles.container} style={themeStyle}>
        <div className={styles.content}>
          <div
            ref={campaignRef}
            className={styles.campaignText}
            data-react-edit-prop="campaignText"
          >
            {campaignText}
          </div>
          <div
            ref={headlineRef}
            className={styles.headline}
            data-react-edit-prop="headlineText"
          >
            {headlineParts.map((part, index) => (
              <span
                className={part.highlighted ? styles.headlineHighlight : undefined}
                key={`${part.text}-${index}`}
              >
                {part.text}
              </span>
            ))}
          </div>
          <div className={styles.actionButton}>
            <div
              ref={buttonRef}
              className={styles.buttonText}
              data-react-edit-prop="buttonText"
            >
              {buttonText}
            </div>
          </div>
        </div>
        <img
          src={subjectImage}
          className={styles.mainVisual}
          style={subjectStyles[mainVisualImage]}
        />
      </div>
    </div>
  )
}
