export interface StickyBottomButtonProps {
  text?: string
  className?: string
  onClick?: () => void
}

export default function StickyBottomButton({
  text = '立即投放上热门',
  className,
  onClick,
}: StickyBottomButtonProps) {
  return (
    <div
      className={className || ''}
      style={{
        position: 'relative',
        width: 750,
        height: 287,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.5,
          width: 750,
          height: 234,
          backgroundImage: 'linear-gradient(180deg, #ffbbd800 0%, #ffbbd8 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          boxSizing: 'border-box',
          padding: '9px 143px 67px',
          width: 750,
          height: 186,
          backgroundImage:
            'url(https://cdn-tos-cn.bytedance.net/obj/ies-semi/images/mru92lp0-4v261rn.svg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          onClick={onClick}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--sticky-bottom-button-rectangle279335108-border-radius, 66px)',
            backgroundColor: 'var(--sticky-bottom-button-rectangle279335108-background-color, #ff1372)',
            padding: '26px 87px',
            backgroundImage:
              'linear-gradient(39.09deg, #ff2ec400 41.95%, #ff2ec4 142.85%)',
          }}
        >
          <p
            style={{
              margin: 0,
              color: 'var(--sticky-bottom-button-text-color, #ffffff)',
              fontFamily: 'var(--sticky-bottom-button-root-font-family, "Source Han Sans CN")',
              fontSize: 'var(--sticky-bottom-button-root-font-size, 40px)',
              fontWeight: 700,
              lineHeight: '56px',
              letterSpacing: 'var(--sticky-bottom-button-text-letter-spacing, 1.6px)',
              textAlign: 'left',
              verticalAlign: 'baseline',
              whiteSpace: 'nowrap',
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
