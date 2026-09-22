/* eslint-disable*/
import React, {useLayoutEffect, useRef} from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  buttonText?: string
  buttonGradientStart?: string
  buttonGradientEnd?: string
}

const originalColors = {
  buttonGradientStart: '#FF1473',
  buttonGradientEnd: '#FF229F',
}

function normalizeColor(value?: string) {
  return String(value || '').trim().toUpperCase()
}

function useFitText(value: string) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const fit = () => {
      let size = 40
      element.style.fontSize = `${size}px`
      while (size > 20 && element.scrollWidth > element.clientWidth + 1) {
        size -= 1
        element.style.fontSize = `${size}px`
      }
    }

    fit()
    document.fonts?.ready.then(fit)
  }, [value])

  return ref
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const buttonText = props.buttonText || '去投放'
  const gradientStart = props.buttonGradientStart || originalColors.buttonGradientStart
  const gradientEnd = props.buttonGradientEnd || originalColors.buttonGradientEnd
  const textRef = useFitText(buttonText)
  const buttonStyle =
    normalizeColor(gradientStart) !== originalColors.buttonGradientStart ||
    normalizeColor(gradientEnd) !== originalColors.buttonGradientEnd
      ? {
          background: `linear-gradient(90deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        }
      : undefined

  return (
    <div className={styles.page}>
      <div className={styles.wrap} style={buttonStyle}>
        <div
          ref={textRef}
          className={styles.text}
          data-react-edit-prop="buttonText"
        >
          {buttonText}
        </div>
      </div>
    </div>
  )
}
