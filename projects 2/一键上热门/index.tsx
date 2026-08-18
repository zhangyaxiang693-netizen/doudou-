/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/image_4.svg'

export type IGeneratedComponent = {
  titlePrefix?: string
  brandText?: string
  titleSuffix?: string
  sectionTitle?: string
  videoTitle?: string
  userName?: string
  suggestionText?: string
  moreText?: string
  buttonText?: string
}

export default function GeneratedComponent({
  titlePrefix = '报告已生成 用',
  brandText = 'DOU+',
  titleSuffix = '推爆内容吧！',
  sectionTitle = '诊断建议',
  videoTitle = '当猫咪发现了扫地机器人',
  userName = '用户昵称',
  suggestionText = '你的视频总播放量、点赞率均高于同类水平! 如果能再优化前几秒的视觉冲击和节奏就更好啦~ 评论区记得加入引导话术哦!',
  moreText = '查看更多内容诊断信息 >>',
  buttonText = '一键上热门',
}: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}>
              <div className={styles.section}>
                <img
	                  src={image1}
                  className={styles.image}
                />
                <img
	                  src={image2}
                  className={styles.image1}
                />
              </div>
            </div>
            <div className={styles.main1}>
	              <div className={styles.text}>{titlePrefix}</div>
	              <div className={styles.text1}>{brandText}</div>
	              <div className={styles.text2}>{titleSuffix}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container1}>
        <div className={styles.content1}>
          <img
	            src={image3}
            className={styles.image2}
          />
	          <div className={styles.text3}>{sectionTitle}</div>
        </div>
        <div className={styles.content2}>
          <div className={styles.main2}>
            <div className={styles.section1}>
              <img
	                src={image4}
                className={styles.image3}
              />
              <div className={styles.subSection}>
	                <div className={styles.text4}>{videoTitle}</div>
	                <div className={styles.text5}>{userName}</div>
              </div>
            </div>
	            <div className={styles.text6}>{suggestionText}</div>
          </div>
        </div>
      </div>
	      <div className={styles.text7}>{moreText}</div>
      <div className={styles.container2}>
        <div className={styles.text8}>
	          <span className={styles.text8__seg0}>{buttonText}</span>
        </div>
      </div>
    </div>
  )
}
