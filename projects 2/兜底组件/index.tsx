/* eslint-disable*/
import React from 'react'
import styles from './index.module.scss'
import image1 from './assets/image_1.svg'

export type IGeneratedComponent = {
  text?: string
}

export default function GeneratedComponent({
  text = '活动太火爆了\n请稍后再来看看吧～',
}: IGeneratedComponent) {
  const lines = String(text || '')
    .split(/\r?\n/)
    .filter(Boolean)

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.container}></div>
        <div className={styles.text}>
          {lines.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className={index === 0 ? styles.text__linebreak : undefined}
            >
              {line}
            </div>
          ))}
        </div>
        <img src={image1} className={styles.image} />
      </div>
    </div>
  )
}
