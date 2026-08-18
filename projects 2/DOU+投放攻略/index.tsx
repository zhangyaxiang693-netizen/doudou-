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

export type IGeneratedComponent = {
  titlePrefix?: string
  brandText?: string
  titleSuffix?: string
  sectionOneTitle?: string
  sectionOneItemOne?: string
  sectionOneItemTwo?: string
  sectionOneItemThree?: string
  sectionTwoTitle?: string
  sectionTwoItemOne?: string
  sectionTwoItemTwo?: string
  sectionThreeTitle?: string
  sectionThreeItemOne?: string
  sectionThreeItemTwo?: string
  sectionFourTitle?: string
  sectionFourBody?: string
  buttonText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}>
              <div className={styles.section}>
                <img src={image1} className={styles.image} />
                <img src={image2} className={styles.image1} />
                <div className={styles.subSection}></div>
              </div>
            </div>
            <div className={styles.main1}>
              <div className={styles.text}>{props.titlePrefix ?? '快速分钟掌握'}</div>
              <div className={styles.text1}>{props.brandText ?? 'DOU+'}</div>
              <div className={styles.text2}>{props.titleSuffix ?? '攻略'}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container1}>
          <div className={styles.content1}>
            <div className={styles.main2}>
              <img src={image3} className={styles.image2} />
              <img src={image4} className={styles.image3} />
            </div>
            <div className={styles.text3}>{props.sectionOneTitle ?? '投放什么目标？'}</div>
          </div>
          <div className={styles.content2}>
            <div className={styles.text4}>
              <ul className={styles.text4__listwrap}>
                <li className={styles.text4__linebreak}>
                  <span>{props.sectionOneItemOne ?? '需要提升点赞/评论/转化量, 可以选择「点赞评论量」'}</span>
                </li>
                <li className={styles.text4__linebreak}>
                  <span>{props.sectionOneItemTwo ?? '需要更多视频播放量, 可以选择「视频播放量」'}</span>
                </li>
                <li><span>{props.sectionOneItemThree ?? '需要粉丝量快速提升, 达成千粉可以选择「粉丝量」'}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <img src={image5} className={styles.image4} />
        <div className={styles.container2}>
          <div className={styles.content3}>
            <div className={styles.main3}>
              <img src={image6} className={styles.image5} />
              <img src={image7} className={styles.image6} />
            </div>
            <div className={styles.text5}>{props.sectionTwoTitle ?? '如何选择投放时长?'}</div>
          </div>
          <div className={styles.content4}>
            <div className={styles.text6}>
              <ul className={styles.text6__listwrap}>
                <li className={styles.text6__linebreak}>
                  <span>{props.sectionTwoItemOne ?? '优先建议24小时或者12小时投放, 可以匹配性价比最高流量, 建议预算不低于100元'}</span>
                </li>
                <li>
                  <span>{props.sectionTwoItemTwo ?? '长期运营的账户, 可以拉长周期, 比如3天300元以上'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <img src={image8} className={styles.image7} />
        <div className={styles.container3}>
          <div className={styles.content5}>
            <div className={styles.main4}>
              <img src={image9} className={styles.image8} />
              <img src={image10} className={styles.image9} />
            </div>
            <div className={styles.text7}>{props.sectionThreeTitle ?? '什么作品适合投DOU+?'}</div>
          </div>
          <div className={styles.content6}>
            <div className={styles.text8}>
              <ul className={styles.text8__listwrap}>
                <li className={styles.text8__linebreak}>
                  <span>{props.sectionThreeItemOne ?? '优选系统推荐视频, 如果账号下出现「潜力视频」等系统标签, 建议优先投放'}</span>
                </li>
                <li>
                  <span>{props.sectionThreeItemTwo ?? '建议多视频投放, 系统会自动选择多个视频中投放效果好的加大预算投入'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <img src={image11} className={styles.image10} />
        <div className={styles.content7}>
          <div className={styles.main5}>
            <img src={image12} className={styles.image11} />
            <img src={image13} className={styles.image12} />
          </div>
          <div className={styles.text9}>{props.sectionFourTitle ?? '投放影响自然流量么?'}</div>
        </div>
        <div className={styles.content8}>
          <div className={styles.text10}>
            <ul className={styles.text10__listwrap}>
              <span>{props.sectionFourBody ?? 'DOU+付费流量与自然流量相互独立, 投放不会压制自然流量。优质数据反而可以协同带来更多自然流量。'}</span>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container5}>
          <div className={styles.text11}>{props.buttonText ?? '立即投稿'}</div>
        </div>
      </div>
    </div>
  )
}
