import React from 'react'
import { createCssVars, toCssLength } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface BigButtonProps {
  text?: string
  textFontFamily?: string
  textFontSize?: number | string
  textLetterSpacing?: number | string
  textColor?: string
  textGradient?: string
  bgColor?: string
  bgGradient?: string
  borderRadius?: number | string
  paddingX?: number | string
  buttonHeight?: number | string
  className?: string
  onClick?: () => void
}

export default function BigButton({
  text = '去投放',
  textFontFamily,
  textFontSize,
  textLetterSpacing,
  textColor,
  textGradient,
  bgColor,
  bgGradient,
  borderRadius,
  paddingX,
  buttonHeight,
  className,
  onClick,
}: BigButtonProps) {
  const textStyle = textGradient && textGradient.trim() !== ''
    ? {
        background: textGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      } as React.CSSProperties
    : undefined

  const buttonStyle = createCssVars({
    bigButtonPageBackground: bgColor || bgGradient,
    bigButtonPageBorderRadius: borderRadius !== undefined ? toCssLength(borderRadius) : undefined,
    bigButtonPagePaddingX: paddingX !== undefined ? toCssLength(paddingX) : undefined,
    bigButtonPageHeight: buttonHeight !== undefined ? toCssLength(buttonHeight) : undefined,
    bigButtonPageMinHeight: buttonHeight !== undefined ? toCssLength(buttonHeight) : undefined,
    bigButtonTextFontFamily: textFontFamily,
    bigButtonTextFontSize: textFontSize !== undefined ? toCssLength(textFontSize) : undefined,
    bigButtonTextLetterSpacing: textLetterSpacing !== undefined ? toCssLength(textLetterSpacing) : undefined,
    bigButtonTextColor: textGradient && textGradient.trim() !== '' ? undefined : textColor,
  })

  return (
    <div className={`${styles.page} ${className || ''}`} style={buttonStyle} onClick={onClick}>
      <div className={styles.text} style={textStyle}>{text}</div>
    </div>
  )
}
