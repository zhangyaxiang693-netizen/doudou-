/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import backgroundUrl from './assets/DOU+中秋大促-S级 (1) 1.png'
import dateBarUrl from './assets/image_2.svg'
import subtitleBadgeUrl from './assets/image_3.svg'

export type IGeneratedComponent = {
  mainTitle?: string
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

function renderMainTitle(value: string) {
  const prefix = '任务通关赢'
  const index = value.indexOf(prefix)
  if (index < 0) return renderTitleTextWithNumberFont(value)

  const before = value.slice(0, index + prefix.length)
  const after = value.slice(index + prefix.length)
  return (
    <>
      {renderTitleTextWithNumberFont(before)}
      {after ? (
        <span className={styles.titleHighlight}>
          {renderTitleTextWithNumberFont(after)}
        </span>
      ) : null}
    </>
  )
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const mainTitle = props.mainTitle || '任务通关赢X元流量'
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
      <div className={styles.text2} data-react-edit-prop="mainTitle">{renderMainTitle(mainTitle)}</div>
    </div>
  )
}
