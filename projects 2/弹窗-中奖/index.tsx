/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Raw from './assets/image_1.svg?raw'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/铃铛 4.png'
import familyPackDecoration from '../九宫格-奖品库/装饰条.png'

type PrizeValue =
  | string
  | {
      name?: string
      title?: string
      label?: string
      copy?: string
      copyThreshold?: string
      copyAmount?: string
      text?: string
      description?: string
      image?: string
      imageUrl?: string
      url?: string
      src?: string
    }

export type IGeneratedComponent = {
  [key: string]: unknown
  titleText?: string
  amountText?: string
  prizeText?: string
  prizeSubText?: string
  buttonText?: string
  selectedPrizeIndex?: number | string
  prizeCount?: number | string
  prize1?: PrizeValue
  prize2?: PrizeValue
  prize3?: PrizeValue
  prize4?: PrizeValue
  prize5?: PrizeValue
  prize6?: PrizeValue
  prize7?: PrizeValue
  prize8?: PrizeValue
  prize1Text?: string
  prize2Text?: string
  prize3Text?: string
  prize4Text?: string
  prize5Text?: string
  prize6Text?: string
  prize7Text?: string
  prize8Text?: string
  cardGradientStart?: string
  cardGradientEnd?: string
  amountColor?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
}

const originalButtonColors = {
  buttonGradientStart: '#FF1473',
  buttonGradientEnd: '#FF229F',
}

function normalizeColor(value?: string) {
  return String(value || '').trim().toUpperCase()
}

function getDefaultTrafficCouponThreshold(amount?: string) {
  const thresholds: Record<string, string> = {
    5: '30',
    6: '68',
    10: '100',
  }
  return thresholds[String(amount || '').trim()] || '00'
}

function renderTrafficCouponCopy(amount?: string, threshold?: string) {
  return amount
    ? `满${threshold || getDefaultTrafficCouponThreshold(amount)}元赠价值${amount}元流量`
    : ''
}

function getTrafficCouponAmount(value?: string) {
  return String(value || '').match(/(\d+(?:\.\d+)?)\s*元\s*流量券/)?.[1] || ''
}

