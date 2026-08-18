/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/image_4.svg'
import image5 from './assets/image_5.svg'
import image6 from './assets/image_6.svg'
import image7 from './assets/image_7.svg'
import image8 from './assets/image_8.svg'
import image9 from './assets/image_9.svg'
import image10 from './assets/image_10.svg'
import image11 from './assets/image_11.svg'
import image12 from './assets/image_12.svg'
import image13 from './assets/image_13.svg'
import image14 from './assets/image_14.svg'
import image15 from './assets/image_15.svg'
import image16 from './assets/image_16.svg'

export type IGeneratedComponent = {
  brandText?: string
  titleText?: string
  caseOneName?: string
  caseOneFans?: string
  caseOneStrategy?: string
  caseOneCostLabel?: string
  caseOneShareLabel?: string
  caseOneCompletionLabel?: string
  caseOneShareChange?: string
  caseOneCompletionChange?: string
  caseOneCostChange?: string
  caseTwoName?: string
  caseTwoFans?: string
  caseTwoStrategy?: string
  caseTwoBeforeFans?: string
  caseTwoBeforeLabel?: string
  caseTwoAfterFans?: string
  caseTwoAfterLabel?: string
  caseThreeName?: string
  caseThreeFans?: string
  caseThreeStrategy?: string
  caseThreeCostTitle?: string
  caseThreeCostLabel?: string
  caseThreePlayLabel?: string
  caseThreePlayChange?: string
  caseThreeCostChange?: string
  buttonText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}>
              <img src={image1} className={styles.image} />
              <div className={styles.section}></div>
              <img src={image2} className={styles.image1} />
            </div>
          </div>
          <div className={styles.content1}>
            <div className={styles.text}>{props.brandText ?? 'DOU+'}</div>
            <div className={styles.text1}>{props.titleText ?? '投放优质案例'}</div>
          </div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <img src={image3} className={styles.image2} />
        <div className={styles.container1}>
          <div className={styles.content3}>
            <div className={styles.text10}>{props.caseOneName ?? '美食博主-**子然'}</div>
            <div className={styles.text11}>{props.caseOneFans ?? '粉丝：16.6万'}</div>
          </div>
          <div className={styles.text2}>
            {props.caseOneStrategy ??
              '投放策略：使用点赞评论目标，先用小额订单通过冷启期，后通过大额订单突破10w+点赞'}
          </div>
          <div className={styles.content2}>
            <div className={styles.main1}>
              <div className={styles.text7}>
                <span>{props.caseOneShareChange ?? '+107.04%'}</span>
              </div>
              <div className={styles.section1}>
                <div className={styles.subSection}>
                  <div className={styles.div1}>
                    <img src={image4} className={styles.image3} />
                  </div>
                </div>
                <div className={styles.subSection1}></div>
                <div className={styles.subSection2}></div>
                <div className={styles.subSection3}></div>
                <div className={styles.subSection4}></div>
                <div className={styles.subSection5}></div>
                <div className={styles.subSection6}></div>
                <div className={styles.subSection7}>
                  <div className={styles.text3}>{props.caseOneCostLabel ?? '成本'}</div>
                </div>
                <div className={styles.subSection8}>
                  <div className={styles.text5}>
                    <span>{props.caseOneCompletionChange ?? '+33.7%'}</span>
                  </div>
                  <div className={styles.text4}>{props.caseOneShareLabel ?? '分享率'}</div>
                </div>
                <div className={styles.subSection9}>
                  <div className={styles.text6}>{props.caseOneCompletionLabel ?? '完播率'}</div>
                </div>
              </div>
            </div>
            <div className={styles.main2}>
              <div className={styles.text8}>
                <span>{props.caseOneCostChange ?? '-93%'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src={image5} className={styles.image4} />
      <div className={styles.wrap2}>
        <img src={image6} className={styles.image5} />
        <div className={styles.container2}>
          <div className={styles.content5}>
            <div className={styles.text17}>{props.caseTwoName ?? '生活记录-韩国人*然'}</div>
            <div className={styles.text18}>{props.caseTwoFans ?? '粉丝：2.3万'}</div>
          </div>
          <div className={styles.text12}>
            {props.caseTwoStrategy ??
              '投放策略：使用快速涨粉目标，每单必投DOU+，用小预算、连续单的方式，对多个视频持续加热'}
          </div>
          <div className={styles.content4}>
            <div className={styles.main3}>
              <img src={image7} className={styles.image6} />
              <img src={image8} className={styles.image7} />
              <div className={styles.section2}>
                <div className={styles.subSection10}>
                  <img src={image9} className={styles.image8} />
                </div>
                <div className={styles.subSection11}>
                  <div className={styles.subBlock1}>
                    <img src={image10} className={styles.image9} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.main4}>
              <div className={styles.text13}>
                <div className={styles.text13__listwrap}>{props.caseTwoBeforeFans ?? '100+'}</div>
              </div>
              <div className={styles.text14}>{props.caseTwoBeforeLabel ?? '加热前粉丝量'}</div>
            </div>
            <div className={styles.main5}>
              <div className={styles.text15}>
                <span>{props.caseTwoAfterFans ?? '8K+'}</span>
              </div>
              <div className={styles.text16}>{props.caseTwoAfterLabel ?? '加热后粉丝量'}</div>
            </div>
            <img src={image11} className={styles.image10} />
            <img src={image12} className={styles.image11} />
          </div>
        </div>
      </div>
      <img src={image13} className={styles.image12} />
      <div className={styles.wrap3}>
        <div className={styles.container3}>
          <div className={styles.text19}>
            {props.caseThreeStrategy ??
              '投放策略：每单必投DOU+，并采纳投放助手的投放复盘建议，不断迭代投放策略'}
          </div>
          <div className={styles.content6}>
            <div className={styles.main6}>
              <div className={styles.section3}></div>
              <div className={styles.text20}>{props.caseThreeCostTitle ?? '订单实现成本降低'}</div>
              <div className={styles.section4}>
                <div className={styles.text21}>{props.caseThreeCostLabel ?? '互动成本'}</div>
                <img src={image14} className={styles.image13} />
              </div>
            </div>
            <div className={styles.main7}>
              <img src={image15} className={styles.image14} />
              <div className={styles.text22}>{props.caseThreePlayLabel ?? '播放量'}</div>
              <div className={styles.text23}>
                <span>{props.caseThreePlayChange ?? '+150%'}</span>
              </div>
              <div className={styles.section5}>
                <div className={styles.text26}>
                  <span>{props.caseThreeCostChange ?? '-48%'}</span>
                </div>
              </div>
            </div>
          </div>
          <img src={image16} className={styles.image15} />
          <div className={styles.content7}>
            <div className={styles.text29}>{props.caseThreeName ?? '装修博主-**装修阿涛'}</div>
            <div className={styles.text30}>{props.caseThreeFans ?? '粉丝：1100'}</div>
          </div>
        </div>
      </div>
      <div className={styles.wrap4}>
        <div className={styles.container4}>
          <div className={styles.text31}>{props.buttonText ?? '马上试试'}</div>
        </div>
      </div>
    </div>
  )
}
