import { useId } from 'react'
import { createCssVars, toCssPx } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface SingleCouponProps {
  title?: string
  amount?: string
  unit?: string
  tag?: string
  radius?: number
  bgGradientStart?: string
  bgGradientEnd?: string
  topGradientStart?: string
  topGradientEnd?: string
  dividerColor?: string
  tagButtonColor?: string
  titleFontSize?: number | string
  titleFontFamily?: string
  titleLetterSpacing?: number | string
  titleColor?: string
  amountFontSize?: number | string
  amountFontFamily?: string
  amountLetterSpacing?: number | string
  amountColor?: string
  unitFontSize?: number | string
  unitFontFamily?: string
  unitLetterSpacing?: number | string
  unitColor?: string
  tagFontSize?: number | string
  tagFontFamily?: string
  tagLetterSpacing?: number | string
  tagColor?: string
  contentScaleX?: number | string
  className?: string
}

export default function SingleCoupon({
  title = 'DOU+满赠券',
  amount = '800',
  unit = '元',
  tag = '叠加',
  radius = 40,
  bgGradientStart = '#FFF3F3',
  bgGradientEnd = '#FFFEFE',
  topGradientStart = '#FF57AF',
  topGradientEnd = '#FF387B',
  dividerColor = '#FFD2D2',
  tagButtonColor = 'rgba(255, 226, 99, 1)',
  titleFontSize = 24,
  titleFontFamily = 'Douyin Sans',
  titleLetterSpacing = 0,
  titleColor = 'rgba(255, 255, 255, 1)',
  amountFontSize = 63,
  amountFontFamily = 'Douyin Number ABC',
  amountLetterSpacing = -2.99,
  amountColor = 'rgba(61, 61, 61, 1)',
  unitFontSize = 24,
  unitFontFamily = 'Source Han Sans CN',
  unitLetterSpacing = 0,
  unitColor = 'rgba(61, 61, 61, 1)',
  tagFontSize = 22,
  tagFontFamily = 'Source Han Sans CN',
  tagLetterSpacing = 0,
  tagColor = 'rgba(97, 50, 24, 1)',
  contentScaleX = 1,
  className,
}: SingleCouponProps) {
  const normalizedRadius = Math.min(100, Math.max(0, Number(radius) || 0))
  const idPrefix = useId().replace(/:/g, '')
  const bgGradientId = `sc_bg_grad_${idPrefix}`
  const maskId = `sc_mask_${idPrefix}`
  const maskGradientId = `sc_mask_grad_${idPrefix}`
  const topGradientId = `sc_top_grad_${idPrefix}`
  const radiusStyle = createCssVars({
    singleCouponCouponRadius: `${normalizedRadius}px`,
    singleCouponCouponBgStart: bgGradientStart,
    singleCouponCouponBgEnd: bgGradientEnd,
    singleCouponCouponTopStart: topGradientStart,
    singleCouponCouponTopEnd: topGradientEnd,
    singleCouponSvgDividerColor: dividerColor,
    singleCouponTagButtonColor: tagButtonColor,
    singleCouponTitleFontSize: toCssPx(titleFontSize),
    singleCouponTitleFontFamily: titleFontFamily,
    singleCouponTitleLetterSpacing: toCssPx(titleLetterSpacing),
    singleCouponTitleColor: titleColor,
    singleCouponAmountFontSize: toCssPx(amountFontSize),
    singleCouponAmountFontFamily: amountFontFamily,
    singleCouponAmountLetterSpacing: toCssPx(amountLetterSpacing),
    singleCouponAmountColor: amountColor,
    singleCouponUnitFontSize: toCssPx(unitFontSize),
    singleCouponUnitFontFamily: unitFontFamily,
    singleCouponUnitLetterSpacing: toCssPx(unitLetterSpacing),
    singleCouponUnitColor: unitColor,
    singleCouponTagFontSize: toCssPx(tagFontSize),
    singleCouponTagFontFamily: tagFontFamily,
    singleCouponTagLetterSpacing: toCssPx(tagLetterSpacing),
    singleCouponTagColor: tagColor,
    singleCouponCouponContentScaleX: String(Number(contentScaleX) || 1),
  })

  return (
    <div className={`${styles.page} ${className || ''}`} style={radiusStyle}>
      <div className={styles.wrap}>
        <div className={`${styles.imageFrame} ${styles.imageFrame1}`}>
          <svg width="178" height="166" viewBox="0 0 178 166" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.image}>
            <path d="M137.477 0C159.857 6.44632e-05 178 18.143 178 40.5234V60.0146C177.835 60.005 177.668 60 177.5 60C172.806 60 169 63.8056 169 68.5C169 73.1944 172.806 77 177.5 77C177.668 77 177.835 76.994 178 76.9844V125.477C178 147.857 159.857 166 137.477 166H40.5234C18.143 166 1.62858e-05 147.857 0 125.477V76.9844C4.46161 76.7255 8 73.0265 8 68.5C8 63.9735 4.46164 60.2735 0 60.0146V40.5234C1.49488e-05 18.143 18.143 0 40.5234 0H137.477Z" fill={`url(#${bgGradientId})`}/>
            <defs>
              <linearGradient id={bgGradientId} x1="60.5" y1="-35.5" x2="209.895" y2="74.9716" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--single-coupon-coupon-bg-start)"/>
                <stop offset="1" stopColor="var(--single-coupon-coupon-bg-end)"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className={`${styles.imageFrame} ${styles.imageFrame2}`}>
          <svg width="194" height="173" viewBox="0 0 194 173" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.image1}>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="5" y="6" width="179" height="167">
              <path d="M143.312 6.89844C165.693 6.89851 183.836 25.0414 183.836 47.4219V67.0146C183.67 67.005 183.504 67 183.336 67C178.642 67 174.836 70.8056 174.836 75.5C174.836 80.1944 178.642 84 183.336 84C183.504 84 183.67 83.994 183.836 83.9844V132.375C183.836 154.755 165.693 172.898 143.312 172.898H46.3594C23.9789 172.898 5.83595 154.755 5.83594 132.375V83.9844C10.2975 83.7255 13.8359 80.0265 13.8359 75.5C13.8359 70.9735 10.2976 67.2735 5.83594 67.0146V47.4219C5.83595 25.0414 23.9789 6.89844 46.3594 6.89844H143.312Z" fill={`url(#${maskGradientId})`}/>
            </mask>
            <g mask={`url(#${maskId})`}>
              <rect x="-4.16406" width="198" height="74" fill={`url(#${topGradientId})`}/>
            </g>
            <defs>
              <linearGradient id={maskGradientId} x1="66.3359" y1="-28.5" x2="215.731" y2="81.9716" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--single-coupon-coupon-bg-start)"/>
                <stop offset="1" stopColor="var(--single-coupon-coupon-bg-end)"/>
              </linearGradient>
              <linearGradient id={topGradientId} x1="94.8369" y1="-12.8301" x2="94.8369" y2="90.6699" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--single-coupon-coupon-top-start)"/>
                <stop offset="1" stopColor="var(--single-coupon-coupon-top-end)"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <svg width="151" height="4" viewBox="0 0 151 4" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.image2}>
          <path d="M9.30113 0C10.1625 0 10.8608 0.815152 10.8608 1.82069C10.8608 2.82623 10.1625 3.64139 9.30113 3.64139H1.55963C0.698373 3.64125 0 2.82615 0 1.82069C0 0.815238 0.698373 0.000139619 1.55963 0H9.30113ZM24.7841 0C25.6455 0 26.3438 0.815152 26.3438 1.82069C26.3438 2.82623 25.6455 3.64139 24.7841 3.64139H17.0426C16.1813 3.64131 15.483 2.82619 15.483 1.82069C15.483 0.815195 16.1813 7.05635e-05 17.0426 0H24.7841ZM40.2671 0C41.1285 3.60334e-05 41.8268 0.815174 41.8268 1.82069C41.8268 2.82621 41.1285 3.64135 40.2671 3.64139H32.5256C31.6643 3.64139 30.966 2.82623 30.966 1.82069C30.966 0.815152 31.6643 0 32.5256 0H40.2671ZM55.7501 0C56.6114 0.000108095 57.3098 0.815218 57.3098 1.82069C57.3098 2.82617 56.6114 3.64128 55.7501 3.64139H48.0086C47.1473 3.64139 46.449 2.82623 46.449 1.82069C46.449 0.815152 47.1473 0 48.0086 0H55.7501ZM71.2331 0C72.0944 0.000180146 72.7928 0.815263 72.7928 1.82069C72.7928 2.82612 72.0944 3.6412 71.2331 3.64139H63.4916C62.6303 3.64139 61.932 2.82623 61.932 1.82069C61.932 0.815152 62.6303 0 63.4916 0H71.2331ZM86.7155 0C87.5769 0 88.2751 0.815152 88.2751 1.82069C88.2751 2.82623 87.5769 3.64139 86.7155 3.64139H78.974C78.1128 3.64122 77.4144 2.82613 77.4144 1.82069C77.4144 0.815256 78.1128 0.000168138 78.974 0H86.7155ZM102.199 0C103.06 0 103.758 0.815152 103.758 1.82069C103.758 2.82623 103.06 3.64139 102.199 3.64139H94.457C93.5957 3.64129 92.8974 2.82617 92.8974 1.82069C92.8974 0.815211 93.5957 9.60839e-05 94.457 0H102.199ZM117.682 0C118.543 1.20115e-05 119.241 0.815159 119.241 1.82069C119.241 2.82623 118.543 3.64137 117.682 3.64139H109.94C109.079 3.64136 108.38 2.82622 108.38 1.82069C108.38 0.815167 109.079 2.40225e-05 109.94 0H117.682ZM133.165 0C134.026 8.40752e-05 134.724 0.815204 134.724 1.82069C134.724 2.82618 134.026 3.6413 133.165 3.64139H125.423C124.562 3.64139 123.863 2.82623 123.863 1.82069C123.863 0.815152 124.562 0 125.423 0H133.165ZM148.648 0C149.509 0.000156131 150.207 0.815248 150.207 1.82069C150.207 2.82614 149.509 3.64123 148.648 3.64139H140.906C140.045 3.64139 139.346 2.82623 139.346 1.82069C139.346 0.815152 140.045 0 140.906 0H148.648Z" fill="var(--single-coupon-svg-divider-color)"/>
        </svg>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text}>{title}</div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.text1}>
          <span className={styles.text1__seg0}>{amount}</span>
        </div>
        <div className={styles.text2}>
          <div className={styles.text2__listwrap}>
            <span className={styles.text2__seg0}>{unit}</span>
          </div>
        </div>
      </div>
      <div className={styles.wrap3}>
        <div className={styles.text3}>{tag}</div>
      </div>
    </div>
  )
}