function resolvePrize(value: PrizeValue | undefined, fallbackName: string) {
  let prize = value
  if (typeof value === 'string') {
    try {
      prize = JSON.parse(value)
    } catch {
      return {name: value.trim() || fallbackName, image: '', copy: ''}
    }
  }
  if (prize && typeof prize === 'object') {
    const name = prize.name || prize.title || prize.label || fallbackName
    const copyAmount = getTrafficCouponAmount(name) || prize.copyAmount
    const copyThreshold = prize.copyThreshold || (copyAmount ? getDefaultTrafficCouponThreshold(copyAmount) : '')
    return {
      name,
      image: prize.image || prize.imageUrl || prize.url || prize.src || '',
      copy: prize.copy || prize.text || prize.description || renderTrafficCouponCopy(copyAmount, copyThreshold),
    }
  }
  return {name: fallbackName, image: '', copy: ''}
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    titleText = '恭喜抽中',
    amountText = '1314',
    prizeText = '元心动券包',
    prizeSubText = '',
    buttonText = '去查看',
    selectedPrizeIndex = 1,
    prizeCount = 8,
    prize1Text = '1314元心动券包',
    prize2Text = '6元流量券',
    prize3Text = '10元流量券',
    prize4Text = 'DOU仔周边',
    prize5Text = 'DOU仔周边',
    prize6Text = '5元流量券',
    prize7Text = 'DOU+官方推荐机会',
    prize8Text = '内容诊断积分',
    cardGradientStart = '#FFB2C3',
    cardGradientEnd = '#FF89A3',
    amountColor = '#FF1372',
    buttonGradientStart = originalButtonColors.buttonGradientStart,
    buttonGradientEnd = originalButtonColors.buttonGradientEnd,
  } = props
  const fallbackPrizeTexts = [
    prize1Text,
    prize2Text,
    prize3Text,
    prize4Text,
    prize5Text,
    prize6Text,
    prize7Text,
    prize8Text,
  ]
  const availablePrizeCount = Math.max(1, Number(prizeCount) || 1)
  const prizes = Array.from({length: availablePrizeCount}, (_, index) => {
    const prizeIndex = index + 1
    const fallbackName = String(props[`prize${prizeIndex}Text`] || fallbackPrizeTexts[index] || `奖品${prizeIndex}`)
    return resolvePrize(props[`prize${prizeIndex}`] as PrizeValue, fallbackName)
  })
  const selectedIndex = Math.max(1, Math.min(availablePrizeCount, Number(selectedPrizeIndex) || 1))
  const selectedPrize = prizes[selectedIndex - 1]
  const displayedPrizeText = prizeText || selectedPrize.name
  const displayedPrizeSubText = prizeSubText || selectedPrize.copy || '满30元赠价值5元流量'
  const isTrafficCouponPrize = /^(?:5|6|10)元流量券$/.test(selectedPrize.name)
  const isOfficialRecommendationPrize = selectedPrize.name === 'DOU+官方推荐机会'
  const isDouziFamilyPackPrize = selectedPrize.name === 'DOU仔周边全家福' ||
    selectedPrize.name === 'DOU仔全家福' ||
    selectedPrize.name === 'DOU仔全家福随机发'
  const isContentDiagnosisPrize = selectedPrize.name === '内容诊断积分'
  const hasNoSubText = selectedPrize.name === '1314元心动券包' ||
    selectedPrize.name === '1314心动券包' ||
    selectedPrize.name === '剪映VIP' ||
    selectedPrize.name === '剪映VIP月卡' ||
    selectedPrize.name === '流量扶持' ||
    selectedPrize.name === 'DOU仔周边' ||
    selectedPrize.name === 'DOU仔玩偶' ||
    selectedPrize.name === 'DOU仔挂件' ||
    selectedPrize.name === 'DOU仔周边帆布包' ||
    isContentDiagnosisPrize
  const isThemeColoredPrizeName = isOfficialRecommendationPrize ||
    selectedPrize.name === 'DOU仔周边' ||
    selectedPrize.name === 'DOU仔周边帆布包' ||
    selectedPrize.name === 'DOU仔挂件' ||
    selectedPrize.name === 'DOU仔玩偶' ||
    selectedPrize.name === '剪映VIP' ||
    selectedPrize.name === '剪映VIP月卡' ||
    selectedPrize.name === '流量扶持'
  const finalPrizeSubText = isDouziFamilyPackPrize
    ? '毛绒公仔/毛绒挂件/AI抖仔挂件/盲盒/冰箱贴\n随机发一件'
    : displayedPrizeSubText
  const prizeImageClassName = [
    styles.image3,
    isTrafficCouponPrize ? styles.trafficCouponImage : '',
    isOfficialRecommendationPrize ? styles.officialRecommendationImage : '',
    isDouziFamilyPackPrize ? styles.familyPackImage : '',
    isContentDiagnosisPrize ? styles.contentDiagnosisImage : '',
  ].filter(Boolean).join(' ')
  const backgroundSvg = image1Raw
    .replaceAll('#FFB2C3', cardGradientStart)
    .replaceAll('#FF89A3', cardGradientEnd)
  const buttonStyle =
    normalizeColor(buttonGradientStart) !== originalButtonColors.buttonGradientStart ||
    normalizeColor(buttonGradientEnd) !== originalButtonColors.buttonGradientEnd
      ? {
          background: `linear-gradient(90deg, ${buttonGradientStart} 0%, ${buttonGradientEnd} 100%)`,
        }
      : undefined

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div
            className={styles.image}
            dangerouslySetInnerHTML={{__html: backgroundSvg}}
          />
          <div className={styles.content}>
            <img
                src={image2}
              className={styles.image1}
            />
            <img
                src={image3}
              className={styles.image2}
            />
          </div>
          <img
            src={selectedPrize.image || image4}
            className={prizeImageClassName}
          />
        </div>
      </div>
        {!isDouziFamilyPackPrize && !isContentDiagnosisPrize ? <div className={styles.text}>{titleText}</div> : null}
      <div className={`${styles.wrap1} ${isDouziFamilyPackPrize ? styles.familyPackTitleWrap : ''} ${hasNoSubText && !isContentDiagnosisPrize ? styles.noSubTextTitleWrap : ''} ${isContentDiagnosisPrize ? styles.contentDiagnosisTitleWrap : ''}`}>
        {isContentDiagnosisPrize ? (
          <div className={styles.contentDiagnosisTitle}>
            恭喜抽中<span>内容诊断积分<img src={familyPackDecoration} className={styles.contentDiagnosisDecoration} /></span>
          </div>
        ) : isDouziFamilyPackPrize ? (
          <div className={styles.familyPackTitle}>
            恭喜抽中<span style={{color: amountColor}}>DOU仔周边！</span>
          </div>
        ) : (
          <>
            <div className={styles.text2} style={{color: amountColor}}>
                <span className={styles.text2__seg0}>{amountText}</span>
            </div>
                <div className={`${styles.text1} ${isThemeColoredPrizeName ? styles.officialRecommendationPrizeName : ''}`} style={isThemeColoredPrizeName ? {color: amountColor} : undefined}>{displayedPrizeText}</div>
          </>
        )}
      </div>
      {isContentDiagnosisPrize ? (
        <div className={styles.contentDiagnosisAmount}>
          <img src={selectedPrize.image || image4} className={styles.contentDiagnosisAmountIcon} />
          <span style={{color: amountColor}}>+50</span>
        </div>
      ) : isDouziFamilyPackPrize ? (
        <div className={`${styles.subText} ${styles.familyPackSubText}`}>
          <div className={styles.familyPackSubTextLine}>毛绒公仔/毛绒挂件/AI抖仔挂件/盲盒/冰箱贴</div>
          <div className={styles.familyPackSubTextLineWrap}>
            <img src={familyPackDecoration} className={styles.familyPackDecoration} />
            <span className={styles.familyPackSubTextLine}>随机发一件</span>
          </div>
        </div>
      ) : hasNoSubText ? null : (
        <div className={`${styles.subText} ${isOfficialRecommendationPrize ? styles.officialRecommendationSubText : ''}`}>{finalPrizeSubText}</div>
      )}
      {!isContentDiagnosisPrize ? (
        <div className={styles.buttonPage}>
          <div className={styles.buttonWrap} style={buttonStyle}>
            <div className={styles.buttonText}>{buttonText}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
