import React from 'react'
import SectionTitle from '../SectionTitle'
import ConsumptionRewardProgress from '../消耗返进度条'
import TwoColumnLiveData from '../TwoColumnLiveData'
import BigButton from '../BigButton'
import TextComponentOne from '../文本组件1'
import styles from './index.module.scss'

export interface ConsumptionRewardDataRulesProps {
  titleText?: string
  lotteryText?: string
  reward1AmountText?: string
  reward2AmountText?: string
  reward3AmountText?: string
  milestone1Text?: string
  milestone2Text?: string
  milestone3Text?: string
  milestone4Text?: string
  leftLabel?: string
  leftValue?: string
  leftUnit?: string
  rightLabel?: string
  rightValue?: string
  buttonText?: string
  rulesTitle?: string
  ruleOne?: string
  ruleTwo?: string
  ruleThree?: string
  note?: string
}

export default function ConsumptionRewardDataRules({
  titleText = '消耗达标100%赢流量券',
  lotteryText = '抽奖',
  reward1AmountText = '888',
  reward2AmountText = '888',
  reward3AmountText = '888',
  milestone1Text = '消耗30元',
  milestone2Text = '消耗20元',
  milestone3Text = '消耗30元',
  milestone4Text = '消耗40元',
  leftLabel = '累计现金消耗',
  leftValue = '9',
  leftUnit = '(元)',
  rightLabel = '可抽奖次数',
  rightValue = '2',
  buttonText = '去投放',
  rulesTitle = '参与规则:',
  ruleOne = '报名：点击上方“立即报名”加入活动',
  ruleTwo = '2026年6.19-6.21期间累计现金消耗≥80元且消耗完成（投DOU+点赞评论量、视频播放量、粉丝量目标），即有机会获得一张满100元赠480元DOU+优惠券',
  ruleThree = '共抽取5位用户（消耗越高，中奖机会越大）',
  note = '*具体活动规则以页面展示为准',
}: ConsumptionRewardDataRulesProps) {
  return (
    <section className={styles.wrapper}>
      <SectionTitle text={titleText} />
      <ConsumptionRewardProgress
        lotteryText={lotteryText}
        reward1AmountText={reward1AmountText}
        reward2AmountText={reward2AmountText}
        reward3AmountText={reward3AmountText}
        milestone1Text={milestone1Text}
        milestone2Text={milestone2Text}
        milestone3Text={milestone3Text}
        milestone4Text={milestone4Text}
      />
      <TwoColumnLiveData
        leftLabel={leftLabel}
        leftValue={leftValue}
        leftUnit={leftUnit}
        rightLabel={rightLabel}
        rightValue={rightValue}
      />
      <BigButton text={buttonText} />
      <TextComponentOne
        title={rulesTitle}
        ruleOne={ruleOne}
        ruleTwo={ruleTwo}
        ruleThree={ruleThree}
        note={note}
      />
    </section>
  )
}
