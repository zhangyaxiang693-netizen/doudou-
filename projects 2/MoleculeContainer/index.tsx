import React from 'react'
import styles from './index.module.scss'

export interface MoleculeContainerProps {
  className?: string
}

export default function MoleculeContainer({
  className,
}: MoleculeContainerProps) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      <div className={styles.wrap}></div>
    </div>
  )
}
