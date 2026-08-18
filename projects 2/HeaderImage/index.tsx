import React from 'react'
import styles from './index.module.scss'
import headerImage from './assets/header.png'

export interface HeaderImageProps {
  src?: string
  className?: string
}

export default function HeaderImage({
  src,
  className,
}: HeaderImageProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <img src={src || headerImage} className={styles.image} />
    </div>
  )
}
