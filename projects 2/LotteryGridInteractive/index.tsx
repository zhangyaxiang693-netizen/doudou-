import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { createCssVars } from '../src/utils/cssVars'
import styles from './index.module.scss'

const resultBgUrl = new URL('../抽奖弹窗/assets/image_1.svg', import.meta.url).href
const resultPrizeUrl = new URL('../抽奖弹窗/assets/image_3.svg', import.meta.url).href

export interface LotteryGridInteractiveProps {
  prize1?: string
  prize2?: string
  prize3?: string
  prize4?: string
  prize5?: string
  prize6?: string
  prize7?: string
  prize8?: string
  prizeImage1?: string
  prizeImage2?: string
  prizeImage3?: string
  prizeImage4?: string
  prizeImage5?: string
  prizeImage6?: string
  prizeImage7?: string
  prizeImage8?: string
  buttonText?: string
  resultTitle?: string
  resultHintText?: string
  resultButtonText?: string
  resultBadgeText?: string
  rollingRounds?: number
  buttonBgColor?: string
  buttonBorderRadius?: number
  prizeFontFamily?: string
  prizeFontSize?: string
  prizeColor?: string
  prizeLetterSpacing?: string
  buttonFontFamily?: string
  buttonFontSize?: string
  buttonColor?: string
  buttonSkewX?: number
  className?: string
}

const rollingOrder = [0, 1, 2, 4, 7, 6, 5, 3]

