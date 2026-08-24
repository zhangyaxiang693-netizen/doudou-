/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Raw from './assets/image_1.svg?raw'
import image2Raw from './assets/image_2.svg?raw'
import image3Raw from './assets/image_3.svg?raw'
import image4Raw from './assets/image_4.svg?raw'
import image5Raw from './assets/image_5.svg?raw'
import image6Url from './assets/image_6.svg'
import image7Raw from './assets/image_7.svg?raw'
import image8Raw from './assets/image_8.svg?raw'
import image9Raw from './assets/image_9.svg?raw'
import image10Raw from './assets/image_10.svg?raw'
import image11Url from './assets/image_11.svg'
import image12Raw from './assets/image_12.svg?raw'
import image13Raw from './assets/image_13.svg?raw'
import image14Raw from './assets/image_14.svg?raw'
import image15Raw from './assets/image_15.svg?raw'
import image16Url from './assets/image_16.svg'
import image17Raw from './assets/image_17.svg?raw'
import image18Url from './assets/image_18.svg'
import image19Url from './assets/image_19.svg'
import image20Url from './assets/image_20.svg'
import image21Url from './assets/image_21.svg'

export type IGeneratedComponent = {
  amountText1?: string
  amountText2?: string
  amountText3?: string
  consumeAmountText1?: string
  consumeAmountText2?: string
  consumeAmountText3?: string
  consumeAmountText4?: string
  frameUnionGradientStart?: string
  frameUnionGradientEnd?: string
  iconGradientStart?: string
  iconGradientEnd?: string
  redPacketUnionGradientStart?: string
  redPacketUnionGradientEnd?: string
  redPacketEllipseColor?: string
  backgroundPanelColor?: string
  couponLabelColor?: string
  amountTextColor?: string
  hideProgressGraphic?: boolean
}

const originalColors = {
  frameUnionGradientStart: '#FF237B',
  frameUnionGradientEnd: '#FF5EAE',
  iconGradientStart: '#FF1478',
  iconGradientEnd: '#FF5DAA',
  redPacketEllipseColor: '#FFC4E5',
  backgroundPanelColor: '#FFC5E5',
  couponLabelColor: 'rgba(255, 98, 160, 1)',
  amountTextColor: 'rgba(255, 19, 114, 1)',
}

function sameColor(a?: string, b?: string) {
  return String(a || '').toLowerCase() === String(b || '').toLowerCase()
}

function normalizeAmount(value: string | undefined, fallback: string) {
  return String(value || fallback)
    .replace(/\s*元\s*$/, '')
    .replace(/^消耗\s*/, '')
    .trim()
}

function themedFrameSvg(svg: string, frameUnionGradientStart?: string, frameUnionGradientEnd?: string) {
  return svg
    .replaceAll(originalColors.frameUnionGradientStart, frameUnionGradientStart || originalColors.frameUnionGradientStart)
    .replaceAll(originalColors.frameUnionGradientEnd, frameUnionGradientEnd || originalColors.frameUnionGradientEnd)
}

function themedIconSvg(props: IGeneratedComponent) {
  return image2Raw
    .replaceAll(originalColors.frameUnionGradientStart, props.frameUnionGradientStart || originalColors.frameUnionGradientStart)
    .replaceAll(originalColors.frameUnionGradientEnd, props.frameUnionGradientEnd || originalColors.frameUnionGradientEnd)
    .replaceAll(originalColors.iconGradientStart, props.iconGradientStart || originalColors.iconGradientStart)
    .replaceAll(originalColors.iconGradientEnd, props.iconGradientEnd || originalColors.iconGradientEnd)
}

function themedBackgroundSvg(svg: string, backgroundPanelColor?: string) {
  return svg.replaceAll(originalColors.backgroundPanelColor, backgroundPanelColor || originalColors.backgroundPanelColor)
}

