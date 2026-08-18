import React from 'react'
import { createCssVars } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface OrangeCouponProps {
  amount?: string
  unit?: string
  condition?: string
  title?: string
  subtitle?: string
  svgColor?: string
  borderRadius?: number
  amountFontFamily?: string
  amountFontSize?: string
  amountColor?: string
  amountLetterSpacing?: string
  unitFontFamily?: string
  unitFontSize?: string
  unitColor?: string
  conditionFontFamily?: string
  conditionFontSize?: string
  conditionColor?: string
  titleFontFamily?: string
  titleFontSize?: string
  titleColor?: string
  titleLetterSpacing?: string
  subtitleFontFamily?: string
  subtitleFontSize?: string
  subtitleColor?: string
  className?: string
}

export default function OrangeCoupon({
  amount = '200',
  unit = '元',
  condition = '满30元赠',
  title = 'DOU+优惠券',
  subtitle = '共计20名',
  svgColor,
  borderRadius = 50,
  amountFontFamily = 'Douyin Number ABC',
  amountFontSize = '78px',
  amountColor = 'rgba(72, 49, 49, 1)',
  amountLetterSpacing = '-3.68px',
  unitFontFamily = 'OPPOSans',
  unitFontSize = '32px',
  unitColor = 'rgba(72, 49, 49, 1)',
  conditionFontFamily = 'Source Han Sans CN',
  conditionFontSize = '32px',
  conditionColor = 'rgba(72, 49, 49, 1)',
  titleFontFamily = 'Source Han Sans CN',
  titleFontSize = '36px',
  titleColor = 'rgba(215, 103, 103, 1)',
  titleLetterSpacing = '0px',
  subtitleFontFamily = 'Source Han Sans CN',
  subtitleFontSize = '22px',
  subtitleColor = 'rgba(200, 104, 104, 1)',
  className,
}: OrangeCouponProps) {
  const mainColor = svgColor || '#FFBABA'
  
  const hex = mainColor.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  
  const lighten = (factor: number) => {
    const nr = Math.min(255, Math.round(r + (255 - r) * factor))
    const ng = Math.min(255, Math.round(g + (255 - g) * factor))
    const nb = Math.min(255, Math.round(b + (255 - b) * factor))
    return `rgb(${nr}, ${ng}, ${nb})`
  }

  const mainColorLight = lighten(0.45)
  const dotColor = lighten(0.2)
  const radialColor = lighten(0.5)

  const colorSuffix = hex

  const couponPath = 'M554 11.2V216.2H317.33C317.009 216.081 316.654 216 316.265 215.966C310.396 215.456 304.737 213.543 299.763 210.389L291.641 205.238C289.679 203.994 287.176 203.994 285.214 205.238L277.092 210.389C272.117 213.543 266.457 215.456 260.589 215.966C260.2 216 259.845 216.081 259.523 216.2H0V11.2H260.018C260.199 11.2408 260.39 11.2708 260.589 11.2881C266.457 11.7977 272.117 13.7105 277.092 16.8652L285.213 22.0156C287.175 23.2597 289.679 23.2597 291.641 22.0156L299.762 16.8652C304.736 13.7105 310.396 11.7977 316.265 11.2881C316.464 11.2708 316.654 11.2408 316.836 11.2002H554Z'

  const textStyle = createCssVars({
    orangeCouponAmountFontFamily: amountFontFamily,
    orangeCouponAmountFontSize: amountFontSize,
    orangeCouponAmountColor: amountColor,
    orangeCouponAmountLetterSpacing: amountLetterSpacing,
    orangeCouponUnitFontFamily: unitFontFamily,
    orangeCouponUnitFontSize: unitFontSize,
    orangeCouponUnitColor: unitColor,
    orangeCouponConditionFontFamily: conditionFontFamily,
    orangeCouponConditionFontSize: conditionFontSize,
    orangeCouponConditionColor: conditionColor,
    orangeCouponTitleFontFamily: titleFontFamily,
    orangeCouponTitleFontSize: titleFontSize,
    orangeCouponTitleColor: titleColor,
    orangeCouponTitleLetterSpacing: titleLetterSpacing,
    orangeCouponSubtitleFontFamily: subtitleFontFamily,
    orangeCouponSubtitleFontSize: subtitleFontSize,
    orangeCouponSubtitleColor: subtitleColor,
    orangeCouponSvgWrapBorderRadius: `${borderRadius}px`,
    orangeCouponSvgMainColor: mainColor,
    orangeCouponSvgMainColorLight: mainColorLight,
    orangeCouponSvgRadialColor: radialColor,
    orangeCouponSvgBackgroundStart: '#FFE9E9',
    orangeCouponSvgBackgroundEnd: '#FFF5F5',
    orangeCouponSvgDotColor: dotColor,
  })

  return (
    <div 
      className={`${styles.page} ${className || ''}`}
      style={textStyle}
    >
      <div className={styles.svgWrap}>
      <svg
        key={mainColor}
        className={styles.image}
        viewBox="0 11.2 554 205"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`paint0_linear_${colorSuffix}`} x1="277" y1="-4.79981" x2="318.236" y2="163.671" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--orange-coupon-svg-main-color)" />
            <stop offset="1" stopColor="var(--orange-coupon-svg-main-color-light)" />
          </linearGradient>
          <linearGradient id={`paint1_linear_${colorSuffix}`} x1="277" y1="11.2002" x2="382.834" y2="246.673" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--orange-coupon-svg-background-start)" />
            <stop offset="1" stopColor="var(--orange-coupon-svg-background-end)" />
          </linearGradient>
          <radialGradient id={`paint2_radial_${colorSuffix}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(463.644 162.818) rotate(-73.4429) scale(263.359 263.359)">
            <stop stopColor="var(--orange-coupon-svg-radial-color)" />
            <stop offset="1" stopColor="var(--orange-coupon-svg-radial-color)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d={couponPath}
          fill={`url(#paint0_linear_${colorSuffix})`}
        />
        <mask id={`mask0_${colorSuffix}`} style={{ maskType: 'alpha' as const }} maskUnits="userSpaceOnUse" x="0" y="11" width="554" height="206">
          <rect y="11.2002" width="554" height="205" rx="0" fill={`url(#paint1_linear_${colorSuffix})`} />
        </mask>
        <g mask={`url(#mask0_${colorSuffix})`}>
          <g opacity="0.6" style={{ mixBlendMode: 'multiply' as const }}>
            <path
              d="M288.642 56.5013C288.642 57.3627 287.826 58.061 286.821 58.061C285.815 58.061 285 57.3627 285 56.5013L285 48.7598C285 47.8986 285.815 47.2002 286.821 47.2002C287.826 47.2002 288.641 47.8986 288.642 48.7598L288.642 56.5013ZM288.642 71.9843C288.642 72.8457 287.826 73.544 286.821 73.544C285.815 73.544 285 72.8457 285 71.9843L285 64.2428C285 63.3815 285.815 62.6832 286.821 62.6832C287.826 62.6832 288.642 63.3815 288.642 64.2428L288.642 71.9843ZM288.642 87.4673C288.642 88.3287 287.826 89.027 286.821 89.027C285.815 89.027 285 88.3287 285 87.4673L285 79.7258C285 78.8645 285.815 78.1662 286.821 78.1662C287.826 78.1662 288.642 78.8645 288.642 79.7258L288.642 87.4673ZM288.642 102.95C288.641 103.812 287.826 104.51 286.821 104.51C285.815 104.51 285 103.812 285 102.95L285 95.2088C285 94.3475 285.815 93.6492 286.821 93.6492C287.826 93.6492 288.642 94.3475 288.642 95.2088L288.642 102.95ZM288.642 118.433C288.641 119.295 287.826 119.993 286.821 119.993C285.815 119.993 285 119.295 285 118.433L285 110.692C285 109.83 285.815 109.132 286.821 109.132C287.826 109.132 288.642 109.83 288.642 110.692L288.642 118.433ZM288.642 133.916C288.642 134.777 287.826 135.475 286.821 135.475C285.815 135.475 285 134.777 285 133.916L285 126.174C285 125.313 285.815 124.615 286.821 124.615C287.826 124.615 288.641 125.313 288.642 126.174L288.642 133.916ZM288.642 149.399C288.642 150.26 287.826 150.958 286.821 150.958C285.815 150.958 285 150.26 285 149.399L285 141.657C285 140.796 285.815 140.098 286.821 140.098C287.826 140.098 288.642 140.796 288.642 141.657L288.642 149.399ZM288.642 164.882C288.642 165.743 287.826 166.441 286.821 166.441C285.815 166.441 285 165.743 285 164.882L285 157.14C285 156.279 285.815 155.581 286.821 155.581C287.826 155.581 288.642 156.279 288.642 157.14L288.642 164.882ZM288.642 180.365C288.642 181.226 287.826 181.924 286.821 181.924C285.815 181.924 285 181.226 285 180.365L285 172.623C285 171.762 285.815 171.064 286.821 171.064C287.826 171.064 288.642 171.762 288.642 172.623L288.642 180.365Z"
              fill="var(--orange-coupon-svg-dot-color)"
            />
          </g>
          <g opacity="0.5" style={{ mixBlendMode: 'multiply' as const }}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M511.608 13.2144C514.78 19.9359 515.497 29.3 513.523 37.3832C519.089 39.9885 539.645 51.3672 537.895 76.2697C537.316 84.5767 534.756 89.9241 532.275 95.0911C530.683 98.2301 529.339 101.476 528.255 104.803C526.712 109.798 526.244 115.146 525.83 119.87L525.827 119.9C525.61 122.419 525.399 124.8 525.057 126.964C520.083 157.997 487.434 182.247 450.705 182.247C426.517 182.247 404.238 172.833 389.585 156.418C374.938 141.47 371.115 118.564 373.793 103.641C376.004 91.3355 381.202 83.7435 385.374 77.6562C388.433 73.2416 391.045 69.4363 391.953 64.8661C394.975 49.6715 405.891 47.7118 407.674 47.3918C407.801 47.369 407.882 47.3545 407.91 47.3442C407.265 51.1993 408.495 53.5559 411.042 54.0533C411.455 54.1384 411.876 54.1821 412.298 54.1838C415.43 54.1838 417.023 51.4978 417.306 50.1982L417.556 49.0106C418.062 46.0682 418.946 43.1951 420.188 40.4548C427.294 25.6004 439.671 16.5472 458.028 12.7667C462.687 11.8154 466.437 11.5729 471.188 11.2683C473.09 11.1439 475.175 11.007 477.577 10.8081C482.782 10.3604 486.914 8.53233 488.105 5.21199C488.575 3.89684 488.749 2.50323 488.616 1.12075C488.482 -0.261738 488.043 -1.60244 487.328 -2.8152C486.722 -3.91918 485.936 -4.92635 484.999 -5.7998L489.388 -4.76762C490.02 -4.62461 504.903 -0.974776 511.608 13.2144ZM514 87.3103C516.12 82.9197 517.524 80.0113 517.866 75.1318C518.385 67.7264 515.628 62.4909 512.22 58.9405C511.071 61.082 509.31 62.8762 507.136 64.1193C504.962 65.3624 502.463 66.0046 499.922 65.9729C492.48 65.9729 486.427 60.6069 486.427 54.016C486.427 48.9751 488.158 45.9976 489.939 42.9357C490.37 42.1943 490.804 41.448 491.217 40.6662C491.266 40.5721 491.315 40.4782 491.364 40.3845C492.664 37.8923 493.873 35.5764 494.329 33.8266C495.099 30.7451 495.137 27.541 494.441 24.4439C489.808 26.8305 484.693 28.265 479.433 28.6534C477.076 28.8442 475.015 28.9813 473.087 29.1096L472.655 29.1384C469.282 29.3107 465.922 29.6741 462.595 30.2265C444.046 33.2919 439.118 45.4167 437.085 53.5807C434.282 64.692 425.241 73.6768 410.765 70.9099C409.703 75.3639 407.152 79.147 404.316 83.3532C399.459 90.5561 393.766 99 393.276 114.18C392.368 142.297 418.529 164.346 450.771 164.346C463.551 164.317 475.957 160.263 486.026 152.824C495.77 145.624 502.442 135.538 505.331 123.656C505.739 121.949 506.051 119.014 506.387 115.858L506.403 115.703L506.414 115.602C506.938 110.647 507.53 105.04 508.759 100.519C510.06 95.9775 511.811 91.5619 513.99 87.3313L514 87.3103ZM460.117 104.294H482.397H484.252L484.055 106.035L482.515 119.876L482.357 121.288H480.857H458.222L455.551 145.363L455.393 146.775H453.893H438.246H436.39L436.588 145.034L439.226 121.288H417.44H415.585L415.782 119.547L417.322 105.706L417.48 104.294H418.98H441.115L443.74 80.6976L443.898 79.2861H445.398H461.045H462.901L462.703 81.0272L460.117 104.294Z"
              fill={`url(#paint2_radial_${colorSuffix})`}
            />
          </g>
        </g>
      </svg>
      </div>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}>
              <div className={styles.text}>
                <span className={styles.text__seg0}>{amount}</span>
              </div>
            </div>
            <div className={styles.main1}>
              <div className={styles.text1}>{unit}</div>
            </div>
          </div>
        </div>
        <div className={styles.container1}>
          <div className={styles.text2}>{condition}</div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container2}>
          <div className={styles.text3}>{title}</div>
        </div>
        <div className={styles.container3}>
          <div className={styles.text4}>{subtitle}</div>
        </div>
      </div>
    </div>
  )
}
