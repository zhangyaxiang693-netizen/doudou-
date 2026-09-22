/* eslint-disable */
import React from 'react'
import styles from './index.module.scss'

import subject1Core from '../../主视觉拆分/方案1/Group 2147242157.png'
import subject1Ribbon from '../../主视觉拆分/方案1/Group 2147239891.png'
import subject1Tag from '../../主视觉拆分/方案1/Mask group.png'

import subject2Ticket from '../../主视觉拆分/方案2/Frame 2147240516.png'
import subject2Core from '../../主视觉拆分/方案2/Frame 2147240517.png'
import subject2Coin from '../../主视觉拆分/方案2/金币3 1.png'
import subject2Star from '../../主视觉拆分/方案2/Image_20260714170550 1.png'
import subject2GreenRibbon from '../../主视觉拆分/方案2/星星.png'
import subject2GoldRibbon from '../../主视觉拆分/方案2/圆柱 1.png'

import subject3PinkAccent from '../../主视觉拆分/方案3/Group 2147239575.png'
import subject3BlueRibbon from '../../主视觉拆分/方案3/Group 2147240442.png'
import subject3GreenAccent from '../../主视觉拆分/方案3/Group 2147240467.png'
import subject3Core from '../../主视觉拆分/方案3/Group 2147240473.png'
import subject3Badge from '../../主视觉拆分/方案3/Mask group.png'
import subject3Rocket from '../../主视觉拆分/方案3/小火箭 1.png'
import subject3GreenRibbon from '../../主视觉拆分/方案3/星星.png'

import subject4Ticket from '../../主视觉拆分/方案4/Frame 2147240515.png'
import subject4Core from '../../主视觉拆分/方案4/Frame 2147240518.png'
import subject4Ribbon from '../../主视觉拆分/方案4/Frame 2147240519.png'
import subject4Coin from '../../主视觉拆分/方案4/Mask group-1.png'
import subject4Badge from '../../主视觉拆分/方案4/Mask group.png'

type Layer = {
  src: string
  className: string
  left: number
  top: number
  width: number
  height: number
}

const layerSets: Record<string, Layer[]> = {
  'subject-1': [
    {src: subject1Ribbon, className: styles.floatSlow, left: 163, top: 158, width: 220, height: 196},
    {src: subject1Core, className: styles.coreFloat, left: 0, top: -1, width: 338, height: 306},
    {src: subject1Tag, className: styles.floatFast, left: 314, top: 0, width: 74, height: 81},
  ],
  'subject-2': [
    {src: subject2Ticket, className: styles.floatSlow, left: 165, top: 73, width: 227, height: 241},
    {src: subject2GreenRibbon, className: styles.driftLeft, left: -6, top: 202, width: 129, height: 113},
    {src: subject2GoldRibbon, className: styles.driftRight, left: 266, top: 177, width: 134, height: 154},
    {src: subject2Core, className: styles.coreFloat, left: 53, top: 28, width: 302, height: 283},
    {src: subject2Star, className: styles.floatFast, left: 212, top: -20, width: 87, height: 87},
    {src: subject2Coin, className: styles.coinFloat, left: 291, top: -3, width: 82, height: 79},
  ],
  'subject-3': [
    {src: subject3GreenRibbon, className: styles.driftRight, left: 243, top: 191, width: 129, height: 120},
    {src: subject3Badge, className: styles.floatSlow, left: 249, top: 58, width: 122, height: 123},
    {src: subject3Core, className: styles.coreFloat, left: -18, top: 21, width: 377, height: 305},
    {src: subject3BlueRibbon, className: styles.driftLeft, left: 40, top: 68, width: 95, height: 80},
    {src: subject3Rocket, className: styles.rocketFloat, left: 227, top: -11, width: 75, height: 81},
    {src: subject3PinkAccent, className: styles.driftLeft, left: -3, top: 171, width: 51, height: 55},
    {src: subject3GreenAccent, className: styles.driftRight, left: -2, top: 224, width: 30, height: 28},
  ],
  'subject-4': [
    {src: subject4Ticket, className: styles.floatSlow, left: 27, top: 153, width: 136, height: 151},
    {src: subject4Ribbon, className: styles.driftRight, left: 256, top: 235, width: 105, height: 90},
    {src: subject4Core, className: styles.coreFloat, left: 79, top: -5, width: 298, height: 321},
    {src: subject4Badge, className: styles.floatFast, left: 29, top: 224, width: 77, height: 67},
    {src: subject4Coin, className: styles.coinFloat, left: 284, top: 215, width: 62, height: 61},
  ],
}

type LayeredMainVisualProps = {
  scheme?: string
  className?: string
  style?: React.CSSProperties
}

export default function LayeredMainVisual({
  scheme = 'subject-1',
  className,
  style,
}: LayeredMainVisualProps) {
  const layers = layerSets[scheme] || layerSets['subject-1']

  return (
    <div
      className={[styles.viewport, className].filter(Boolean).join(' ')}
      style={style}
      data-main-visual-scheme={scheme}
    >
      <div className={styles.canvas}>
        {layers.map((layer, index) => (
          <div
            className={styles.layer}
            key={`${scheme}-${index}`}
            style={(() => {
              const centerX = layer.left + layer.width / 2
              const centerY = layer.top + layer.height / 2
              const directionX = Math.round(((centerX - 193.5) / 193.5) * 8)
              const directionY = Math.round(((centerY - 153) / 153) * 7)
              const motionX = directionX || (centerX < 193.5 ? -3 : 3)
              const motionY = directionY || (centerY < 153 ? -3 : 3)

              return {
                left: `${(layer.left / 387) * 100}%`,
                top: `${(layer.top / 306) * 100}%`,
                width: `${(layer.width / 387) * 100}%`,
                height: `${(layer.height / 306) * 100}%`,
                zIndex: index,
                '--bloom-x': `${motionX}px`,
                '--bloom-y': `${motionY}px`,
                '--bloom-in-x': `${motionX * -0.22}px`,
                '--bloom-in-y': `${motionY * -0.22}px`,
                '--bloom-rotate': `${Math.max(-5, Math.min(5, motionX * 0.65))}deg`,
                '--bloom-in-rotate': `${Math.max(-2, Math.min(2, motionX * -0.2))}deg`,
              } as React.CSSProperties
            })()}
          >
            <img src={layer.src} className={layer.className} draggable={false} />
          </div>
        ))}
      </div>
    </div>
  )
}
