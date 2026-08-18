import React from 'react'
import { createCssVars } from '../src/utils/cssVars'
import styles from './index.module.scss'

export interface RichTextProps {
  content?: string
  fontSize?: 'title' | 'body'
  color?: 'black' | 'gray' | 'rose'
  bullet?: boolean
  icon?: boolean
  className?: string
}

const colorMap: Record<string, string> = {
  black: '#17212f',
  gray: '#667085',
  rose: '#e5484d',
}

export default function RichText({ 
  content = '在此输入文本内容...', 
  fontSize = 'body', 
  color = 'black', 
  bullet = false, 
  icon = false,
  className 
}: RichTextProps) {
  const textColor = colorMap[color] || colorMap.black
  const isTitle = fontSize === 'title'

  return (
    <div
      className={`${styles.page} ${className || ''}`}
      style={createCssVars({ richTextTextareaColor: textColor })}
    >
      <div 
        className={`${styles.textarea} ${isTitle ? styles.title : styles.body} ${bullet ? styles.bullet : ''}`}
        data-edit-prop="content"
        contentEditable="true"
        suppressContentEditableWarning={true}
      >
        {icon && isTitle && (
          <span className={styles.iconWrapper}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="var(--rich-text-title-icon-background, #E5484D)"/>
              <path d="M9 16L14 21L23 11" stroke="var(--rich-text-title-icon-check-color, white)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
        {bullet && !isTitle && <span className={styles.bulletDot} />}
        <span className={styles.text}>{content}</span>
      </div>
    </div>
  )
}
