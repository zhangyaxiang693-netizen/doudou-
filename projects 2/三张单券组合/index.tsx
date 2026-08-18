import SingleCoupon from '../单张优惠券'
import { createCssVars, toCssPx } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface TripleSingleCouponProps {
  gap?: number | string
  className?: string
  [key: string]: number | string | undefined
}

function toNumber(value: number | string) {
  if (typeof value === 'number') return value
  const parsed = parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export default function TripleSingleCoupon(props: TripleSingleCouponProps) {
  const { gap = 4, className } = props

  const value = (index: number, key: string, fallback: number | string) => {
    const propValue = props[`coupon${index}${key}`]
    return propValue === undefined || propValue === '' ? fallback : propValue
  }

  const couponProps = (index: number) => ({
    title: value(index, 'Title', 'DOU+满赠券') as string,
    amount: value(index, 'Amount', '800') as string,
    unit: value(index, 'Unit', '元') as string,
    tag: value(index, 'Tag', '叠加') as string,
    radius: value(index, 'Radius', 40) as number,
    bgGradientStart: value(index, 'BgGradientStart', '#FFF3F3') as string,
    bgGradientEnd: value(index, 'BgGradientEnd', '#FFFEFE') as string,
    topGradientStart: value(index, 'TopGradientStart', '#FF57AF') as string,
    topGradientEnd: value(index, 'TopGradientEnd', '#FF387B') as string,
    dividerColor: value(index, 'DividerColor', '#FFD2D2') as string,
    tagButtonColor: value(index, 'TagButtonColor', 'rgba(255, 226, 99, 1)') as string,
    titleFontSize: value(index, 'TitleFontSize', 24),
    titleFontFamily: value(index, 'TitleFontFamily', 'Douyin Sans') as string,
    titleLetterSpacing: value(index, 'TitleLetterSpacing', 0),
    titleColor: value(index, 'TitleColor', 'rgba(255, 255, 255, 1)') as string,
    amountFontSize: value(index, 'AmountFontSize', 63),
    amountFontFamily: value(index, 'AmountFontFamily', 'Douyin Number ABC') as string,
    amountLetterSpacing: value(index, 'AmountLetterSpacing', -2.99),
    amountColor: value(index, 'AmountColor', 'rgba(61, 61, 61, 1)') as string,
    unitFontSize: value(index, 'UnitFontSize', 24),
    unitFontFamily: value(index, 'UnitFontFamily', 'Source Han Sans CN') as string,
    unitLetterSpacing: value(index, 'UnitLetterSpacing', 0),
    unitColor: value(index, 'UnitColor', 'rgba(61, 61, 61, 1)') as string,
    tagFontSize: value(index, 'TagFontSize', 22),
    tagFontFamily: value(index, 'TagFontFamily', 'Source Han Sans CN') as string,
    tagLetterSpacing: value(index, 'TagLetterSpacing', 0),
    tagColor: value(index, 'TagColor', 'rgba(97, 50, 24, 1)') as string,
  })

  const totalWidth = 580
  const couponWidth = 193.84
  const couponHeight = 196.1
  const gapValue = Math.max(0, toNumber(gap))
  const slotWidth = (totalWidth - gapValue * 2) / 3
  const scale = slotWidth / couponWidth
  const scaledHeight = couponHeight * scale
  const style = createCssVars({
    tripleSingleCouponGap: toCssPx(gapValue),
    tripleSingleCouponSlotWidth: `${slotWidth}px`,
    tripleSingleCouponScale: scale,
    tripleSingleCouponHeight: `${scaledHeight}px`,
  })

  return (
    <div className={`${styles.page} ${className || ''}`} style={style}>
      <div className={styles.couponSlot}>
        <div className={styles.couponInner}>
          <SingleCoupon {...couponProps(1)} />
        </div>
      </div>
      <div className={styles.couponSlot}>
        <div className={styles.couponInner}>
          <SingleCoupon {...couponProps(2)} />
        </div>
      </div>
      <div className={styles.couponSlot}>
        <div className={styles.couponInner}>
          <SingleCoupon {...couponProps(3)} />
        </div>
      </div>
    </div>
  )
}
