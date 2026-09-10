/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import backgroundUrl from './assets/DOU+中秋大促-S级 (1) 1.png'
import dateBarUrl from './assets/image_2.svg'
import subtitleBadgeUrl from './assets/image_3.svg'

export type IGeneratedComponent = {
  mainTitle?: string
  highlightText?: string
  subtitle?: string
  dateText?: string
}


function renderTitleTextWithNumberFont(value: string) {
  const segments = value.split(/([0-9０-９]+)/g)
  return segments.map((segment, index) => {
    if (!segment) return null
    if (/^[0-9０-９]+$/.test(segment)) {
      return (
        <span key={`${segment}-${index}`} className={styles.douyinNumber}>
          {segment}
        </span>
      )
    }
    return segment
  })
}

function renderMainTitle(value: string, highlightText: string) {
  const highlight = highlightText.trim()
  if (!highlight || !value.includes(highlight)) {
    return renderTitleTextWithNumberFont(value)
  }

  const segments = value.split(highlight)
  return segments.map((segment, index) => (
    <React.Fragment key={`${segment}-${index}`}>
      {renderTitleTextWithNumberFont(segment)}
      {index < segments.length - 1 ? (
        <span className={styles.titleHighlight}>
          {renderTitleTextWithNumberFont(highlight)}
        </span>
      ) : null}
    </React.Fragment>
  ))
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const mainTitle = props.mainTitle || '任务通关赢X元流量'
  const highlightText = props.highlightText === undefined ? 'X元流量' : props.highlightText
  const subtitle = props.subtitle || '为爱加投'
  const dateText = props.dateText || '6月10日-6月21日'

  return (
    <div className={styles.page}>
      <img src={backgroundUrl} className={styles.image} />
      <div className={styles.wrap}>
        <img src={dateBarUrl} className={styles.image1} />
        <img src={subtitleBadgeUrl} className={styles.image2} />
        <div className={styles.text} data-react-edit-prop="dateText">{dateText}</div>
        <div className={styles.text1} data-react-edit-prop="subtitle">{subtitle}</div>
      </div>
      <div className={styles.text2} data-react-edit-prop="mainTitle">{renderMainTitle(mainTitle, highlightText)}</div>
    </div>
  )
}
