import React from 'react'
import styles from './index.module.scss'

export interface DoublePromotionProps {
  title?: string
  subtitle?: string
  className?: string
}

export default function DoublePromotion({
  title = '专属管家专业指导投放',
  subtitle = 'DOU+认证用户专享',
  className,
}: DoublePromotionProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}></div>
      <div className={styles.wrap1}>
        <div className={styles.image} />
        <div className={styles.container}>
          <div className={styles.text}>
            <span className={styles.text__seg0}>{title}</span>
          </div>
          <div className={styles.text1}>{subtitle}</div>
        </div>
      </div>
    </div>
  )
}
