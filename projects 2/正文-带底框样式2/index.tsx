/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'

export type IGeneratedComponent = {
  firstTitleText?: string
  firstBodyText?: string
  firstHighlightText?: string
  secondTitleText?: string
  secondBodyText?: string
  secondHighlightText?: string
}

const defaultText = {
  firstTitle: '#如何参与',
  firstBody:
    '作品投放指定话题#DOU+春日上热门，并且投放DOU+「点赞评论量、视频播放量、粉丝量」目标，且现金消耗大于30元的用户，可参与抽奖。',
  firstHighlight: '#DOU+春日上热门\nDOU+「点赞评论量、视频播放量、粉丝量」目标',
  secondTitle: '#如何发奖',
  secondBody:
    '活动结束后，官方将完成上述条件的用户，统一完成随机抽奖，获奖名单将于活动结束后2日在活动规则页面展示。中奖用户将在5个工作日内收到DOU+官方账号加热的流量。',
  secondHighlight: '用户将在5个工作日内',
}

function renderText(value: string, keyPrefix = 'line') {
  return value.split('\n').map((line, index, lines) => (
    <React.Fragment key={`${keyPrefix}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </React.Fragment>
  ))
}

function parseHighlights(value: string) {
  return value
    .split(/[\n,，;；|]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
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

function renderHighlightedText(value: string, highlightText: string, highlightClassName: string) {
  const highlights = parseHighlights(highlightText)
  if (!highlights.length) return renderText(value)

  const nodes: React.ReactNode[] = []
  let cursor = 0
  let nodeIndex = 0

  while (cursor < value.length) {
    const match = findNextHighlight(value, cursor, highlights)
    if (!match) {
      nodes.push(...renderText(value.slice(cursor), `plain-${nodeIndex}`))
      break
    }

    if (match.index > cursor) {
      nodes.push(
        <React.Fragment key={`plain-${nodeIndex}`}>
          {renderText(value.slice(cursor, match.index), `plain-${nodeIndex}`)}
        </React.Fragment>,
      )
      nodeIndex += 1
    }

    nodes.push(
      <span className={highlightClassName} key={`highlight-${nodeIndex}`}>
        {renderText(match.highlight, `highlight-${nodeIndex}`)}
      </span>,
    )
    nodeIndex += 1
    cursor = match.index + match.highlight.length
  }

  return nodes
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const firstTitleText = props.firstTitleText || defaultText.firstTitle
  const firstBodyText = props.firstBodyText || defaultText.firstBody
  const firstHighlightText = props.firstHighlightText ?? defaultText.firstHighlight
  const secondTitleText = props.secondTitleText || defaultText.secondTitle
  const secondBodyText = props.secondBodyText || defaultText.secondBody
  const secondHighlightText = props.secondHighlightText ?? defaultText.secondHighlight

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.text}>{firstTitleText}</div>
        <div className={styles.text1}>
          {renderHighlightedText(firstBodyText, firstHighlightText, styles.text1Highlight)}
        </div>
      </div>
      <img src={image1Url} className={styles.image} />
      <div className={styles.wrap1}>
        <div className={styles.text2}>{secondTitleText}</div>
        <div className={styles.text3}>
          {renderHighlightedText(secondBodyText, secondHighlightText, styles.text3Highlight)}
        </div>
      </div>
    </div>
  )
}
