import React, { FunctionComponent } from 'react'
import { useColor } from '../../useColor'
import { SvgProps } from '..'

const Germany: FunctionComponent<SvgProps> = ({ framed, size, frameColor }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {framed ? (
        <rect width="24" height="24" rx="4" fill={useColor(frameColor)} />
      ) : null}
      <image
        id="image0"
        width="24"
        height="24"
        href="data:image/png;base64,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"
      />
    </svg>
  )
}

export default Germany
