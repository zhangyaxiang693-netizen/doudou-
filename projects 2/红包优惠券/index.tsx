import React from 'react'
import { createCssVars, toCssLength } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface RedPacketCouponProps {
  prefix?: string
  title?: string
  accountInfo?: string
  totalLabel?: string
  amount?: string
  unit?: string
  buttonText?: string
  bgColor?: string
  cardColor?: string
  decorStartColor?: string
  decorEndColor?: string
  topStartColor?: string
  topEndColor?: string
  dotColor?: string
  btnBgColor?: string
  btnTextColor?: string
  btnBorderRadius?: string | number
  borderRadius?: string | number
  prefixFontFamily?: string
  prefixFontSize?: string | number
  prefixColor?: string
  prefixLetterSpacing?: string | number
  titleFontFamily?: string
  titleFontSize?: string | number
  titleColor?: string
  titleLetterSpacing?: string | number
  accountInfoFontFamily?: string
  accountInfoFontSize?: string | number
  accountInfoColor?: string
  accountInfoLetterSpacing?: string | number
  totalLabelFontFamily?: string
  totalLabelFontSize?: string | number
  totalLabelColor?: string
  totalLabelLetterSpacing?: string | number
  amountFontFamily?: string
  amountFontSize?: string | number
  amountColor?: string
  amountLetterSpacing?: string | number
  unitFontFamily?: string
  unitFontSize?: string | number
  unitColor?: string
  unitLetterSpacing?: string | number
  buttonFontFamily?: string
  buttonFontSize?: string | number
  buttonLetterSpacing?: string | number
  className?: string
}

