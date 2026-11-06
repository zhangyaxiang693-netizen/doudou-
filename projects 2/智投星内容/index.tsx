/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/Mask group (2).png'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/image_4.svg'

export type IGeneratedComponent = {
  introText?: string
  card1Title?: string
  card1Content?: string
  card2Title?: string
  card2Content?: string
  card3Title?: string
  card3Content?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    introText = 'AI投放聚焦创作者在投放过程中的决策难题，对话式智能下单产品、一站式轻松稳投，帮大家精准匹配需求、选对优化目标，让投放更高效、效果更有保障',
    card1Title = '更高效',
    card1Content = '智能下单产品',
    card2Title = '更轻松',
    card2Content = '一站式稳投',
    card3Title = '更精准',
    card3Content = '精准匹配需求',
  } = props

  const renderIntroText = () => {
    const highlightClassByText: Record<string, string> = {
      智能下单产品: styles.text__seg1,
      轻松稳投: styles.text__seg3,
      精准匹配需求: styles.text__seg5,
    }
    const pattern = /(智能下单产品|轻松稳投|精准匹配需求)/g

    return introText.split(pattern).map((text, index) => {
      const className = highlightClassByText[text]
      return className ? (
        <span key={`${text}-${index}`} className={className}>
          {text}
        </span>
      ) : (
        text
      )
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <img src={image1} className={styles.image} />
        <div className={styles.text} data-react-edit-prop="introText">{renderIntroText()}</div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container}>
          <div className={styles.content}></div>
          <img src={image2} className={styles.image1} />
          <div className={styles.content1}>
            <div className={styles.text1} data-react-edit-prop="card1Title">{card1Title}</div>
            <div className={styles.text2} data-react-edit-prop="card1Content">{card1Content}</div>
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.content2}></div>
          <img src={image3} className={styles.image2} />
          <div className={styles.content3}>
            <div className={styles.text3} data-react-edit-prop="card2Title">{card2Title}</div>
            <div className={styles.text4} data-react-edit-prop="card2Content">{card2Content}</div>
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.content4}></div>
          <img src={image4} className={styles.image3} />
          <div className={styles.content5}>
            <div className={styles.text5} data-react-edit-prop="card3Title">{card3Title}</div>
            <div className={styles.text6} data-react-edit-prop="card3Content">{card3Content}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
