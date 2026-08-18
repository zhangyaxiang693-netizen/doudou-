/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image from './assets/image_1.svg'
import image1 from './assets/image_2.svg'
import image2 from './assets/image_3.svg'
import image3 from './assets/image4.svg'
import image4 from './assets/image5.svg'
import image5 from './assets/image6.svg'

export type IGeneratedComponent = {
  titleText?: string
  mainTextTop?: string
  mainTextBottom?: string
  dateText?: string
  ornamentSvg?: string
  giftSvg?: string
  heroSvg?: string
  extraSvg?: string
  explosionSvg?: string
  beamSvg?: string
  background?: string
  borderRadius?: string | number
  paused?: boolean
  showGlow?: boolean
  showBurst?: boolean
  showParticles?: boolean
  showOrnament?: boolean
  showGift?: boolean
  showHero?: boolean
  showExtra?: boolean
  showExplosion?: boolean
  showBeam?: boolean
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const {
    titleText = 'DOU+端午出圈季',
    mainTextTop = '流量大奖',
    mainTextBottom = '抽666元',
    dateText = '6月10日-6月21日',
    ornamentSvg = '',
    giftSvg = '',
    heroSvg = '',
    explosionSvg = '',
    beamSvg = '',
    extraSvg = '',
    background = '',
    borderRadius = 60,
    paused = false,
    showGlow = true,
    showBurst = true,
    showParticles = true,
    showOrnament = true,
    showGift = true,
    showHero = true,
    showExtra = true,
    showExplosion = true,
    showBeam = true,
  } = props
  const pageStyle: React.CSSProperties = {
    ...(background ? { background } : {}),
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
  }
  const assetOrDefault = (value: string | undefined, fallback: string) => value && value.trim() ? value : fallback
  const renderChars = (value: string) => value.split('').map((char, index) => <i key={`${char}-${index}`}>{char}</i>)

  return (
    <div className={`${styles.page} ${paused ? styles.paused : ''}`} style={pageStyle}>
      {showGlow ? <div className={styles.stageGlow}></div> : null}
      {showExplosion ? <img src={assetOrDefault(explosionSvg, image3)} className={styles.image3} alt="" /> : null}
      {showBeam ? <img src={assetOrDefault(beamSvg, image4)} className={styles.image4} alt="" /> : null}
      {showParticles ? <div className={styles.beamParticles}>
        <i className={`${styles.beamParticle} ${styles.beamParticle1}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle2}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle3}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle4}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle5}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle6}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle7}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle8}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle9}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle10}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle11}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle12}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle13}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle14}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle15}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle16}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle17}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle18}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle19}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle20}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle21}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle22}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle23}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle24}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle25}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle26}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle27}`}></i>
        <i className={`${styles.beamParticle} ${styles.beamParticle28}`}></i>
      </div> : null}
      {showBurst ? <div className={styles.burstFrame}></div> : null}
      <div className={styles.text}>{titleText}</div>
      <div className={styles.text1}>
        <span className={styles.text1__seg0}>
          {renderChars(mainTextTop)}
        </span>
      </div>
      <div className={styles.text2}>
        <span className={styles.text2__seg0}>
          {renderChars(mainTextBottom)}
        </span>
      </div>
      <div className={styles.wrap}></div>
      <div className={styles.text3}>{dateText}</div>
      {showOrnament ? <img src={assetOrDefault(ornamentSvg, image)} className={styles.image} alt="" /> : null}
      {showGift ? <img src={assetOrDefault(giftSvg, image1)} className={styles.image1} alt="" /> : null}
      {showExtra ? <img src={assetOrDefault(extraSvg, image5)} className={styles.image5} alt="" /> : null}
      {showHero ? <img src={assetOrDefault(heroSvg, image2)} className={styles.image2} alt="" /> : null}
    </div>
  )
}
