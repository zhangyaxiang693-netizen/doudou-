import React from 'react'
import TaskTitle from '../任务标题'
import Announcement from '../公告'
import LotteryGrid from '../九宫格抽奖'
import styles from './index.module.scss'

export interface LotteryAnnouncementGridProps {
  title?: string
  subtitle?: string
  announcementText?: string
  prize1?: string
  prize2?: string
  prize3?: string
  prize4?: string
  prize5?: string
  prize6?: string
  prize7?: string
  prize8?: string
  buttonText?: string
}

export default function LotteryAnnouncementGrid({
  title = '做任务 抽好礼',
  subtitle = '剩余抽奖次数：2',
  announcementText = '用户XXXXXXX领到抖仔毛绒挂件奖',
  prize1 = '666元流量扶持',
  prize2 = '满68赠6流量券',
  prize3 = '满100赠10流量券',
  prize4 = 'DOU仔冰箱贴',
  prize5 = 'DOU仔帆布包',
  prize6 = '满30赠5代投券',
  prize7 = 'DOU仔挂件',
  prize8 = 'DOU仔玩偶',
  buttonText = '抽',
}: LotteryAnnouncementGridProps) {
  return (
    <section className={styles.wrapper}>
      <TaskTitle title={title} subtitle={subtitle} />
      <Announcement text={announcementText} />
      <LotteryGrid
        prize1={prize1}
        prize2={prize2}
        prize3={prize3}
        prize4={prize4}
        prize5={prize5}
        prize6={prize6}
        prize7={prize7}
        prize8={prize8}
        buttonText={buttonText}
      />
    </section>
  )
}
