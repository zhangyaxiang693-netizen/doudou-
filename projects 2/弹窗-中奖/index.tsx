/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Raw from './assets/image_1.svg?raw'
import image2 from './assets/image_2.svg'
import image3 from './assets/image_3.svg'
import image4 from './assets/铃铛 4.png'
import familyPackDecoration from '../九宫格-奖品库/装饰条.png'
import TrafficCouponPrize from '../奖品-流量券'
import AiTrafficCouponPrize from '../奖品-ai流量券'
import {getTrafficCouponAmountFromText, getTrafficCouponPrizeType, normalizeAiTrafficCouponName} from '../src/traffic-coupon'
import RandomPrizeAddress from '../随机奖品填写地址'

type PrizeValue =
  | string
  | {
      name?: string
      title?: string
      label?: string
      copy?: string
      copyThreshold?: string
      copyAmount?: string
      type?: string
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
    9: '98',
    10: '100',
    12: '150',
    16: '198',
    22: '280',
  }
  return thresholds[String(amount || '').trim()] || '00'
}

function renderTrafficCouponCopy(amount?: string, threshold?: string) {
  return amount
    ? `满${threshold || getDefaultTrafficCouponThreshold(amount)}元赠价值${amount}元流量`
    : ''
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
    const name = normalizeAiTrafficCouponName(prize.name || prize.title || prize.label || fallbackName, prize)
    const copyAmount = getTrafficCouponAmountFromText(name) || prize.copyAmount
    const copyThreshold = prize.copyThreshold || (copyAmount ? getDefaultTrafficCouponThreshold(copyAmount) : '')
    return {
      name,
      image: prize.image || prize.imageUrl || prize.url || prize.src || '',
      copy: prize.copy || prize.text || prize.description || renderTrafficCouponCopy(copyAmount, copyThreshold),
      type: prize.type,
      amount: prize.copyAmount || copyAmount,
    }
  }
  return {name: fallbackName, image: '', copy: '', type: '', amount: ''}
}

