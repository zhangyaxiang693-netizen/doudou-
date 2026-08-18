import React, { useMemo } from 'react'
import { replaceSvgColors } from '../utils/svgColors'

interface InlineSvgProps {
  src: string
  className?: string
}

export default function InlineSvg({ src, className }: InlineSvgProps) {
  const markup = useMemo(() => replaceSvgColors(src), [src])
  return (
    <span
      className={className}
      style={{ display: 'block', lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: markup.replace('<svg ', '<svg style="width:100%;height:100%;display:block" ') }}
    />
  )
}
