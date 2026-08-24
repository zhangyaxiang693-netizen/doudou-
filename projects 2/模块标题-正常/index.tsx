/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Url from './assets/image_1.svg'
import image2Url from './assets/image_2.svg'
import image3Url from './assets/image_3.svg'
import iconRedUrl from '../icon库/04-coupon/asset-coin-red.svg'
import iconYellowUrl from '../icon库/04-coupon/asset-coin-pink.svg'

export type IGeneratedComponent = {
  titleText?: string
  iconVariant?: 'current' | 'red' | 'yellow'
}

function getVariantIcon(iconVariant?: IGeneratedComponent['iconVariant']) {
  if (iconVariant === 'red') return iconRedUrl
  if (iconVariant === 'yellow') return iconYellowUrl
  return ''
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const titleText = props.titleText || '端午消耗返冲刺赢大额券'
  const variantIcon = getVariantIcon(props.iconVariant)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.main}>
              <div className={styles.section}>
                {variantIcon ? (
                  <img
                    src={variantIcon}
                    className={styles.image}
                  />
                ) : (
                  <>
                    <img
                      src={image1Url}
                      className={styles.image}
                    />
                    <img
                      src={image2Url}
                      className={styles.image1}
                    />
                    <img
                      src={image3Url}
                      className={styles.image2}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.content1}>
            <div className={styles.text}>
              <div className={styles.text__listwrap}>
                  {titleText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