function themedSemicircleSvg(svg: string, redPacketEllipseColor?: string) {
  return svg.replaceAll(originalColors.redPacketEllipseColor, redPacketEllipseColor || originalColors.redPacketEllipseColor)
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const amountText1 = normalizeAmount(props.amountText1, '110')
  const amountText2 = normalizeAmount(props.amountText2, '110')
  const amountText3 = normalizeAmount(props.amountText3, '110')
  const consumeAmountText1 = normalizeAmount(props.consumeAmountText1, '30')
  const consumeAmountText2 = normalizeAmount(props.consumeAmountText2, '30')
  const consumeAmountText3 = normalizeAmount(props.consumeAmountText3, '30')
  const consumeAmountText4 = normalizeAmount(props.consumeAmountText4, '30')
  const amountTextStyle =
    props.amountTextColor && !sameColor(props.amountTextColor, originalColors.amountTextColor)
      ? { color: props.amountTextColor }
      : undefined
  const couponLabelStyle =
    props.couponLabelColor && !sameColor(props.couponLabelColor, originalColors.couponLabelColor)
      ? { color: props.couponLabelColor }
      : undefined
  const lotteryFrameSvg = themedFrameSvg(image1Raw, props.frameUnionGradientStart, props.frameUnionGradientEnd)
  const lotteryIconSvg = themedIconSvg(props)
  const backgroundSvg1 = themedBackgroundSvg(image3Raw, props.backgroundPanelColor)
  const backgroundSvg2 = themedBackgroundSvg(image8Raw, props.backgroundPanelColor)
  const backgroundSvg3 = themedBackgroundSvg(image13Raw, props.backgroundPanelColor)
  const redPacketUnionSvg1 = themedFrameSvg(image4Raw, props.redPacketUnionGradientStart, props.redPacketUnionGradientEnd)
  const redPacketUnionSvg2 = themedFrameSvg(image9Raw, props.redPacketUnionGradientStart, props.redPacketUnionGradientEnd)
  const redPacketUnionSvg3 = themedFrameSvg(image14Raw, props.redPacketUnionGradientStart, props.redPacketUnionGradientEnd)
  const leftSemicircleSvg1 = themedSemicircleSvg(image5Raw, props.redPacketEllipseColor)
  const rightSemicircleSvg1 = themedSemicircleSvg(image7Raw, props.redPacketEllipseColor)
  const leftSemicircleSvg2 = themedSemicircleSvg(image10Raw, props.redPacketEllipseColor)
  const rightSemicircleSvg2 = themedSemicircleSvg(image12Raw, props.redPacketEllipseColor)
  const leftSemicircleSvg3 = themedSemicircleSvg(image15Raw, props.redPacketEllipseColor)
  const rightSemicircleSvg3 = themedSemicircleSvg(image17Raw, props.redPacketEllipseColor)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}>
              <div className={styles.image} dangerouslySetInnerHTML={{__html: lotteryFrameSvg}} />
              <div className={styles.image1} dangerouslySetInnerHTML={{__html: lotteryIconSvg}} />
              <div className={styles.section}>
                <div className={styles.text}>抽奖</div>
              </div>
            </div>
            <div className={styles.main1}>
              <div className={styles.section1}>
                <div className={styles.image2} dangerouslySetInnerHTML={{__html: backgroundSvg1}} />
                <div className={styles.subSection}>
                  <div className={styles.block}>
                    <div className={styles.subBlock}></div>
                  </div>
                </div>
                <div className={styles.image3} dangerouslySetInnerHTML={{__html: redPacketUnionSvg1}} />
              </div>
              <div className={styles.section2}>
                <div className={styles.subSection1}>
                  <div className={styles.text1} style={amountTextStyle}>{amountText1}</div>
                  <div className={styles.text2} style={amountTextStyle}>元</div>
                </div>
              </div>
              <div className={styles.text3} style={couponLabelStyle}>满赠券</div>
              <div className={styles.section3}>
                <div className={styles.image4} dangerouslySetInnerHTML={{__html: leftSemicircleSvg1}} />
                <img
                  src={image6Url}
                  className={styles.image6}
                />
                <div className={styles.image5} dangerouslySetInnerHTML={{__html: rightSemicircleSvg1}} />
              </div>
            </div>
            <div className={styles.main2}>
              <div className={styles.section4}>
                <div className={styles.image7} dangerouslySetInnerHTML={{__html: backgroundSvg2}} />
                <div className={styles.subSection2}>
                  <div className={styles.block1}>
                    <div className={styles.subBlock1}></div>
                  </div>
                </div>
                <div className={styles.image8} dangerouslySetInnerHTML={{__html: redPacketUnionSvg2}} />
              </div>
              <div className={styles.section5}>
                <div className={styles.subSection3}>
                  <div className={styles.text4} style={amountTextStyle}>{amountText2}</div>
                  <div className={styles.text5} style={amountTextStyle}>元</div>
                </div>
              </div>
              <div className={styles.text6} style={couponLabelStyle}>满赠券</div>
              <div className={styles.section6}>
                <div className={styles.image9} dangerouslySetInnerHTML={{__html: leftSemicircleSvg2}} />
                <img
                  src={image11Url}
                  className={styles.image11}
                />
                <div className={styles.image10} dangerouslySetInnerHTML={{__html: rightSemicircleSvg2}} />
              </div>
            </div>
            <div className={styles.main3}>
              <div className={styles.section7}>
                <div className={styles.image12} dangerouslySetInnerHTML={{__html: backgroundSvg3}} />
                <div className={styles.subSection4}>
                  <div className={styles.block2}>
                    <div className={styles.subBlock2}></div>
                  </div>
                </div>
                <div className={styles.image13} dangerouslySetInnerHTML={{__html: redPacketUnionSvg3}} />
              </div>
              <div className={styles.section8}>
                <div className={styles.subSection5}>
                  <div className={styles.text7} style={amountTextStyle}>{amountText3}</div>
                  <div className={styles.text8} style={amountTextStyle}>元</div>
                </div>
              </div>
              <div className={styles.text9} style={couponLabelStyle}>满赠券</div>
              <div className={styles.section9}>
                <div className={styles.image14} dangerouslySetInnerHTML={{__html: leftSemicircleSvg3}} />
                <img
                  src={image16Url}
                  className={styles.image16}
                />
                <div className={styles.image15} dangerouslySetInnerHTML={{__html: rightSemicircleSvg3}} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container1} style={props.hideProgressGraphic ? { visibility: 'hidden' } : undefined}>
          <div className={styles.content1}>
            <div className={styles.main4}></div>
            <div className={styles.main5}>
              <img
                src={image18Url}
                className={styles.image17}
              />
              <img
                src={image19Url}
                className={styles.image18}
              />
              <img
                src={image20Url}
                className={styles.image19}
              />
              <img
                src={image21Url}
                className={styles.image20}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text10}>消耗&nbsp;&nbsp;{consumeAmountText1}&nbsp;&nbsp;元</div>
        <div className={styles.text11}>消耗&nbsp;&nbsp;{consumeAmountText2}&nbsp;&nbsp;元</div>
        <div className={styles.text12}>消耗&nbsp;&nbsp;{consumeAmountText3}&nbsp;&nbsp;元</div>
        <div className={styles.text13}>消耗&nbsp;&nbsp;{consumeAmountText4}&nbsp;&nbsp;元</div>
      </div>
    </div>
  )
}
