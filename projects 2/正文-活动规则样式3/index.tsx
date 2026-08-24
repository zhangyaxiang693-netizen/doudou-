/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'
import image2Url from './assets/image_2.svg'
import image3Url from './assets/image_3.svg'

export type IGeneratedComponent = {
  titleText?: string
  firstTitleText?: string
  firstBodyText?: string
  secondTitleText?: string
  secondBodyText?: string
  thirdTitleText?: string
  thirdBodyText?: string
  highlightText?: string
  paragraphCount?: string | number
  iconVariant?: 'current' | 'red' | 'yellow'
}

const defaultText = {
  firstTitle: '活动说明:',
  firstBody: '现金消耗满30元开启第一次抽奖，且累计满90/150/200元，可解锁更多抽奖机会，每日最多可抽10次',
  highlight: '90/150/200',
  secondTitle: '',
  secondBody: '活动期间下单「内容加热」「粉丝经营」目标，且达成累计现金消耗门槛后，还可获得流量券，自动下发至DOU+账户。页面消耗数据于次日更新',
  thirdTitle: '',
  thirdBody: '现金消耗全程累计，投得越多，好礼越多',
}

const variantIconUrls = {
  red: 'data:image/svg+xml;utf8,<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="6.5" cy="6.5" rx="6.5" ry="6.5" fill="%23FF1F54"/></svg>',
  yellow: 'data:image/svg+xml;utf8,<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="6.5" cy="6.5" rx="6.5" ry="6.5" fill="%23FE199D"/></svg>',
}

function getVariantIcon(iconVariant?: IGeneratedComponent['iconVariant']) {
  if (iconVariant === 'red') return variantIconUrls.red
  if (iconVariant === 'yellow') return variantIconUrls.yellow
  return ''
}

function parseTextList(value: string) {
  return value
    .split(/[\n,，;；|]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseParagraphCount(value: string | number | undefined) {
  const count = Number(value || 3)
  if (count <= 1) return 1
  if (count >= 3) return 3
  return 2
}

function findNextHighlight(value: string, startIndex: number, highlights: string[]) {
  return highlights.reduce(
    (result, highlight) => {
      const index = value.indexOf(highlight, startIndex)
      if (index < 0) return result
      if (!result || index < result.index) return {index, highlight}
      return result
    },
    null as {index: number; highlight: string} | null,
  )
}

function renderHighlightedLine(value: string, highlights: string[], keyPrefix: string) {
  if (!highlights.length) return value

  const nodes: React.ReactNode[] = []
  let cursor = 0
  let nodeIndex = 0

  while (cursor < value.length) {
    const match = findNextHighlight(value, cursor, highlights)
    if (!match) {
      nodes.push(value.slice(cursor))
      break
    }

    if (match.index > cursor) {
      nodes.push(value.slice(cursor, match.index))
    }

    nodes.push(
      <span className={styles.highlightText} key={`${keyPrefix}-highlight-${nodeIndex}`}>
        {match.highlight}
      </span>,
    )
    nodeIndex += 1
    cursor = match.index + match.highlight.length
  }

  return nodes
}

function renderHighlightedText(value: string, highlightText: string) {
  const highlights = parseTextList(highlightText).sort((a, b) => b.length - a.length)
  return value.split('\n').map((line, index) => (
    <div key={`${line}-${index}`}>
      {renderHighlightedLine(line, highlights, `line-${index}`)}
    </div>
  ))
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const firstTitleText = props.titleText || props.firstTitleText || defaultText.firstTitle
  const firstBodyText = props.firstBodyText || defaultText.firstBody
  const secondTitleText = props.secondTitleText || defaultText.secondTitle
  const secondBodyText = props.secondBodyText || defaultText.secondBody
  const thirdTitleText = props.thirdTitleText || defaultText.thirdTitle
  const thirdBodyText = props.thirdBodyText || defaultText.thirdBody
  const highlightText = props.highlightText ?? defaultText.highlight
  const paragraphCount = parseParagraphCount(props.paragraphCount)
  const variantIcon = getVariantIcon(props.iconVariant)

  return (
    <div className={styles.page}>
      <div className={styles.text}>{firstTitleText}</div>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <img src={variantIcon || image1Url} className={styles.image} />
          <div className={styles.text1}>
            {renderHighlightedText(firstBodyText, highlightText)}
          </div>
        </div>
        {paragraphCount >= 2 ? (
          <>
            {secondTitleText ? <div className={styles.text}>{secondTitleText}</div> : null}
            <div className={styles.container2}>
              <img
                src={variantIcon || image2Url}
                className={styles.image2}
              />
              <div className={styles.text3}>
                {renderHighlightedText(secondBodyText, highlightText)}
              </div>
            </div>
          </>
        ) : null}
        {paragraphCount >= 3 ? (
          <>
            {thirdTitleText ? <div className={styles.text}>{thirdTitleText}</div> : null}
            <div className={styles.container1}>
              <img
                src={variantIcon || image3Url}
                className={styles.image1}
              />
              <div className={styles.text2}>
                {renderHighlightedText(thirdBodyText, highlightText)}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
