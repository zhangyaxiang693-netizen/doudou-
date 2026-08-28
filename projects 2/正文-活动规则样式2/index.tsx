/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import pinkFirstUrl from './assets/粉/Group 2053140583.svg'
import pinkSecondUrl from './assets/粉/Group 2147240304 (1).svg'
import pinkThirdUrl from './assets/粉/Group 2147240462.svg'
import blueFirstUrl from './assets/蓝/Group 2147240435.svg'
import blueSecondUrl from './assets/蓝/Group 2147240436.svg'
import blueThirdUrl from './assets/蓝/Group 2147240461.svg'
import yellowFirstUrl from './assets/黄/Group 2147240437.svg'
import yellowSecondUrl from './assets/黄/Group 2147240438.svg'
import yellowThirdUrl from './assets/黄/Group 2147240460.svg'

export type IGeneratedComponent = {
  titleText?: string
  firstTitleText?: string
  firstBodyText?: string
  secondTitleText?: string
  secondBodyText?: string
  thirdTitleText?: string
  thirdBodyText?: string
  boldText?: string
  iconVariant?: 'current' | 'red' | 'yellow'
}

const defaultText = {
  firstTitle: '如何参与？',
  firstBody:
    '1、报名活动：在2月5日-2月18日活动期间, 点击报名按钮即可参与。\n2、投放达标：报名后,  投放DOU+「点赞评论量 / 视频播放量 / 粉丝量」目标且累计现金消耗达到瓜分门槛。\n累计现金消耗≥68元, 可瓜分15万元流量券\n累计现金消耗≥300元, 可再瓜分10万元流量券\n累计现金消耗≥800元, 可再瓜分8万元流量券',
  secondTitle: '奖励如何瓜分？',
  secondBody:
    '18号活动结束后,  平台将对应档位奖池的总金额,  平均分给所有成功报名且完成该档位消耗任务的用户。\n瓜分公式: 个人可得奖励 = 该档位总奖池➗该档位达标总人数。',
  thirdTitle: '奖励如何发放？',
  thirdBody:
    '奖励将在活动结束后 (2.18起) 的7个工作日内,  以 "DOU+流量优惠券" 形式自动发放至您的DOU+账户,  请注意查收并使用。',
  boldText:
    '报名后,  投放DOU+「点赞评论量 / 视频播放量 / 粉丝量」目标\nDOU+流量优惠券',
}

const variantIcons = {
  current: {
    first: pinkFirstUrl,
    second: pinkSecondUrl,
    third: pinkThirdUrl,
  },
  red: {
    first: blueSecondUrl,
    second: blueFirstUrl,
    third: blueThirdUrl,
  },
  yellow: {
    first: yellowSecondUrl,
    second: yellowFirstUrl,
    third: yellowThirdUrl,
  },
}

function getVariantIcons(iconVariant?: IGeneratedComponent['iconVariant']) {
  if (iconVariant === 'red') return variantIcons.red
  if (iconVariant === 'yellow') return variantIcons.yellow
  return variantIcons.current
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

function renderBoldInlineText(value: string, boldTexts: string[], keyPrefix: string) {
  if (!boldTexts.length) return value

  const nodes: React.ReactNode[] = []
  let cursor = 0
  let nodeIndex = 0

  while (cursor < value.length) {
    const match = findNextBoldText(value, cursor, boldTexts)
    if (!match) {
      nodes.push(value.slice(cursor))
      break
    }

    if (match.index > cursor) {
      nodes.push(value.slice(cursor, match.index))
    }

    nodes.push(
      <span className={styles.boldText} key={`${keyPrefix}-bold-${nodeIndex}`}>
        {match.boldText}
      </span>,
    )
    nodeIndex += 1
    cursor = match.index + match.boldText.length
  }

  return nodes
}

function renderMultilineText(value: string, boldText: string, linebreakClass?: string) {
  const boldTexts = parseBoldTexts(boldText)
  const lines = value.split('\n')
  return lines.map((line, index) => (
    <div
      key={`${line}-${index}`}
      className={index < lines.length - 1 ? linebreakClass : undefined}
    >
      {renderBoldInlineText(line, boldTexts, `line-${index}`)}
    </div>
  ))
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const firstTitleText = props.firstTitleText || props.titleText || defaultText.firstTitle
  const firstBodyText = props.firstBodyText || defaultText.firstBody
  const secondTitleText = props.secondTitleText || defaultText.secondTitle
  const secondBodyText = props.secondBodyText || defaultText.secondBody
  const thirdTitleText = props.thirdTitleText || defaultText.thirdTitle
  const thirdBodyText = props.thirdBodyText || defaultText.thirdBody
  const boldText = props.boldText ?? defaultText.boldText
  const icons = getVariantIcons(props.iconVariant)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <img src={icons.first} className={styles.image} />
          </div>
          <div className={styles.text}>{firstTitleText}</div>
        </div>
        <div className={styles.text1}>
          {renderMultilineText(firstBodyText, boldText, styles.text1__linebreak)}
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container1}>
          <div className={styles.content1}>
            <img src={icons.second} className={styles.image2} />
          </div>
          <div className={styles.text2}>{secondTitleText}</div>
        </div>
        <div className={styles.text3}>
          <div className={styles.text3__listwrap}>
            {renderMultilineText(secondBodyText, boldText, styles.text3__linebreak)}
          </div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container2}>
          <div className={styles.content2}>
            <img src={icons.third} className={styles.image4} />
          </div>
          <div className={styles.text4}>{thirdTitleText}</div>
        </div>
        <div className={styles.text5}>
          {renderMultilineText(thirdBodyText, boldText)}
        </div>
      </div>
    </div>
  )
}
