/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'

export type IGeneratedComponent = {
  descriptionText?: string
  descriptionEditProp?: string
  buttonText?: string
  accentGradientStart?: string
  accentGradientEnd?: string
}

const defaults = {
  descriptionText: '毛绒公仔/挂件/盲盒/\n冰箱贴随机发一件',
  buttonText: '填写地址',
}

function valueOrFallback(value: string | undefined, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback
}

export default function GeneratedComponent(props: IGeneratedComponent) {
  const style = {
    '--random-prize-address-accent-start':
      props.accentGradientStart || '#FF1473',
    '--random-prize-address-accent-end':
      props.accentGradientEnd || '#FF229F',
  } as React.CSSProperties

  return (
    <div className={styles.page} style={style}>
      <div className={styles.wrap}>
        <div
          className={styles.description}
          data-react-edit-prop={props.descriptionEditProp}
        >
          {valueOrFallback(props.descriptionText, defaults.descriptionText)}
        </div>
        <div className={styles.button}>
          {valueOrFallback(props.buttonText, defaults.buttonText)}
        </div>
      </div>
    </div>
  )
}
