/* eslint-disable*/
import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  firstQuantityText?: string
  firstAmountText?: string
  firstConditionText?: string
  firstButtonText?: string
  secondQuantityText?: string
  secondAmountText?: string
  secondConditionText?: string
  secondButtonText?: string
  thirdQuantityText?: string
  thirdAmountText?: string
  thirdConditionText?: string
  thirdButtonText?: string
  titleBackgroundColor?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const style = {
    '--coupon-style4-title-background': props.titleBackgroundColor || '#FF62A0',
    '--coupon-style4-button-gradient-start': props.buttonGradientStart || '#FF1473',
    '--coupon-style4-button-gradient-end': props.buttonGradientEnd || '#FF229F',
  } as React.CSSProperties

  return (
    <div className={styles.page} style={style}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.text}>{props.firstQuantityText || '限量10个'}</div>
          </div>
          <div className={styles.main}>
            <div className={styles.text1}>
              <div className={styles.text1__listwrap}>DOU+福利券</div>
            </div>
          </div>
          <div className={styles.main1}>
            <div className={styles.section}>
              <div className={styles.text2}>{props.firstAmountText || '880'}</div>
              <div className={styles.text3}>
                <div className={styles.text3__listwrap}>元</div>
              </div>
            </div>
            <div className={styles.section1}>
              <div className={styles.text4}>
                <div className={styles.text4__listwrap}>{props.firstConditionText || '满100元可用'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.text5}>{props.firstButtonText || '预约抢'}</div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container2}>
          <div className={styles.content2}>
            <div className={styles.text6}>{props.secondQuantityText || '限量30个'}</div>
          </div>
          <div className={styles.main2}>
            <div className={styles.text7}>
              <div className={styles.text7__listwrap}>DOU+福利券</div>
            </div>
          </div>
          <div className={styles.main3}>
            <div className={styles.section2}>
              <div className={styles.text8}>{props.secondAmountText || '88'}</div>
              <div className={styles.text9}>
                <div className={styles.text9__listwrap}>元</div>
              </div>
            </div>
            <div className={styles.section3}>
              <div className={styles.text10}>
                <div className={styles.text10__listwrap}>{props.secondConditionText || '满100元可用'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.text11}>{props.secondButtonText || '预约抢'}</div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container4}>
          <div className={styles.content4}>
            <div className={styles.text12}>{props.thirdQuantityText || '限量50个'}</div>
          </div>
          <div className={styles.main4}>
            <div className={styles.text13}>
              <div className={styles.text13__listwrap}>DOU+福利券</div>
            </div>
          </div>
          <div className={styles.main5}>
            <div className={styles.section4}>
              <div className={styles.text14}>{props.thirdAmountText || '8'}</div>
              <div className={styles.text15}>
                <div className={styles.text15__listwrap}>元</div>
              </div>
            </div>
            <div className={styles.section5}>
              <div className={styles.text16}>
                <div className={styles.text16__listwrap}>{props.thirdConditionText || '满100元可用'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container5}>
          <div className={styles.text17}>{props.thirdButtonText || '预约抢'}</div>
        </div>
      </div>
    </div>
  )
}