export default function RedPacketCoupon({
  prefix = 'DOU+',
  title = '优惠券',
  accountInfo = '账户内共有 2 张券',
  totalLabel = '总计',
  amount = '800',
  unit = '元',
  buttonText = '立即使用',
  bgColor = '#FF4693',
  cardColor = '#FFFFFF',
  decorStartColor = '#FF3163',
  decorEndColor = '#FFD2DD',
  topStartColor = '#FF277F',
  topEndColor = '#FF4F99',
  dotColor = '#FFCFD7',
  btnBgColor = '#FFDBB2',
  btnTextColor = '#FF2C5C',
  btnBorderRadius = 100,
  borderRadius = 60,
  prefixFontFamily = '"Douyin Sans"',
  prefixFontSize = 44,
  prefixColor = '#3D3D3D',
  prefixLetterSpacing = -3.12,
  titleFontFamily = '"Source Han Sans CN"',
  titleFontSize = 40,
  titleColor = '#3D3D3D',
  titleLetterSpacing = 0,
  accountInfoFontFamily = '"Source Han Sans CN"',
  accountInfoFontSize = 24,
  accountInfoColor = '#3D3D3D',
  accountInfoLetterSpacing = 0,
  totalLabelFontFamily = '"Source Han Sans CN"',
  totalLabelFontSize = 22,
  totalLabelColor = '#FF1372',
  totalLabelLetterSpacing = -1,
  amountFontFamily = '"Douyin Number ABC"',
  amountFontSize = 76,
  amountColor = '#FF1372',
  amountLetterSpacing = -3.58,
  unitFontFamily = '"Source Han Sans CN"',
  unitFontSize = 26,
  unitColor = '#3D3D3D',
  unitLetterSpacing = 0,
  buttonFontFamily = '"Source Han Sans CN"',
  buttonFontSize = 40,
  buttonLetterSpacing = '0.04em',
  className,
}: RedPacketCouponProps) {
  const totalChars = totalLabel.split('')
  const colorSuffix = bgColor.replace('#', '')
  const radius = typeof borderRadius === 'number' ? `${borderRadius}px` : isNaN(Number(borderRadius)) ? borderRadius : `${borderRadius}px`
  const style = createCssVars({
    redPacketCouponTextFontFamily: prefixFontFamily,
    redPacketCouponTextFontSize: toCssLength(prefixFontSize),
    redPacketCouponTextColor: prefixColor,
    redPacketCouponTextLetterSpacing: toCssLength(prefixLetterSpacing),
    redPacketCouponTextSeg0LetterSpacing: toCssLength(prefixLetterSpacing),
    redPacketCouponText1FontFamily: titleFontFamily,
    redPacketCouponText1FontSize: toCssLength(titleFontSize),
    redPacketCouponText1Color: titleColor,
    redPacketCouponText1LetterSpacing: toCssLength(titleLetterSpacing),
    redPacketCouponText2FontFamily: accountInfoFontFamily,
    redPacketCouponText2FontSize: toCssLength(accountInfoFontSize),
    redPacketCouponText2Color: accountInfoColor,
    redPacketCouponText2LetterSpacing: toCssLength(accountInfoLetterSpacing),
    redPacketCouponText3FontFamily: totalLabelFontFamily,
    redPacketCouponText3FontSize: toCssLength(totalLabelFontSize),
    redPacketCouponText3Color: totalLabelColor,
    redPacketCouponText3LetterSpacing: toCssLength(totalLabelLetterSpacing),
    redPacketCouponText4FontFamily: amountFontFamily,
    redPacketCouponText4FontSize: toCssLength(amountFontSize),
    redPacketCouponText4Color: amountColor,
    redPacketCouponText4LetterSpacing: toCssLength(amountLetterSpacing),
    redPacketCouponText4Seg0LetterSpacing: toCssLength(amountLetterSpacing),
    redPacketCouponText5FontFamily: unitFontFamily,
    redPacketCouponText5FontSize: toCssLength(unitFontSize),
    redPacketCouponText5Color: unitColor,
    redPacketCouponText5LetterSpacing: toCssLength(unitLetterSpacing),
    redPacketCouponWrap3Background: btnBgColor,
    redPacketCouponWrap3BorderRadius: toCssLength(btnBorderRadius),
    redPacketCouponText6FontFamily: buttonFontFamily,
    redPacketCouponText6FontSize: toCssLength(buttonFontSize),
    redPacketCouponText6Color: btnTextColor,
    redPacketCouponText6LetterSpacing: typeof buttonLetterSpacing === 'number' ? `${buttonLetterSpacing}px` : buttonLetterSpacing,
    redPacketCouponSvgBackgroundColor: bgColor,
    redPacketCouponSvgCardColor: cardColor,
    redPacketCouponSvgDecorStartColor: decorStartColor,
    redPacketCouponSvgDecorEndColor: decorEndColor,
    redPacketCouponSvgTopStartColor: topStartColor,
    redPacketCouponSvgTopEndColor: topEndColor,
    redPacketCouponSvgDotColor: dotColor,
  })

  return (
    <div className={`${styles.page} ${className || ''}`} style={style}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 700, height: 343, borderRadius: radius, overflow: 'hidden' }}>
            <svg
              key={colorSuffix}
              style={{ width: '100%', height: '100%', display: 'block' }}
              viewBox="0 0 700 343"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="700" height="343" fill="var(--red-packet-coupon-svg-background-color)" />
            </svg>
          </div>
          <div className={styles.content}>
            <div style={{ width: 674, height: 224.12, borderRadius: radius, overflow: 'hidden' }}>
              <svg
                style={{ width: '100%', height: '100%', display: 'block' }}
                viewBox="0 0 674 224.121"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0H303.035C304.849 0 306.339 1.36181 306.997 3.05327C308.937 8.04188 313.663 11.5645 319.186 11.5645C324.708 11.5644 329.434 8.04185 331.374 3.05328C332.032 1.36182 333.522 0 335.337 0H674V224.121H0Z"
                  fill="var(--red-packet-coupon-svg-card-color)"
                />
              </svg>
            </div>
          </div>
          <svg
            className={styles.image2}
            viewBox="0 0 674 224"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id={`paint_decor_${colorSuffix}`}
                x1="337"
                y1="0"
                x2="337"
                y2="224"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="var(--red-packet-coupon-svg-decor-start-color)" />
                <stop offset="1" stopColor="var(--red-packet-coupon-svg-decor-end-color)" />
              </linearGradient>
            </defs>
            <mask
              id={`mask_decor_${colorSuffix}`}
              style={{ maskType: 'alpha' as const }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="674"
              height="224"
            >
              <rect width="673.557" height="223.558" rx="50" fill="var(--red-packet-coupon-svg-background-color, white)" />
            </mask>
            <g mask={`url(#mask_decor_${colorSuffix})`}>
              <g opacity="0.06" style={{ mixBlendMode: 'multiply' as const }}>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M624.957 -10.7742C629.909 0.0683632 631.029 15.1739 627.947 28.213C636.639 32.4156 668.738 50.7707 666.005 90.9414C665.101 104.342 661.104 112.968 657.23 121.303C654.743 126.366 652.645 131.603 650.952 136.97C648.543 145.027 647.811 153.653 647.165 161.274L647.161 161.323C646.822 165.385 646.493 169.227 645.959 172.717C638.191 222.777 587.207 261.895 529.853 261.895C492.082 261.895 457.292 246.709 434.41 220.23C411.538 196.117 405.568 159.166 409.75 135.094C413.202 115.244 421.32 102.998 427.834 93.178C432.612 86.0567 436.691 79.9183 438.109 72.5461C442.827 48.0354 459.873 44.8743 462.657 44.3581C462.855 44.3212 462.981 44.2979 463.025 44.2812C462.018 50.4999 463.94 54.3013 467.916 55.1037C468.561 55.241 469.219 55.3115 469.879 55.3143C474.769 55.3143 477.256 50.9814 477.698 48.8851L478.088 46.9693C478.879 42.2229 480.259 37.5882 482.198 33.1678C493.295 9.20587 512.622 -5.39803 541.289 -11.4963C548.563 -13.031 554.42 -13.422 561.838 -13.9135C564.808 -14.1141 568.065 -14.3349 571.815 -14.6559C579.943 -15.378 586.395 -18.3269 588.255 -23.683C588.99 -25.8045 589.261 -28.0525 589.052 -30.2826C588.844 -32.5127 588.159 -34.6754 587.043 -36.6318C586.096 -38.4126 584.869 -40.0373 583.405 -41.4463L590.259 -39.7813C591.245 -39.5506 614.487 -33.663 624.957 -10.7742ZM628.692 108.751C632.002 101.669 634.195 96.977 634.728 89.1059C635.54 77.16 631.235 68.7146 625.912 62.9874C624.118 66.4419 621.368 69.3361 617.973 71.3413C614.579 73.3466 610.676 74.3825 606.709 74.3315C595.088 74.3315 585.635 65.6755 585.635 55.0436C585.635 46.9121 588.339 42.109 591.119 37.1697C591.792 35.9738 592.47 34.7699 593.115 33.5088C593.192 33.3569 593.268 33.2054 593.345 33.0543C595.375 29.0341 597.262 25.2984 597.975 22.4757C599.176 17.5049 599.236 12.3363 598.15 7.34027C590.915 11.1902 582.928 13.5042 574.713 14.1307C571.033 14.4386 567.816 14.6597 564.805 14.8667L564.13 14.9131C558.862 15.1911 553.616 15.7772 548.419 16.6683C519.455 21.6132 511.759 41.1719 508.584 54.3414C504.207 72.2653 490.089 86.7588 467.484 82.2954C465.825 89.4803 461.842 95.5828 457.414 102.368C449.83 113.987 440.939 127.608 440.174 152.095C438.756 197.451 479.609 233.018 529.956 233.018C549.913 232.972 569.285 226.432 585.008 214.432C600.225 202.817 610.644 186.549 615.155 167.381C615.792 164.628 616.279 159.893 616.804 154.802L616.829 154.552L616.846 154.389C617.664 146.395 618.589 137.351 620.508 130.059C622.539 122.732 625.274 115.61 628.676 108.785L628.692 108.751ZM544.552 136.149H579.343H582.24L581.932 138.957L579.528 161.284L579.281 163.561H576.938H541.593L537.421 202.398L537.175 204.675H534.832H510.398H507.501L507.809 201.866L511.929 163.561H477.909H475.012L475.32 160.753L477.724 138.426L477.971 136.149H480.314H514.878L518.978 98.0845L519.224 95.8076H521.567H546.001H548.898L548.59 98.6161L544.552 136.149Z"
                  fill={`url(#paint_decor_${colorSuffix})`}
                />
              </g>
            </g>
          </svg>
          <svg
            className={styles.image3}
            viewBox="0 0 5 183"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.6"
              d="M4.62598 12.6152C4.62598 13.7835 3.59041 14.7306 2.31296 14.7306C1.03552 14.7306 -4.58931e-05 13.7835 -4.5842e-05 12.6152L-4.53831e-05 2.11535C0.00013204 0.947213 1.03563 -1.56939e-07 2.31297 -1.01105e-07C3.5903 -4.5271e-08 4.6258 0.947213 4.62598 2.11535L4.62598 12.6152ZM4.62598 33.615C4.62598 34.7833 3.5904 35.7304 2.31296 35.7304C1.03552 35.7304 -4.6811e-05 34.7833 -4.676e-05 33.615L-4.6301e-05 23.1151C4.33943e-05 21.9469 1.03558 20.9998 2.31296 20.9998C3.59035 20.9998 4.62589 21.9469 4.62598 23.1151L4.62598 33.615ZM4.62597 54.6148C4.62593 55.7831 3.59038 56.7302 2.31296 56.7302C1.03555 56.7302 -1.95227e-06 55.7831 -4.76779e-05 54.6148L-4.72189e-05 44.1149C-4.71679e-05 42.9467 1.03552 41.9996 2.31296 41.9996C3.5904 41.9996 4.62597 42.9467 4.62597 44.1149L4.62597 54.6148ZM4.62597 75.6146C4.62584 76.7828 3.59032 77.73 2.31296 77.73C1.03561 77.73 8.86767e-05 76.7828 -4.85958e-05 75.6146L-4.81369e-05 65.1147C-4.80858e-05 63.9465 1.03552 62.9994 2.31296 62.9994C3.5904 62.9994 4.62597 63.9465 4.62597 65.1147L4.62597 75.6146ZM4.62597 96.6144C4.62574 97.7825 3.59026 98.7298 2.31296 98.7298C1.03566 98.7298 0.000179293 97.7825 -4.95138e-05 96.6144L-4.90548e-05 86.1145C-4.90037e-05 84.9463 1.03552 83.9992 2.31296 83.9992C3.5904 83.9992 4.62597 84.9463 4.62597 86.1145L4.62597 96.6144ZM4.62597 117.613C4.62597 118.782 3.5904 119.729 2.31296 119.729C1.03552 119.729 -5.04827e-05 118.782 -5.04316e-05 117.613L-4.99727e-05 107.114C0.000163681 105.945 1.03565 104.998 2.31296 104.998C3.59027 104.998 4.62576 105.945 4.62597 107.114L4.62597 117.613ZM4.62597 138.613C4.62597 139.781 3.5904 140.729 2.31296 140.729C1.03552 140.729 -5.14006e-05 139.781 -5.13496e-05 138.613L-5.08906e-05 128.113C7.12256e-05 126.945 1.03559 125.998 2.31296 125.998C3.59033 125.998 4.62585 126.945 4.62597 128.113L4.62597 138.613ZM4.62597 159.613C4.62595 160.781 3.59039 161.728 2.31296 161.728C1.03553 161.728 -3.70593e-05 160.781 -5.22675e-05 159.613L-5.18085e-05 149.113C-2.1239e-05 147.945 1.03554 146.998 2.31296 146.998C3.59038 146.998 4.62594 147.945 4.62597 149.113L4.62597 159.613ZM4.62597 180.613C4.62586 181.781 3.59033 182.728 2.31296 182.728C1.03558 182.728 5.35726e-05 181.781 -5.31854e-05 180.613L-5.27265e-05 170.113C-5.26754e-05 168.945 1.03552 167.998 2.31296 167.998C3.5904 167.998 4.62597 168.945 4.62597 170.113L4.62597 180.613Z"
              fill="var(--red-packet-coupon-svg-dot-color)"
            />
          </svg>
          <div className={styles.content1}>
            <div style={{ width: 700, height: 169.21, borderBottomLeftRadius: radius, borderBottomRightRadius: radius, overflow: 'hidden' }}>
              <svg
                style={{ width: '100%', height: '100%', display: 'block' }}
                viewBox="0 0 700 170"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id={`paint_top_${colorSuffix}`}
                    x1="350"
                    y1="170"
                    x2="350"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--red-packet-coupon-svg-top-start-color)" />
                    <stop offset="1" stopColor="var(--red-packet-coupon-svg-top-end-color)" />
                  </linearGradient>
                </defs>
                <path
                  d="M700 0V170H0V0.110352C107.13 10.4191 225.278 16.1338 349.425 16.1338C474.017 16.1338 592.569 10.3789 700 0Z"
                  fill={`url(#paint_top_${colorSuffix})`}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container1}>
          <div className={styles.content2}>
            <div className={styles.text}>
              <span className={styles.text__seg0}>{prefix}</span>
            </div>
            <div className={styles.text1}>{title}</div>
          </div>
          <div className={styles.text2}>
            {accountInfo.replace(/ /g, '\u00a0')}
          </div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.container2}>
          <div className={styles.text3}>
            {totalChars.map((char, index) => (
              <div
                key={index}
                className={index === 0 ? styles.text3__linebreak : undefined}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.text4}>
            <span className={styles.text4__seg0}>{amount}</span>
          </div>
          <div className={styles.text5}>{unit}</div>
        </div>
      </div>
      <div className={styles.wrap3}>
        <div className={styles.text6}>{buttonText}</div>
      </div>
    </div>
  )
}
