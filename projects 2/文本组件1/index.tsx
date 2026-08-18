/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'

export type IGeneratedComponent = {
  title?: string
  ruleOne?: string
  ruleTwo?: string
  ruleThree?: string
  note?: string
}

export default function GeneratedComponent({
  title = '参与规则:',
  ruleOne = '报名：点击上方“立即报名”加入活动',
  ruleTwo = '2026年6.19-6.21期间累计现金消耗≥80元且消耗完成（投DOU+点赞评论量、视频播放量、粉丝量目标），即有机会获得一张满100元赠480元DOU+优惠券',
  ruleThree = '共抽取5位用户（消耗越高，中奖机会越大）',
  note = '*奖励将于活动结束后5个工作日内发放至获奖用户的DOU+账户',
}: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.text}>{title}</div>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <img src={image1} className={styles.image} />
          <div className={styles.text1}>
            <div className={styles.text1__listwrap}>
              {ruleOne}
            </div>
          </div>
        </div>
        <div className={styles.container1}>
          <img
            src={image2}
            className={styles.image1}
          />
          <div className={styles.text2}>
            {ruleTwo}
          </div>
        </div>
        <div className={styles.container2}>
          <img
            src={image3}
            className={styles.image2}
          />
          <div className={styles.text3}>
            {ruleThree}
          </div>
        </div>
      </div>
      <div className={styles.text4}>
        <div className={styles.text4__listwrap}>
          {note}
        </div>
      </div>
    </div>
  )
}
