import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const MultipleChoice: FunctionComponent<SvgProps> = ({
  color,
  framed,
  size,
  frameColor,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {framed ? (
        <rect width="24" height="24" rx="4" fill={useColor(frameColor)} />
      ) : null}
      <path
        d="M6.86429 17.5H17.1357C18.3825 17.5 19 16.8786 19 15.6477V8.35225C19 7.1214 18.3825 6.5 17.1357 6.5H6.86429C5.62341 6.5 5 7.11543 5 8.35225V15.6477C5 16.8846 5.62341 17.5 6.86429 17.5ZM11.341 14.9188C11.1332 14.9188 10.9729 14.8351 10.8126 14.626L9.32824 12.7917C9.23325 12.6722 9.18575 12.5348 9.18575 12.4033C9.18575 12.1285 9.38762 11.9074 9.66073 11.9074C9.82697 11.9074 9.96353 11.9671 10.106 12.1643L11.3172 13.7238L13.8524 9.63091C13.9593 9.44568 14.1137 9.35606 14.274 9.35606C14.5352 9.35606 14.7786 9.53531 14.7786 9.81016C14.7786 9.94161 14.7014 10.085 14.6302 10.2045L11.8338 14.626C11.715 14.8232 11.5428 14.9188 11.341 14.9188Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default MultipleChoice
