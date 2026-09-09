/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import iconPinkUrl from '../icon库/粉色系/Property 1=券.svg'
import iconBlueUrl from '../icon库/蓝色系/Property 1=券-1.svg'
import iconOrangeUrl from '../icon库/橘色系/Property 1=券-2.svg'
import alarmPinkUrl from '../icon库/粉色系/Property 1=限时.svg'
import alarmBlueUrl from '../icon库/蓝色系/Property 1=限时-1.svg'
import alarmOrangeUrl from '../icon库/橘色系/Property 1=限时-2.svg'
import calendarPinkUrl from '../icon库/粉色系/Property 1=日历.svg'
import calendarBlueUrl from '../icon库/蓝色系/Property 1=日历-1.svg'
import calendarOrangeUrl from '../icon库/橘色系/Property 1=日历-2.svg'
import giftPinkUrl from '../icon库/粉色系/Property 1=礼盒.svg'
import giftBlueUrl from '../icon库/蓝色系/Property 1=礼盒-1.svg'
import giftOrangeUrl from '../icon库/橘色系/Property 1=礼盒-2.svg'
import folderPinkUrl from '../icon库/粉色系/Property 1=案例.svg'
import folderBlueUrl from '../icon库/蓝色系/Property 1=案例-1.svg'
import folderOrangeUrl from '../icon库/橘色系/Property 1=案例-2.svg'
import firePinkUrl from '../icon库/粉色系/Property 1=火.svg'
import fireBlueUrl from '../icon库/蓝色系/Property 1=火-1.svg'
import fireOrangeUrl from '../icon库/橘色系/Property 1=火-2.svg'
import tipPinkUrl from '../icon库/粉色系/Property 1=提示.svg'
import tipBlueUrl from '../icon库/蓝色系/Property 1=提示-1.svg'
import tipOrangeUrl from '../icon库/橘色系/Property 1=提示-2.svg'

export type IGeneratedComponent = {
  titleText?: string
  iconVariant?: 'current' | 'red' | 'yellow'
  iconType?: 'coupon' | 'alarm' | 'calendar' | 'gift' | 'folder' | 'fire' | 'tip'
  useUnifiedTypography?: boolean
}

function renderTitleText(value: string) {
  return value.split(/([0-9０-９]+|[A-Za-z+]+)/g).map((segment, index) => {
    if (!segment) return null
    if (/^[0-9０-９]+$/.test(segment)) {
      return (
        <span key={`${segment}-${index}`} className={styles.douyinNumber}>
          {segment}
        </span>
      )
    }
    if (/^[A-Za-z+]+$/.test(segment)) {
      return (
        <span key={`${segment}-${index}`} className={styles.douyinSans}>
          {segment}
        </span>
      )
    }
    return segment
  })
}

function getVariantIcon(
  iconVariant?: IGeneratedComponent['iconVariant'],
  iconType?: IGeneratedComponent['iconType'],
) {
  let set: { current: string; red: string; yellow: string }
  if (iconType === 'alarm') {
    set = { current: alarmPinkUrl, red: alarmBlueUrl, yellow: alarmOrangeUrl }
  } else if (iconType === 'calendar') {
    set = { current: calendarPinkUrl, red: calendarBlueUrl, yellow: calendarOrangeUrl }
  } else if (iconType === 'gift') {
    set = { current: giftPinkUrl, red: giftBlueUrl, yellow: giftOrangeUrl }
  } else if (iconType === 'folder') {
    set = { current: folderPinkUrl, red: folderBlueUrl, yellow: folderOrangeUrl }
  } else if (iconType === 'fire') {
    set = { current: firePinkUrl, red: fireBlueUrl, yellow: fireOrangeUrl }
  } else if (iconType === 'tip') {
    set = { current: tipPinkUrl, red: tipBlueUrl, yellow: tipOrangeUrl }
  } else {
    set = { current: iconPinkUrl, red: iconBlueUrl, yellow: iconOrangeUrl }
  }
  if (iconVariant === 'red') return set.red
  if (iconVariant === 'yellow') return set.yellow
  return set.current
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const titleText = props.titleText || '端午消耗返冲刺赢大额券'
  const variantIcon = getVariantIcon(props.iconVariant, props.iconType)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}>
              <div className={styles.section}>
                <img
                  src={variantIcon}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
          <div className={styles.content1}>
            <div className={styles.text}>
              <div className={styles.text__listwrap}>
                {props.useUnifiedTypography ? titleText : renderTitleText(titleText)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
