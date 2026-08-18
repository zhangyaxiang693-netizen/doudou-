import React from 'react'
import { createCssVars } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface PromoCouponProps {
  currency?: string
  amount?: string
  limitText?: string
  buttonText?: string
  title?: string
  className?: string
  titleFontFamily?: string
  titleFontSize?: string
  titleColor?: string
  symbolFontFamily?: string
  symbolFontSize?: string
  symbolColor?: string
  amountFontFamily?: string
  amountFontSize?: string
  amountColor?: string
  limitFontFamily?: string
  limitFontSize?: string
  limitColor?: string
  buttonFontFamily?: string
  buttonFontSize?: string
  buttonColor?: string
  buttonBgColor?: string
  buttonBorderRadius?: string
  svgColor?: string
  svgBorderRadius?: string
}

function parseColor(color: string) {
  const hexMatch = color.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/)
  if (hexMatch) {
    let hex = hexMatch[1]
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    }
  }
  const rgbaMatch = color.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s]+([\d.]+))?\)/)
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1]),
      g: parseInt(rgbaMatch[2]),
      b: parseInt(rgbaMatch[3]),
      a: rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1,
    }
  }
  return { r: 255, g: 0, b: 0, a: 1 }
}

function mixWithWhite(color: string, amount: number) {
  const { r, g, b, a } = parseColor(color)
  const newR = Math.round(r + (255 - r) * amount)
  const newG = Math.round(g + (255 - g) * amount)
  const newB = Math.round(b + (255 - b) * amount)
  if (a < 1) return `rgba(${newR}, ${newG}, ${newB}, ${a})`
  return `rgb(${newR}, ${newG}, ${newB})`
}