function renderPrizeName(name: string) {
  return name.split(/(DOU)/g).map((part, index) => (
    part === 'DOU'
      ? <span className={styles.douPrizeText} key={`${part}-${index}`}>{part}</span>
      : part
  ))
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    titleText = '恭喜抽中',
    amountText = '1000',
    prizeText = '元心动券包',
    prizeSubText = '',
    buttonText = '去查看',
    selectedPrizeIndex = 1,
    prizeCount = 8,
    prize1Text = '1000元心动券包',
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
  const normalizedSelectedPrizeName = selectedPrize.name.replace(/\s+/g, '')
  const displayedPrizeText = normalizeAiTrafficCouponName(prizeText || (
    normalizedSelectedPrizeName.includes('全家福随机发') || normalizedSelectedPrizeName.includes('周边全家福')
      ? 'DOU仔随机周边'
      : selectedPrize.name
  ), selectedPrize)
  const displayedPrizeSubText = prizeSubText || selectedPrize.copy || '满30元赠价值5元流量'
  const couponType = getTrafficCouponPrizeType(selectedPrize)
  const isTrafficCouponPrize = Boolean(couponType)
  const CouponPrize = couponType === 'ai_traffic_coupon' ? AiTrafficCouponPrize : TrafficCouponPrize
  const popupEditProp = (prop: string) => isTrafficCouponPrize ? undefined : prop
  const trafficCouponAmount =
    selectedPrize.amount ||
    getTrafficCouponAmountFromText(selectedPrize.name) ||
    getTrafficCouponAmountFromText(selectedPrize.copy)
  const isOfficialRecommendationPrize =
    selectedPrize.type === 'official_recommendation' ||
    selectedPrize.name === 'DOU+官方推荐机会'
  const isDouziFamilyPackPrize = selectedPrize.type === 'douzi_family_pack' ||
    selectedPrize.name === 'DOU仔周边全家福' ||
    selectedPrize.name === 'DOU仔全家福' ||
    selectedPrize.name === 'DOU仔随机周边' ||
    selectedPrize.name === 'DOU仔全家福随机发'
  const isContentDiagnosisPrize =
    selectedPrize.type === 'content_diagnosis' ||
    selectedPrize.name === '内容诊断积分'
  const hasNoSubText =
    [
      'coupon_pack',
      'jianying_vip',
      'traffic_support',
      'douzi_merch',
      'douzi_doll',
      'douzi_keychain',
      'douzi_canvas_bag',
      'content_diagnosis',
    ].includes(String(selectedPrize.type || '')) ||
    selectedPrize.name === '1000元心动券包' ||
    selectedPrize.name === '剪映VIP' ||
    selectedPrize.name === '剪映VIP月卡' ||
    selectedPrize.name === '流量扶持' ||
    selectedPrize.name === 'DOU仔周边' ||
    selectedPrize.name === 'DOU仔玩偶' ||
    selectedPrize.name === 'DOU仔挂件' ||
    selectedPrize.name === 'DOU仔帆布包' ||
    isContentDiagnosisPrize
  const isThemeColoredPrizeName =
    [
      'douzi_merch',
      'douzi_canvas_bag',
      'douzi_keychain',
      'douzi_doll',
      'jianying_vip',
      'traffic_support',
    ].includes(String(selectedPrize.type || '')) ||
    isOfficialRecommendationPrize ||
    selectedPrize.name === 'DOU仔周边' ||
    selectedPrize.name === 'DOU仔帆布包' ||
    selectedPrize.name === 'DOU仔挂件' ||
    selectedPrize.name === 'DOU仔玩偶' ||
    selectedPrize.name === '剪映VIP' ||
    selectedPrize.name === '剪映VIP月卡' ||
    selectedPrize.name === '流量扶持'
  const finalPrizeSubText = displayedPrizeSubText
  const prizeImageClassName = [
    styles.image3,
    isTrafficCouponPrize ? styles.trafficCouponImage : '',
    isOfficialRecommendationPrize ? styles.officialRecommendationImage : '',
    isDouziFamilyPackPrize ? styles.familyPackImage : '',
    isContentDiagnosisPrize ? styles.contentDiagnosisImage : '',
  ].filter(Boolean).join(' ')
  const backgroundSvg = image1Raw
    .replace('<svg ', '<svg preserveAspectRatio="none" ')
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
    <div
      className={`${styles.page} ${isDouziFamilyPackPrize ? styles.familyPackPage : ''} ${isTrafficCouponPrize ? styles.trafficCouponLocked : ''}`}
      data-edit-hint={isTrafficCouponPrize ? '请前往表格界面编辑奖品信息' : undefined}
    >
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
          {isTrafficCouponPrize ? (
            <CouponPrize
              amount={trafficCouponAmount || '10'}
              className={styles.trafficCouponComponent}
            />
          ) : (
            <img
              src={selectedPrize.image || image4}
              className={prizeImageClassName}
            />
          )}
        </div>
      </div>
        {!isDouziFamilyPackPrize && !isContentDiagnosisPrize ? (
          <div className={styles.text} data-react-edit-prop={popupEditProp('titleText')}>{titleText}</div>
        ) : null}
      <div className={`${styles.wrap1} ${isDouziFamilyPackPrize ? styles.familyPackTitleWrap : ''} ${hasNoSubText && !isContentDiagnosisPrize ? styles.noSubTextTitleWrap : ''} ${isContentDiagnosisPrize ? styles.contentDiagnosisTitleWrap : ''}`}>
        {isContentDiagnosisPrize ? (
          <div className={styles.contentDiagnosisTitle}>
            恭喜抽中<span>内容诊断积分<img src={familyPackDecoration} className={styles.contentDiagnosisDecoration} /></span>
          </div>
        ) : isDouziFamilyPackPrize ? (
          <div className={styles.familyPackTitle}>
            <span data-react-edit-prop={popupEditProp('titleText')}>{titleText}</span>
            <span data-react-edit-prop={popupEditProp('prizeText')} style={{color: amountColor}}>
              {renderPrizeName(displayedPrizeText)}
            </span>
          </div>
        ) : (
          <>
            <div className={styles.text2} style={{color: amountColor}}>
                <span className={styles.text2__seg0} data-react-edit-prop={popupEditProp('amountText')}>{amountText}</span>
            </div>
                <div data-react-edit-prop={popupEditProp('prizeText')} className={`${styles.text1} ${isThemeColoredPrizeName ? styles.officialRecommendationPrizeName : ''}`} style={isThemeColoredPrizeName ? {color: amountColor} : undefined}>{renderPrizeName(displayedPrizeText)}</div>
          </>
        )}
      </div>
      {isContentDiagnosisPrize ? (
        <div className={styles.contentDiagnosisAmount}>
          <img src={selectedPrize.image || image4} className={styles.contentDiagnosisAmountIcon} />
          <span style={{color: amountColor}}>+50</span>
        </div>
      ) : isDouziFamilyPackPrize ? (
        <div className={styles.familyPackAddress}>
          <RandomPrizeAddress
            descriptionText={finalPrizeSubText}
            descriptionEditProp="prizeSubText"
            accentGradientStart={buttonGradientStart}
            accentGradientEnd={buttonGradientEnd}
          />
        </div>
      ) : hasNoSubText ? null : (
        <div data-react-edit-prop={popupEditProp('prizeSubText')} className={`${styles.subText} ${isOfficialRecommendationPrize ? styles.officialRecommendationSubText : ''}`}>{finalPrizeSubText}</div>
      )}
      {!isContentDiagnosisPrize && !isDouziFamilyPackPrize ? (
        <div className={styles.buttonPage}>
          <div className={styles.buttonWrap} style={buttonStyle}>
            <div className={styles.buttonText} data-react-edit-prop={popupEditProp('buttonText')}>{buttonText}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
