import React from 'react'
import { createCssVars } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface LotteryGridProps {
  prize1?: string
  prize2?: string
  prize3?: string
  prize4?: string
  prize5?: string
  prize6?: string
  prize7?: string
  prize8?: string
  prizeImage1?: string
  prizeImage2?: string
  prizeImage3?: string
  prizeImage4?: string
  prizeImage5?: string
  prizeImage6?: string
  prizeImage7?: string
  prizeImage8?: string
  buttonText?: string
  buttonBgColor?: string
  buttonBorderRadius?: number
  prizeFontFamily?: string
  prizeFontSize?: string
  prizeColor?: string
  prizeLetterSpacing?: string
  buttonFontFamily?: string
  buttonFontSize?: string
  buttonColor?: string
  buttonSkewX?: number
  className?: string
}

export default function LotteryGrid({
  prize1 = '666元流量扶持',
  prize2 = '满68赠6流量券',
  prize3 = '满100赠10流量券',
  prize4 = 'DOU仔冰箱贴',
  prize5 = 'DOU仔帆布包',
  prize6 = '满30赠5代投券',
  prize7 = 'DOU仔挂件',
  prize8 = 'DOU仔玩偶',
  prizeImage1 = '',
  prizeImage2 = '',
  prizeImage3 = '',
  prizeImage4 = '',
  prizeImage5 = '',
  prizeImage6 = '',
  prizeImage7 = '',
  prizeImage8 = '',
  buttonText = '抽',
  buttonBgColor = 'rgba(255, 19, 114, 1)',
  buttonBorderRadius = 40,
  prizeFontFamily = 'Source Han Sans CN',
  prizeFontSize = '22px',
  prizeColor = 'rgba(45, 45, 45, 1)',
  prizeLetterSpacing = '0px',
  buttonFontFamily = 'MFYuanHeiNoncommercial-Regular',
  buttonFontSize = '102.95px',
  buttonColor = 'rgba(255, 255, 255, 1)',
  buttonSkewX = -4,
  className,
}: LotteryGridProps) {
  const cssVars = createCssVars({
    lotteryGridPrizeFontFamily: prizeFontFamily,
    lotteryGridPrizeFontSize: prizeFontSize,
    lotteryGridPrizeColor: prizeColor,
    lotteryGridPrizeLetterSpacing: prizeLetterSpacing,
    lotteryGridButtonFontFamily: buttonFontFamily,
    lotteryGridButtonFontSize: buttonFontSize,
    lotteryGridButtonColor: buttonColor,
    lotteryGridButtonSkewX: `${buttonSkewX}deg`,
    lotteryGridButtonBgColor: buttonBgColor,
    lotteryGridButtonBorderRadius: `${buttonBorderRadius}px`,
  })

  const prizeImages = [
    prizeImage1,
    prizeImage2,
    prizeImage3,
    prizeImage4,
    prizeImage5,
    prizeImage6,
    prizeImage7,
    prizeImage8,
  ]

  const renderPrizeImage = (img: string, index: number) => {
    if (img) {
      return (
        <div
          className={styles.prizeImageWrap}
          style={{ backgroundImage: `url(${img})` }}
        />
      )
    }
    return <div className={styles.placeholder} />
  }
  return (
    <div 
      className={`${styles.page} ${className || ''}`}
      style={cssVars}
    >
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}></div>
          <div className={styles.content1}>
            <div className={styles.text}>
              <span className={styles.text__seg0}>{prize1}</span>
            </div>
          </div>
          <div className={styles.content2}>
            {renderPrizeImage(prizeImage1, 0)}
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.content3}></div>
          <div className={styles.content4}>
            <div className={styles.text1}>
              <span className={styles.text1__seg0}>{prize2}</span>
            </div>
          </div>
          <div className={styles.content5}>
            {renderPrizeImage(prizeImage2, 1)}
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.content6}></div>
          <div className={styles.content7}>
            <div className={styles.text2}>
              <span className={styles.text2__seg0}>{prize3}</span>
            </div>
          </div>
          <div className={styles.content8}>
            {renderPrizeImage(prizeImage3, 2)}
          </div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container3}>
          <div className={styles.content9}></div>
          <div className={styles.content10}>
            <div className={styles.text3}>
              <span className={styles.text3__seg0}>{prize4}</span>
            </div>
          </div>
          <div className={styles.content11}>
            {renderPrizeImage(prizeImage4, 3)}
          </div>
        </div>
        <div className={styles.container4}>
          <div className={styles.text4}>
            <span className={styles.text4__seg0}>{buttonText}</span>
          </div>
        </div>
        <div className={styles.container5}>
          <div className={styles.content12}></div>
          <div className={styles.content13}>
            <div className={styles.text5}>
              <span className={styles.text5__seg0}>{prize5}</span>
            </div>
          </div>
          <div className={styles.content14}>
            {renderPrizeImage(prizeImage5, 4)}
          </div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container6}>
          <div className={styles.content15}></div>
          <div className={styles.content16}>
            <div className={styles.text6}>
              <span className={styles.text6__seg0}>{prize6}</span>
            </div>
          </div>
          <div className={styles.content17}>
            {renderPrizeImage(prizeImage6, 5)}
          </div>
        </div>
        <div className={styles.container7}>
          <div className={styles.content18}></div>
          <div className={styles.content19}>
            <div className={styles.text7}>
              <span className={styles.text7__seg0}>{prize7}</span>
            </div>
          </div>
          <div className={styles.content20}>
            {renderPrizeImage(prizeImage7, 6)}
          </div>
        </div>
        <div className={styles.container8}>
          <div className={styles.content21}></div>
          <div className={styles.content22}>
            {renderPrizeImage(prizeImage8, 7)}
          </div>
          <div className={styles.content23}>
            <div className={styles.text8}>
              <span className={styles.text8__seg0}>{prize8}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