function toRgba(color: string, alpha: number) {
  const { r, g, b } = parseColor(color)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function colorToSuffix(color: string) {
  const { r, g, b } = parseColor(color)
  return `${r}_${g}_${b}`
}

export default function PromoCoupon({
  currency = '￥',
  amount = '800',
  limitText = '限量5000张',
  buttonText = '立即投',
  title = '周年庆惊喜流量补贴券',
  className,
  titleFontFamily = 'MFBenHeiNoncommercial',
  titleFontSize = '36px',
  titleColor = 'rgba(45, 45, 45, 1)',
  symbolFontFamily = 'Source Han Sans CN',
  symbolFontSize = '30.13px',
  symbolColor = 'rgba(255, 39, 90, 1)',
  amountFontFamily = 'Douyin Number ABC',
  amountFontSize = '78px',
  amountColor = 'rgba(255, 39, 90, 1)',
  limitFontFamily = 'Source Han Sans CN',
  limitFontSize = '24px',
  limitColor = 'rgba(61, 61, 61, 1)',
  buttonFontFamily = 'Source Han Sans CN',
  buttonFontSize = '32px',
  buttonColor = 'rgba(255, 255, 255, 1)',
  buttonBgColor = 'rgba(255, 19, 78, 1)',
  buttonBorderRadius = '111px',
  svgColor = '#FF3163',
  svgBorderRadius = '38px',
}: PromoCouponProps) {
  const buttonBgLight = mixWithWhite(buttonBgColor, 0.3)

  const suffix = colorToSuffix(svgColor)
  const maskId = `mask0_promo_${suffix}`
  const grad0Id = `paint0_linear_promo_${suffix}`
  const grad1Id = `paint1_linear_promo_${suffix}`
  const grad2Id = `paint2_linear_promo_${suffix}`

  const bgLight = mixWithWhite(svgColor, 0.88)
  const bgLighter = mixWithWhite(svgColor, 0.95)
  const dotColor = mixWithWhite(svgColor, 0.5)
  const decorColor = svgColor

  return (
    <div
      className={`${styles.page} ${className || ''}`}
      style={createCssVars({
        promoCouponTitleFontFamily: titleFontFamily,
        promoCouponTitleFontSize: titleFontSize,
        promoCouponTitleColor: titleColor,
        promoCouponSymbolFontFamily: symbolFontFamily,
        promoCouponSymbolFontSize: symbolFontSize,
        promoCouponSymbolColor: symbolColor,
        promoCouponAmountFontFamily: amountFontFamily,
        promoCouponAmountFontSize: amountFontSize,
        promoCouponAmountColor: amountColor,
        promoCouponLimitFontFamily: limitFontFamily,
        promoCouponLimitFontSize: limitFontSize,
        promoCouponLimitColor: limitColor,
        promoCouponButtonFontFamily: buttonFontFamily,
        promoCouponButtonFontSize: buttonFontSize,
        promoCouponButtonColor: buttonColor,
        promoCouponButtonBgColor: buttonBgColor,
        promoCouponButtonBgLight: buttonBgLight,
        promoCouponButtonBorderRadius: buttonBorderRadius,
        promoCouponSvgWrapBorderRadius: svgBorderRadius,
        promoCouponSvgColor: svgColor,
        promoCouponSvgBgLight: bgLight,
        promoCouponSvgBgLighter: bgLighter,
        promoCouponSvgBg90: mixWithWhite(svgColor, 0.9),
        promoCouponSvgBg93: mixWithWhite(svgColor, 0.93),
        promoCouponSvgDotColor: dotColor,
        promoCouponSvgDecorColor: decorColor,
        promoCouponSvgDecorLight: mixWithWhite(svgColor, 0.55),
      })}
    >
      <div className={styles.svgWrap}>
      <svg
        key={suffix}
        className={styles.image}
        width="702"
        height="199"
        viewBox="0 0 702 199"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={grad0Id} x1="351" y1="-80.913" x2="411.159" y2="139.123" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--promo-coupon-svg-bg-lighter)" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <linearGradient id={grad1Id} x1="630.443" y1="211.948" x2="92.0733" y2="-149.652" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--promo-coupon-svg-bg-light)" />
            <stop offset="0.349387" stopColor="var(--promo-coupon-svg-bg-90)" />
            <stop offset="0.716803" stopColor="var(--promo-coupon-svg-bg-93)" />
            <stop offset="1" stopColor="var(--promo-coupon-svg-bg-light)" />
          </linearGradient>
          <linearGradient id={grad2Id} x1="632.563" y1="247.524" x2="496" y2="-85.418" gradientUnits="userSpaceOnUse">
            <stop offset="0.131836" stopColor="var(--promo-coupon-svg-decor-color)" />
            <stop offset="1" stopColor="var(--promo-coupon-svg-decor-color)" />
          </linearGradient>
        </defs>
        <mask id={maskId} style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="702" height="199">
          <path
            d="M0 0H422.12C424.656 0 427.097 1.34287 429.622 1.58789C430.62 1.68467 431.576 2.04064 432.394 2.62012L437.262 6.06836C447.027 12.9861 460.096 12.9861 469.861 6.06836L474.729 2.62012C475.548 2.04064 476.503 1.68467 477.501 1.58789C480.026 1.34292 482.467 0 485.003 0H702V198.104H480.503C479.497 198.104 478.502 197.885 477.501 197.788C476.503 197.691 475.548 197.335 474.729 196.756L469.861 193.308C460.096 186.39 447.027 186.39 437.262 193.308L432.394 196.756C431.576 197.335 430.62 197.691 429.622 197.788C428.621 197.885 427.626 198.104 426.62 198.104H0V0Z"
            fill={`url(#${grad0Id})`}
          />
        </mask>
        <g mask={`url(#${maskId})`}>
          <rect width="702" height="199" fill={`url(#${grad1Id})`} />
          <rect width="702" height="199" fill="var(--promo-coupon-svg-background, white)" />
          <g opacity="0.07" style={{ mixBlendMode: 'multiply' }}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M674.026 30.4215C678.099 39.0545 679.021 51.0817 676.485 61.4636C683.635 64.8098 710.036 79.4243 707.788 111.409C707.044 122.078 703.757 128.946 700.571 135.583C698.525 139.614 696.799 143.784 695.407 148.057C693.425 154.472 692.824 161.34 692.292 167.408L692.289 167.447C692.01 170.682 691.739 173.74 691.3 176.52C684.911 216.378 642.977 247.524 595.803 247.524C564.737 247.524 536.122 235.433 517.301 214.35C498.489 195.151 493.579 165.73 497.019 146.564C499.858 130.759 506.534 121.008 511.892 113.19C515.822 107.519 519.177 102.632 520.343 96.7622C524.225 77.2465 538.245 74.7295 540.534 74.3185C540.698 74.2892 540.801 74.2706 540.837 74.2573C540.009 79.2087 541.589 82.2355 544.86 82.8744C545.39 82.9836 545.931 83.0398 546.474 83.042C550.497 83.042 552.542 79.5921 552.905 77.923L553.227 76.3976C553.877 72.6185 555.012 68.9283 556.607 65.4087C565.734 46.3299 581.631 34.7021 605.209 29.8465C611.192 28.6247 616.009 28.3133 622.111 27.9219C624.554 27.7622 627.233 27.5864 630.317 27.3309C637.002 26.7559 642.309 24.408 643.839 20.1434C644.443 18.4542 644.666 16.6643 644.495 14.8886C644.323 13.113 643.76 11.391 642.842 9.83337C642.063 8.41544 641.053 7.12186 639.85 6L645.487 7.32572C646.298 7.5094 665.414 12.1972 674.026 30.4215ZM677.098 125.589C679.821 119.95 681.624 116.214 682.063 109.947C682.731 100.436 679.19 93.7115 674.812 89.1514C673.336 91.902 671.074 94.2064 668.282 95.8029C665.49 97.3995 662.28 98.2244 659.017 98.1838C649.459 98.1838 641.684 91.2918 641.684 82.8265C641.684 76.3521 643.908 72.5278 646.195 68.5951C646.748 67.6429 647.306 66.6843 647.836 65.6802L648.025 65.3184C649.695 62.1174 651.247 59.143 651.834 56.8955C652.821 52.9377 652.87 48.8223 651.977 44.8445C646.026 47.9098 639.457 49.7523 632.7 50.2511C629.674 50.4962 627.028 50.6723 624.551 50.8371L623.996 50.874C619.663 51.0954 615.348 51.5621 611.074 52.2716C587.251 56.2088 580.921 71.7816 578.309 82.2674C574.709 96.5386 563.097 108.079 544.505 104.525C543.14 110.245 539.864 115.104 536.222 120.507C529.984 129.758 522.672 140.603 522.042 160.1C520.876 196.213 554.477 224.532 595.888 224.532C612.303 224.495 628.236 219.288 641.168 209.734C653.684 200.486 662.254 187.532 665.964 172.271C666.488 170.079 666.889 166.309 667.32 162.256L667.341 162.057L667.355 161.927C668.028 155.562 668.789 148.361 670.367 142.555C672.037 136.721 674.287 131.05 677.085 125.616L677.098 125.589ZM607.892 147.403H636.507H638.891L638.637 149.639L636.66 167.417L636.457 169.229H634.53H605.458L602.027 200.152L601.824 201.964H599.897H579.801H577.418L577.671 199.728L581.06 169.229H553.079H550.695L550.949 166.993L552.926 149.216L553.129 147.403H555.056H583.485L586.857 117.096L587.06 115.283H588.987H609.084H611.467L611.213 117.519L607.892 147.403Z"
              fill={`url(#${grad2Id})`}
            />
          </g>
          <path
            opacity="0.6"
            d="M455 34.9081C455 35.9182 454.105 36.7371 453 36.7371C451.895 36.7371 451 35.9182 451 34.9081L451 25.8291C451 24.819 451.896 24 453 24C454.104 24 455 24.819 455 25.8291L455 34.9081ZM455 53.066C455 54.0762 454.105 54.8951 453 54.8951C451.895 54.8951 451 54.0762 451 53.066L451 43.987C451 42.9769 451.895 42.1579 453 42.1579C454.105 42.1579 455 42.9769 455 43.987L455 53.066ZM455 71.2239C455 72.2341 454.105 73.053 453 73.053C451.895 73.053 451 72.2341 451 71.2239L451 62.145C451 61.1348 451.895 60.3159 453 60.3159C454.105 60.3159 455 61.1348 455 62.145L455 71.2239ZM455 89.3819C455 90.392 454.104 91.211 453 91.211C451.896 91.211 451 90.392 451 89.3819L451 80.3029C451 79.2927 451.895 78.4738 453 78.4738C454.105 78.4738 455 79.2927 455 80.3029L455 89.3819ZM455 107.54C455 108.55 454.104 109.369 453 109.369C451.896 109.369 451 108.55 451 107.54L451 98.4609C451 97.4507 451.895 96.6318 453 96.6318C454.105 96.6318 455 97.4507 455 98.4609L455 107.54ZM455 125.697C455 126.707 454.105 127.526 453 127.526C451.895 127.526 451 126.707 451 125.697L451 116.618C451 115.608 451.896 114.789 453 114.789C454.104 114.789 455 115.608 455 116.618L455 125.697ZM455 143.855C455 144.865 454.105 145.684 453 145.684C451.895 145.684 451 144.865 451 143.855L451 134.776C451 133.766 451.895 132.947 453 132.947C454.105 132.947 455 133.766 455 134.776L455 143.855ZM455 162.013C455 163.023 454.105 163.842 453 163.842C451.895 163.842 451 163.023 451 162.013L451 152.934C451 151.924 451.895 151.105 453 151.105C454.105 151.105 455 151.924 455 152.934L455 162.013ZM455 180.171C455 181.181 454.105 182 453 182C451.895 182 451 181.181 451 180.171L451 171.092C451 170.082 451.895 169.263 453 169.263C454.105 169.263 455 170.082 455 171.092L455 180.171Z"
            fill="var(--promo-coupon-svg-dot-color)"
          />
        </g>
      </svg>
      </div>
      <div className={styles.wrap}>
        <div className={styles.text}>
          <span className={styles.text__seg0}>{currency}</span>
        </div>
        <div className={styles.text1}>
          <span className={styles.text1__seg0}>{amount}</span>
        </div>
        <div className={styles.text2}>{limitText}</div>
      </div>
      <div className={styles.wrap1}>
        <div className={styles.container}>
          <div className={styles.text3}>
            <span className={styles.text3__seg0}>{buttonText}</span>
          </div>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.text4}>{title}</div>
        <svg
          key={`decor_${suffix}`}
          className={styles.image1}
          width="188"
          height="18"
          viewBox="0 0 188 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M101.154 0.788202C118.431 0.0705379 132.927 -0.263774 138.605 0.244256C139.336 0.309681 140.062 0.399623 140.688 0.539178C140.993 0.607293 141.403 0.714973 141.824 0.894647C142.107 1.01526 143.072 1.43577 143.758 2.46984C144.167 3.0863 144.471 3.91867 144.423 4.8839C144.377 5.80995 144.023 6.52517 143.702 6.98742C143.386 7.44244 143.018 7.77239 142.707 8.00207C154.677 6.91985 166.113 6.04885 184.055 6.95031C186.185 7.05732 187.825 8.87044 187.718 11.0001C187.611 13.1299 185.798 14.77 183.668 14.6632C154.112 13.1781 144.111 16.5118 116.39 17.6984C115.18 17.7501 114.064 17.7198 113.091 17.5616C112.265 17.4273 110.882 17.1061 109.792 16.0529C109.165 15.4464 108.641 14.598 108.471 13.5441C108.307 12.5284 108.521 11.6455 108.793 11.0079C109.287 9.85043 110.153 9.05284 110.726 8.59094C110.92 8.43464 111.128 8.27966 111.349 8.12707C108.223 8.23414 104.918 8.36094 101.474 8.50402C66.7236 9.94751 19.3008 13.0225 4.27657 14.6456C2.15642 14.8747 0.251839 13.3419 0.0226658 11.2218C-0.206378 9.10167 1.32642 7.19709 3.44649 6.96789C18.7329 5.31645 66.3639 2.23332 101.154 0.788202Z"
            fill="var(--promo-coupon-svg-decor-light)"
          />
        </svg>
      </div>
    </div>
  )
}
