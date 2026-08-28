/* eslint-disable*/
import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  conditionText?: string
  amountText?: string
  cardBgColor?: string
  decorCircleColor?: string
  innerStrokeColor?: string
  innerFillColor?: string
  waistbandStart?: string
  waistbandEnd?: string
  stampTextColor?: string
  stampRingColor?: string
}

function useGradId() {
  const [id] = React.useState(() => 'grad-' + Math.random().toString(36).slice(2, 10))
  return id
}

/* image_1.svg 背景 162x192 圆角矩形 */
function Image1Bg({ fill }: { fill: string }) {
  return (
    <svg width="162" height="192" viewBox="0 0 162 192" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.image}>
      <rect width="161.999" height="192" rx="46" fill={fill}/>
    </svg>
  )
}

/* image_2.svg 右装饰圆 */
function Image2Circle({ fill }: { fill: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.image1}>
      <circle cx="6.94001" cy="6.94001" r="6.94001" fill={fill}/>
    </svg>
  )
}

/* image_3.svg 左装饰圆 */
function Image3Circle({ fill }: { fill: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.image2}>
      <circle cx="6.94001" cy="6.94001" r="6.94001" fill={fill}/>
    </svg>
  )
}

/* image_4.svg 内卡片 149x145 含 mask 装饰 */
function Image4InnerCard({ circleFill, strokeColor, fillColor }: { circleFill: string; strokeColor: string; fillColor: string }) {
  const maskId = 'mask-' + Math.random().toString(36).slice(2, 10)
  return (
    <svg width="149" height="145" viewBox="0 0 149 145" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.image3}>
      <mask id={maskId} style={{maskType:'alpha' as any}} maskUnits="userSpaceOnUse" x="0" y="0" width="149" height="145">
        <path d="M84.1201 0C106.522 0 117.723 -0.000156766 126.279 4.35938C133.806 8.19431 139.925 14.3143 143.76 21.8408C148.119 30.3973 148.12 41.598 148.12 64V80.1104C148.12 102.512 148.119 113.713 143.76 122.27C139.925 129.796 133.806 135.915 126.279 139.75C117.723 144.11 106.522 144.11 84.1201 144.11H64C41.5981 144.11 30.3973 144.11 21.8408 139.75C14.3143 135.915 8.19431 129.796 4.35938 122.27C-0.000177666 113.713 0 102.512 0 80.1104V64C0 41.5983 -0.00011091 30.3972 4.35938 21.8408C8.19431 14.3143 14.3143 8.19431 21.8408 4.35938C30.3972 -0.00011091 41.5983 0 64 0H84.1201Z" fill="white"/>
      </mask>
      <g mask={`url(#${maskId})`}>
        <g opacity="0.5">
          <path d="M15.0778 -12.4882C39.6959 -26.7559 71.1558 -18.3227 85.3456 6.34833C99.5354 31.0196 91.0814 62.5863 66.4632 76.854C41.845 91.1216 10.3846 82.6878 -3.80512 58.0166C-17.9946 33.3454 -9.54019 1.77948 15.0778 -12.4882Z" stroke={strokeColor} strokeWidth="2"/>
          <path d="M18.3273 -6.84152C39.8329 -19.305 67.3154 -11.9382 79.7115 9.61401C92.1075 31.1665 84.7221 58.7423 63.2167 71.2063C41.7109 83.6702 14.2272 76.3031 1.83115 54.7504C-10.5646 33.1978 -3.17829 5.62229 18.3273 -6.84152Z" stroke={strokeColor} strokeWidth="4"/>
          <path d="M20.6601 52.4437L27.4504 48.5088C29.5892 47.2694 29.6103 46.536 28.1866 43.3389C29.0577 43.3611 30.4184 43.1274 31.2289 42.8519C33.0011 47.0398 32.7456 48.7134 28.9663 50.9035L22.093 54.8865C18.0852 57.209 16.4054 57.1284 14.5984 53.987L9.02188 44.2925L11.576 42.8124L13.2035 45.6417L22.631 40.1785L20.082 35.7473L7.26983 43.1719L5.85775 40.7171L21.2449 31.8003L27.1684 42.0982L24.5935 43.5904L24.0311 42.6126L14.6036 48.0757L17.1525 52.5069C17.8944 53.7968 18.3759 53.7674 20.6601 52.4437ZM37.6886 27.3197L40.2843 25.8156C40.148 25.1456 40.0055 24.3683 39.8365 23.6895L36.1818 25.8074L34.9373 23.6438L44.4686 18.1205L45.7131 20.2841L42.1 22.3779C42.2098 23.1464 42.3076 23.8941 42.4023 24.5882L46.3062 22.3259L51.8588 31.9788L49.5746 33.3025L45.0392 25.4179L40.8861 27.8245L45.4694 35.7924L43.289 37.0559L37.6886 27.3197ZM38.1951 28.4409L37.6724 31.046C36.3857 30.3493 34.1177 29.5832 32.0971 29.0066C32.0672 31.4094 31.7219 33.7454 30.9776 35.8688C30.3613 35.6157 29.1294 35.3032 28.4037 35.1967C29.5644 32.305 29.8002 28.4792 29.3433 25.4708L31.8204 24.8675C31.9056 25.4006 31.97 25.9458 32.0136 26.503C34.162 27.0611 36.7717 27.7956 38.1951 28.4409ZM31.8134 32.7492L32.8323 30.9106C34.0075 31.1727 35.5044 31.6089 36.3202 31.9683L35.3883 34.0063C34.5485 33.6053 33.0245 33.0737 31.8134 32.7492ZM37.551 32.8084L39.6709 32.8837C40.0426 35.3589 40.0004 38.4624 39.8515 40.8509C40.8662 41.1228 41.7651 41.434 42.438 41.7375L41.5107 44.2166C39.962 43.4498 36.9475 42.5892 34.6682 41.9961L35.6027 39.818C36.1799 39.9551 36.8106 40.0889 37.4621 40.2107C37.5226 38.8719 37.5138 37.2682 37.4194 35.8527L32.6434 38.6204L31.4348 36.5192L37.2283 33.1619L37.551 32.8084ZM48.2354 35.3545L48.7559 33.8047C50.597 34.0692 53.0928 34.5092 54.4619 34.964L53.7333 37.3556C52.492 36.8822 50.1536 36.3788 48.3389 36.0158C48.4744 38.1286 47.7142 39.9838 45.769 42.1373C45.2621 41.7376 44.2675 41.2599 43.5921 41.0965C47.4418 37.0072 46.2053 34.617 42.3848 27.9269L44.399 26.7597C46.4692 30.3588 47.8613 33.0194 48.2354 35.3545ZM57.3588 28.015L59.493 26.3344L58.3083 24.2748L55.9826 25.6225L57.3588 28.015ZM53.366 15.6828L51.0403 17.0306L52.2609 19.1526L54.5866 17.8048L53.366 15.6828ZM53.4696 21.2537L54.7739 23.5214L57.0997 22.1736L55.7953 19.906L53.4696 21.2537ZM64.4749 25.4168L62.9309 26.7276L65.1807 30.6387L62.7719 32.0346L60.7734 28.5604C58.9419 30.0933 57.2022 31.5453 55.7261 32.7335L53.9082 30.6803C54.2788 30.41 54.7205 30.0708 55.183 29.7196L48.6731 18.4024L47.531 19.0642L46.2625 16.859L55.7107 11.3838L56.9792 13.589L55.7748 14.287L61.6984 24.5848L63.1656 23.4294L64.4749 25.4168ZM64.3995 11.2307L60.8486 13.2884C62.6042 15.3778 64.4214 17.2373 66.3234 18.7148C66.0442 16.3523 65.4019 13.8398 64.3995 11.2307ZM64.0496 8.21581L65.8136 7.72062C67.9895 12.5622 69.0989 16.8013 69.2495 20.6251C71.123 21.6198 73.0574 22.1909 75.079 22.2398C74.7785 22.9688 74.5335 24.2757 74.498 25.1285C72.6305 24.9625 70.8718 24.456 69.1148 23.6157C68.9054 25.7065 68.3208 27.6263 67.4504 29.4344C66.7504 29.0356 65.5865 28.6006 64.8488 28.4733C65.8469 26.6467 66.3741 24.4827 66.4902 22.0854C63.7932 20.2365 61.233 17.6148 58.689 14.5399L57.9622 14.9611L56.622 12.631L63.6822 8.5397L64.0496 8.21581Z" fill={fillColor}/>
        </g>
        <circle cx="0.371648" cy="68.8492" r="6.94001" fill={circleFill}/>
      </g>
    </svg>
  )
}

