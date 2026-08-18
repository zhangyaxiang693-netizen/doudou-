/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import dividerImage from './assets/image_1.svg'

export type IGeneratedComponent = {
  categoryText?: string
  headlineText?: string
  videoLabelText?: string
  videoDescriptionText?: string
  videoFrequencyText?: string
  videoUnitText?: string
  placementLabelText?: string
  placementDescriptionText?: string
  placementAmountText?: string
  placementUnitText?: string
  executionLabelText?: string
  executionDescriptionText?: string
  updateCaptionText?: string
  updateMinText?: string
  rangeSeparatorText?: string
  updateMaxText?: string
  updateUnitText?: string
  budgetPercentText?: string
  percentUnitText?: string
  budgetCaptionText?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}></div>
      <div className={styles.wrap1}>
        <div className={styles.text}>{props.categoryText ?? '服装配饰'}</div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.text1}>{props.headlineText ?? '七夕驱动穿搭需求集中爆发'}</div>
      </div>
      <div className={styles.wrap3}>
        <div className={styles.container}>
          <div className={styles.text2}>{props.videoLabelText ?? '视频内容：'}</div>
          <div className={styles.text3}>
            {props.videoDescriptionText ?? '视频建议做场景型/对比型/清单型/上身效果型，镜头须一眼看懂版型搭配，8/12起日更'}
            <span className={styles.text3__seg1}>{props.videoFrequencyText ?? '2-3'}</span>
            {props.videoUnitText ?? '条'}
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.text4}>{props.placementLabelText ?? '投放建议：'}</div>
          <div className={styles.text5}>
            {props.placementDescriptionText ?? '投放视频播放，8/19晚18-22点保留60%预算追投，剩余预算考虑前置推广，建议每单'}
            <span className={styles.text5__seg1}>{props.placementAmountText ?? '100~300'}</span>
            {props.placementUnitText ?? '元'}
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.text6}>{props.executionLabelText ?? '执行要点：'}</div>
          <div className={styles.text7}>
            {props.executionDescriptionText ?? '8/17起前置直播预告；评论区及时承接尺码与搭配咨询'}
          </div>
        </div>
      </div>
      <div className={styles.wrap4}>
        <div className={styles.container3}>
          <div className={styles.text8}>{props.updateCaptionText ?? '8/12起视频日更'}</div>
          <div className={styles.content}>
            <div className={styles.main}>
              <div className={styles.text9}>{props.updateMinText ?? '2'}</div>
              <div className={styles.text11}>{props.rangeSeparatorText ?? '-'}</div>
              <div className={styles.text10}>{props.updateMaxText ?? '3'}</div>
              <div className={styles.text12}>{props.updateUnitText ?? '条'}</div>
            </div>
          </div>
        </div>
        <img src={dividerImage} className={styles.image} />
        <div className={styles.container4}>
          <div className={styles.text13}>
            {props.budgetPercentText ?? '60'}
            <span className={styles.text13__seg1}>{props.percentUnitText ?? '%'}</span>
          </div>
          <div className={styles.text14}>{props.budgetCaptionText ?? '节点预算追投'}</div>
        </div>
      </div>
    </div>
  )
}
