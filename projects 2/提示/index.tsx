/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1Raw from './assets/image_1.svg?raw'

export type IGeneratedComponent = {
  contentText?: string
  text?: string
  description?: string
  backgroundColor?: string
  iconColor?: string
  textColor?: string
}

const originalColors = {
  iconColor: '#FF62A0',
  textColor: 'rgba(255, 98, 160, 1)',
  backgroundColor: 'rgba(255, 244, 246, 1)',
}

function themedIconSvg(iconColor?: string) {
  return image1Raw.replaceAll(originalColors.iconColor, iconColor || originalColors.iconColor)
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const contentText = props.contentText ?? props.text ?? props.description ?? ''
  const pageStyle =
    props.backgroundColor && props.backgroundColor !== originalColors.backgroundColor
      ? { background: props.backgroundColor }
      : undefined
  const textStyle =
    props.textColor && props.textColor !== originalColors.textColor
      ? { color: props.textColor }
      : undefined
  const iconSvg = themedIconSvg(props.iconColor)

  return (
    <div className={styles.page} style={pageStyle}>
      <div className={styles.image} dangerouslySetInnerHTML={{__html: iconSvg}} />
      <div className={styles.wrap}>
          <div className={styles.text} style={textStyle}>
          <div className={styles.text__listwrap}>
            {contentText}
          </div>
        </div>
      </div>
    </div>
  )
}
