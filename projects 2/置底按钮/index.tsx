/* eslint-disable*/
import React, {useId} from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  buttonText?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
  backgroundGradientColor?: string
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const reactId = useId().replace(/:/g, '')
  const fadeId = `bottomButtonFade-${reactId}`
  const maskId = `bottomButtonMask-${reactId}`
  const outerId = `bottomButtonOuter-${reactId}`
  const glowId = `bottomButtonGlow-${reactId}`
  const strokeId = `bottomButtonStroke-${reactId}`
  const mainId = `bottomButtonMain-${reactId}`
  const {
    buttonText = '立即使用DOU+',
    buttonGradientStart = '#FF1473',
    buttonGradientEnd = '#FF229F',
    backgroundGradientColor = '#FFBBD8',
  } = props

  return (
    <div className={styles.image}>
      <svg
        className={styles.artwork}
        width="750"
        height="287"
        viewBox="0 0 750 287"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect opacity="0.5" width="750" height="234" fill={`url(#${fadeId})`} />
        <path
          d="M554 101C589.898 101 619 130.102 619 166V164C619 197.475 645.723 223.156 679 223.979V224H750V287H0V224H71V223.979C104.277 223.156 131 197.475 131 164V166C131 130.101 160.101 101 196 101H554Z"
          fill="white"
        />
        <mask
          id={maskId}
          style={{maskType: 'alpha'}}
          maskUnits="userSpaceOnUse"
          x="140"
          y="107"
          width="470"
          height="116"
        >
          <rect x="141.918" y="108.918" width="466.165" height="112.165" rx="56.0823" fill={`url(#${outerId})`} />
          <rect x="141.918" y="108.918" width="466.165" height="112.165" rx="56.0823" fill={`url(#${glowId})`} fillOpacity="0.7" />
          <rect x="141.918" y="108.918" width="466.165" height="112.165" rx="56.0823" stroke={`url(#${strokeId})`} strokeWidth="2.16457" />
        </mask>
        <g mask={`url(#${maskId})`}>
          <path
            d="M143 166C143 135.624 167.624 111 198 111H552C582.376 111 607 135.624 607 166C607 196.376 582.376 221 552 221H198C167.624 221 143 196.376 143 166Z"
            fill={`url(#${mainId})`}
          />
        </g>
        <defs>
          <linearGradient id={fadeId} x1="375" y1="0" x2="375" y2="234" gradientUnits="userSpaceOnUse">
            <stop stopColor={backgroundGradientColor} stopOpacity="0" />
            <stop offset="1" stopColor={backgroundGradientColor} />
          </linearGradient>
          <linearGradient id={outerId} x1="348.486" y1="60.6896" x2="422.564" y2="287.801" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F70000" />
            <stop offset="1" stopColor="#FF3D00" />
          </linearGradient>
          <radialGradient id={glowId} cx="0" cy="0" r="1" gradientTransform="matrix(0 -79.1336 614.093 28.228 375 221.375)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF96B" />
            <stop offset="0.578483" stopColor="#FFDB1F" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={strokeId} x1="364.114" y1="62.6084" x2="459.495" y2="264.698" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F9B023" />
            <stop offset="0.2992" stopColor="white" />
            <stop offset="1" stopColor="#FFDC97" />
          </linearGradient>
          <linearGradient id={mainId} x1="143" y1="166" x2="607" y2="166" gradientUnits="userSpaceOnUse">
            <stop stopColor={buttonGradientStart} />
            <stop offset="1" stopColor={buttonGradientEnd} />
          </linearGradient>
        </defs>
      </svg>
      <span className={styles.buttonText} data-react-edit-prop="buttonText">
        {buttonText}
      </span>
    </div>
  )
}
