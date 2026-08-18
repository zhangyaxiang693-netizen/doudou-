/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/image_4.svg'
import image5 from './assets/image_5.svg'

export type IGeneratedComponent = {
  titleOne?: string
  contentOnePrefix?: string
  contentOneHighlight?: string
  contentOneSuffix?: string
  titleTwo?: string
  contentTwoPrefix?: string
  contentTwoHighlight?: string
  contentTwoSuffix?: string
  titleThree?: string
  contentThreePrefix?: string
  contentThreeHighlight?: string
  contentThreeSuffix?: string
}

export default function GeneratedComponent({
  titleOne = '怎么参与？',
  contentOnePrefix = '5月1日-5月31日期间，在',
  contentOneHighlight = '话题#DOU+已就位，流量马上来#',
  contentOneSuffix = '下投稿，并给投稿视频投放一单DOU+≥30元即有机会获得200元流量优惠券！',
  titleTwo = '怎么评选？',
  contentTwoPrefix = '官方将从投稿作品中，',
  contentTwoHighlight = '基于内容质量和视频数据，评选出20名优质创作者',
  contentTwoSuffix = '，提供每个人一张价值200元的DOU+优惠券。',
  titleThree = '发奖时间：',
  contentThreePrefix = '5.31活动结束后，将于',
  contentThreeHighlight = '7个工作日内',
  contentThreeSuffix = '完成所有奖品的下发以及中奖名单的公示，可以在活动规则文档中查看。',
}: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <img
              src={image1}
              className={styles.image}
            />
            <img
              src={image2}
              className={styles.image1}
            />
          </div>
          <div className={styles.text}>{titleOne}</div>
        </div>
        <div className={styles.text1}>
          {contentOnePrefix}
          <span className={styles.text1__seg1}>
            {contentOneHighlight}
          </span>
          {contentOneSuffix}
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container1}>
          <div className={styles.content1}>
            <img
              src={image3}
              className={styles.image2}
            />
            <img
              src={image4}
              className={styles.image3}
            />
          </div>
          <div className={styles.text2}>{titleTwo}</div>
        </div>
        <div className={styles.text3}>
          {contentTwoPrefix}
          <span className={styles.text3__seg1}>
            {contentTwoHighlight}
          </span>
          {contentTwoSuffix}
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container2}>
          <div className={styles.content2}>
            <img
              src={image5}
              className={styles.image4}
            />
          </div>
          <div className={styles.text4}>{titleThree}</div>
        </div>
        <div className={styles.text5}>
          {contentThreePrefix}
          <span className={styles.text5__seg1}>{contentThreeHighlight}</span>
          {contentThreeSuffix}
        </div>
      </div>
    </div>
  )
}