/* image_5.svg 腰封装饰 162x122 渐变 */
function Image5Waistband({ start, end }: { start: string; end: string }) {
  const gradId = useGradId()
  return (
    <svg width="162" height="122" viewBox="0 0 162 122" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.image4}>
      <path d="M0.0117188 0C0.0607437 9.4978 0.31148 15.0838 1.5957 19.8311C5.86664 35.6188 18.1996 47.9516 33.9873 52.2227C39.8874 53.8188 47.0831 53.8184 61.4736 53.8184H100.529C114.919 53.8184 122.114 53.8186 128.014 52.2227C143.801 47.952 156.134 35.62 160.405 19.833C161.675 15.1392 161.934 9.62562 161.987 0.321289C161.997 3.08642 161.999 6.0336 161.999 9.18262V51.7881C161.999 76.3548 161.999 88.6382 157.218 98.0215C153.012 106.275 146.302 112.986 138.048 117.191C128.665 121.972 116.381 121.973 91.8145 121.973H70.1846C45.6178 121.973 33.3345 121.972 23.9512 117.191C15.6973 112.986 8.98679 106.275 4.78125 98.0215C0.000223106 88.6382 1.55038e-10 76.3548 0 51.7881V9.18262C0 5.91133 0.0004295 2.85784 0.0117188 0Z" fill={`url(#${gradId})`}/>
      <defs>
        <linearGradient id={gradId} x1="0" y1="60.9863" x2="161.999" y2="60.9863" gradientUnits="userSpaceOnUse">
          <stop stopColor={start}/>
          <stop offset="1" stopColor={end}/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <Image1Bg fill={props.cardBgColor || '#FFC5E5'} />
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}></div>
            <Image2Circle fill={props.decorCircleColor || '#FFC4E5'} />
            <Image3Circle fill={props.decorCircleColor || '#FFC4E5'} />
          </div>
          <Image4InnerCard
            circleFill={props.decorCircleColor || '#FFC4E5'}
            strokeColor={props.innerStrokeColor || '#FFD9E5'}
            fillColor={props.innerFillColor || '#FF62A0'}
          />
        </div>
        <Image5Waistband
          start={props.waistbandStart || '#FF1473'}
          end={props.waistbandEnd || '#FF229F'}
        />
      </div>
      <div className={styles.wrap1}>
        <div className={styles.text}>{props.conditionText || '满68元可用'}</div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.text1}>{props.amountText || '10'}</div>
        <div className={styles.text2}>元</div>
      </div>
    </div>
  )
}
