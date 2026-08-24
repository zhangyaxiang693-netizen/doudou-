/* eslint-disable*/
import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  firstBodyText?: string
  secondBodyText?: string
  thirdBodyText?: string
}

function hasText(value: string | undefined) {
  return value !== undefined && value !== null && value !== ''
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.text}>
        {hasText(props.firstBodyText) ? (
          props.firstBodyText
        ) : (
          <>
            <span className={styles.text__seg0}>1.</span>
            <span className={styles.text__seg1}>最多可邀请</span>
            <span className={styles.text__seg2}>&nbsp;10&nbsp;位新人好友</span>
            <span className={styles.text__seg3}>
              ，每成功邀请&nbsp;1&nbsp;位，可获得&nbsp;1&nbsp;张优惠券，奖励可叠加
            </span>
          </>
        )}
      </div>
      <div className={styles.wrap}>
        {hasText(props.secondBodyText) ? (
          <>
            {!hasText(props.firstBodyText) && (
              <div className={styles.text1}>2.获得奖励需同时满足：</div>
            )}
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.text2}>{props.secondBodyText}</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.text1}>2.获得奖励需同时满足：</div>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.text2}>
                  <ul className={styles.text2__listwrap}>
                    被邀请的好友是从未使用过&nbsp;DOU+&nbsp;投放或最近&nbsp;1&nbsp;年内未在&nbsp;DOU+&nbsp;投放的新用户
                  </ul>
                </div>
                <div className={styles.text3}>
                  好友通过你的邀请码成功绑定，活动期间内正常完成一单
                  <span className={styles.text3__seg1}>现金消耗≥30&nbsp;元</span>
                  的投放（投点赞评论量、播放量、主页浏览量、粉丝量目标）
                </div>
              </div>
            </div>
          </>
        )}
        <div className={styles.text4}>
          {props.thirdBodyText || '注意：奖励发放按照好友投放完成进度执行，与邀请先后顺序无关。实际获券面额以“完成助力的好友情况”页面展示为准'}
        </div>
      </div>
    </div>
  )
}
