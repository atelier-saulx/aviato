import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Video: FunctionComponent<SvgProps> = ({
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
        d="M6.09206 17H13.0917C14.4016 17 15.1837 16.2857 15.1837 15.0542V8.95197C15.1837 7.71429 14.4668 7 13.1568 7H6.09206C4.84073 7 4 7.71429 4 8.95197V15.0542C4 16.2857 4.78208 17 6.09206 17ZM16.0701 13.8165L18.4424 15.7562C18.664 15.9409 18.9246 16.0579 19.1593 16.0579C19.6676 16.0579 20 15.7069 20 15.202V8.79803C20 8.2931 19.6676 7.94212 19.1593 7.94212C18.9246 7.94212 18.664 8.05911 18.4424 8.24384L16.0701 10.1773V13.8165Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Video