type LotteryTriggerEvent = {
  preventDefault?: () => void
  stopPropagation?: () => void
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export default function LotteryGridInteractive({
  prize1 = '666元流量扶持',
  prize2 = '满68赠6流量券',
  prize3 = '满100赠10流量券',
  prize4 = 'DOU仔冰箱贴',
  prize5 = 'DOU仔帆布包',
  prize6 = '满30赠5代投券',
  prize7 = 'DOU仔挂件',
  prize8 = 'DOU仔玩偶',
  prizeImage1 = '',
  prizeImage2 = '',
  prizeImage3 = '',
  prizeImage4 = '',
  prizeImage5 = '',
  prizeImage6 = '',
  prizeImage7 = '',
  prizeImage8 = '',
  buttonText = '抽',
  resultTitle = '恭喜抽中{prize}！',
  resultHintText = '快去填写地址吧~',
  resultButtonText = '填写地址',
  resultBadgeText = '?',
  rollingRounds = 4,
  buttonBgColor = 'rgba(255, 19, 114, 1)',
  buttonBorderRadius = 40,
  prizeFontFamily = 'Source Han Sans CN',
  prizeFontSize = '22px',
  prizeColor = 'rgba(45, 45, 45, 1)',
  prizeLetterSpacing = '0px',
  buttonFontFamily = 'MFYuanHeiNoncommercial-Regular',
  buttonFontSize = '102.95px',
  buttonColor = 'rgba(255, 255, 255, 1)',
  buttonSkewX = -4,
  className,
}: LotteryGridInteractiveProps) {
  const [activePrizeIndex, setActivePrizeIndex] = useState<number | null>(null)
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [resultOpen, setResultOpen] = useState(false)
  const runIdRef = useRef(0)
  const rollingRef = useRef(false)
  const lastTriggerPointerRef = useRef({ time: 0, x: 0, y: 0 })
  const rootRef = useRef<HTMLDivElement | null>(null)
  const drawButtonRef = useRef<HTMLDivElement | null>(null)

  const cssVars = createCssVars({
    lotteryGridPrizeFontFamily: prizeFontFamily,
    lotteryGridPrizeFontSize: prizeFontSize,
    lotteryGridPrizeColor: prizeColor,
    lotteryGridPrizeLetterSpacing: prizeLetterSpacing,
    lotteryGridButtonFontFamily: buttonFontFamily,
    lotteryGridButtonFontSize: buttonFontSize,
    lotteryGridButtonColor: buttonColor,
    lotteryGridButtonSkewX: `${buttonSkewX}deg`,
    lotteryGridButtonBgColor: buttonBgColor,
    lotteryGridButtonBorderRadius: `${buttonBorderRadius}px`,
  })

  const prizes = useMemo(
    () => [
      { text: prize1, image: prizeImage1 },
      { text: prize2, image: prizeImage2 },
      { text: prize3, image: prizeImage3 },
      { text: prize4, image: prizeImage4 },
      { text: prize5, image: prizeImage5 },
      { text: prize6, image: prizeImage6 },
      { text: prize7, image: prizeImage7 },
      { text: prize8, image: prizeImage8 },
    ],
    [
      prize1,
      prize2,
      prize3,
      prize4,
      prize5,
      prize6,
      prize7,
      prize8,
      prizeImage1,
      prizeImage2,
      prizeImage3,
      prizeImage4,
      prizeImage5,
      prizeImage6,
      prizeImage7,
      prizeImage8,
    ],
  )

  const winner = winnerIndex == null ? null : prizes[winnerIndex]
  const resultTitleText = winner
    ? resultTitle.replace(/\{prize\}/g, winner.text)
    : resultTitle

  const blockBuilderInteraction = (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrawPointerDownCapture = (event: React.PointerEvent) => {
    blockBuilderInteraction(event)
    if (event.button !== 0) return

    const now = Date.now()
    const last = lastTriggerPointerRef.current
    const distance = Math.hypot(event.clientX - last.x, event.clientY - last.y)
    const isSecondTap = now - last.time <= 450 && distance <= 18

    lastTriggerPointerRef.current = {
      time: isSecondTap ? 0 : now,
      x: event.clientX,
      y: event.clientY,
    }

    if (isSecondTap) startLottery(event)
  }

  const handleDrawClick = (event: React.MouseEvent) => {
    blockBuilderInteraction(event)
    if (event.detail >= 2) startLottery(event)
  }

  const startLottery = async (event?: LotteryTriggerEvent) => {
    event?.preventDefault()
    event?.stopPropagation()
    if (rollingRef.current) return

    rollingRef.current = true
    const currentRunId = runIdRef.current + 1
    runIdRef.current = currentRunId
    const nextWinnerIndex = Math.floor(Math.random() * prizes.length)
    const winnerOrderIndex = rollingOrder.indexOf(nextWinnerIndex)
    const safeRounds = Math.max(1, Number(rollingRounds) || 4)
    const totalSteps = safeRounds * rollingOrder.length + winnerOrderIndex + 1

    setIsRolling(true)
    setResultOpen(false)
    setWinnerIndex(null)

    for (let step = 0; step < totalSteps; step += 1) {
      if (runIdRef.current !== currentRunId) return
      const orderIndex = step % rollingOrder.length
      setActivePrizeIndex(rollingOrder[orderIndex])
      const progress = step / Math.max(1, totalSteps - 1)
      const delay = 70 + Math.round(progress * progress * 210)
      await sleep(delay)
    }

    if (runIdRef.current !== currentRunId) return
    setActivePrizeIndex(nextWinnerIndex)
    setWinnerIndex(nextWinnerIndex)
    setIsRolling(false)
    rollingRef.current = false
    await sleep(260)
    if (runIdRef.current === currentRunId) setResultOpen(true)
  }

  useEffect(() => {
    const drawButton = drawButtonRef.current
    if (!drawButton) return

    const blockNativeInteraction = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
    }

    const handleNativeMouseDown = (event: MouseEvent) => {
      blockNativeInteraction(event)
      if (event.button !== 0) return

      const now = Date.now()
      const last = lastTriggerPointerRef.current
      const distance = Math.hypot(event.clientX - last.x, event.clientY - last.y)
      const isSecondTap = now - last.time <= 450 && distance <= 18

      lastTriggerPointerRef.current = {
        time: isSecondTap ? 0 : now,
        x: event.clientX,
        y: event.clientY,
      }

      if (isSecondTap) startLottery(event)
    }

    const handleNativeDblClick = (event: MouseEvent) => {
      blockNativeInteraction(event)
      startLottery(event)
    }

    const handleNativeKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      blockNativeInteraction(event)
      startLottery(event)
    }

    drawButton.addEventListener('mousedown', handleNativeMouseDown, true)
    drawButton.addEventListener('dblclick', handleNativeDblClick, true)
    drawButton.addEventListener('keydown', handleNativeKeyDown, true)

    return () => {
      drawButton.removeEventListener('mousedown', handleNativeMouseDown, true)
      drawButton.removeEventListener('dblclick', handleNativeDblClick, true)
      drawButton.removeEventListener('keydown', handleNativeKeyDown, true)
    }
  }, [prizes, rollingRounds])

  const closeResult = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setResultOpen(false)
  }

  const renderPrize = (index: number) => {
    const prize = prizes[index]
    return (
      <div
        className={`${styles.prizeCard} ${activePrizeIndex === index ? styles.prizeCardActive : ''}`}
        data-prize-index={index}
      >
        <div className={styles.prizeGlow} />
        {prize.image ? (
          <div className={styles.prizeImageWrap} style={{ backgroundImage: `url(${prize.image})` }} />
        ) : (
          <div className={styles.placeholder} />
        )}
        <div className={styles.prizeText}>{prize.text}</div>
      </div>
    )
  }

  const resultLayer =
    resultOpen && winner ? (
      <div className={styles.resultLayer} onClick={closeResult}>
        <div className={styles.resultAmbient} aria-hidden="true">
          <div className={styles.resultRings}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.resultParticles}>
            {Array.from({ length: 14 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
        <div className={styles.resultDialog} onClick={(event) => event.stopPropagation()}>
          <div className={styles.resultTemplateBg}>
            <img src={resultBgUrl} className={styles.resultBgImage} alt="" />
          </div>
          <div className={styles.resultHint}>{resultHintText}</div>
          <div className={styles.resultTitle}>{resultTitleText}</div>
          <button type="button" onClick={closeResult}>
            {resultButtonText}
          </button>
          <div className={styles.resultPrizeMark}>
            <img src={resultPrizeUrl} className={styles.resultPrizeImage} alt="" />
            <div className={styles.resultBadge}>{resultBadgeText}</div>
          </div>
        </div>
      </div>
    ) : null
  const pageLayerTarget = rootRef.current?.closest<HTMLElement>('[data-page-id]')

  return (
    <div ref={rootRef} className={`${styles.page} ${className || ''}`} style={cssVars}>
      <div className={styles.grid}>
        {renderPrize(0)}
        {renderPrize(1)}
        {renderPrize(2)}
        {renderPrize(3)}
        <div
          ref={drawButtonRef}
          role="button"
          tabIndex={0}
          className={styles.drawButton}
          data-lottery-draw-trigger
          onPointerDownCapture={handleDrawPointerDownCapture}
          onClick={handleDrawClick}
          onDoubleClick={startLottery}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') startLottery(event)
          }}
          aria-disabled={isRolling}
        >
          <span>{buttonText}</span>
        </div>
        {renderPrize(4)}
        {renderPrize(5)}
        {renderPrize(6)}
        {renderPrize(7)}
      </div>

      {pageLayerTarget && resultLayer ? createPortal(resultLayer, pageLayerTarget) : resultLayer}
    </div>
  )
}
