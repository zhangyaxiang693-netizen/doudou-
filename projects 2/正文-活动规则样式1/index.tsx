/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  contentText?: string
  boldText?: string
}

const defaultContentText =
  '活动期间下单「内容加热」「粉丝经营」目标，且达成累计现金消耗门槛后，点击「立即领」按钮即可获得优惠券，页面消耗数据于次日更新。\n每次达成消耗门槛后还有机会参与下方抽奖。'
const defaultBoldText = '参与下方抽奖'

function renderText(value: string, keyPrefix = 'line') {
  return value.split('\n').map((line, index, lines) => (
    <React.Fragment key={`${keyPrefix}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </React.Fragment>
  ))
}

function parseBoldTexts(value: string) {
  return value
    .split(/[\n,，;；|]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
}

function findNextBoldText(value: string, startIndex: number, boldTexts: string[]) {
  return boldTexts.reduce(
    (result, boldText) => {
      const index = value.indexOf(boldText, startIndex)
      if (index < 0) return result
      if (!result || index < result.index) return {index, boldText}
      return result
    },
    null as {index: number; boldText: string} | null,
  )
}

function renderBoldText(value: string, boldText: string) {
  const boldTexts = parseBoldTexts(boldText)
  if (!boldTexts.length) return renderText(value)

  const nodes: React.ReactNode[] = []
  let cursor = 0
  let nodeIndex = 0

  while (cursor < value.length) {
    const match = findNextBoldText(value, cursor, boldTexts)
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
      <span className={styles.boldText} key={`bold-${nodeIndex}`}>
        {renderText(match.boldText, `bold-${nodeIndex}`)}
      </span>,
    )
    nodeIndex += 1
    cursor = match.index + match.boldText.length
  }

  return nodes
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const contentText = props.contentText || defaultContentText
  const boldText = props.boldText ?? defaultBoldText
  const [firstText, ...restText] = contentText.split('\n')
  const secondText = restText.join('\n')

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.text}>
            {renderBoldText(firstText, boldText)}
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.text1}>
            {renderBoldText(secondText, boldText)}
          </div>
        </div>
      </div>
    </div>
  )
}
