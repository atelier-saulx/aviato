import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const EmptyLine: FunctionComponent<SvgProps> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7801 13.7198C15.0733 14.013 15.0733 14.487 14.7801 14.7803C14.6338 14.9265 14.4418 15 14.2499 15C14.0579 15 13.8659 14.9265 13.7196 14.7803L12 13.0606L10.2804 14.7803C10.1341 14.9265 9.94213 15 9.75014 15C9.55815 15 9.36616 14.9265 9.21992 14.7803C8.92669 14.487 8.92669 14.013 9.21992 13.7198L10.9396 12.0001L9.21992 10.2804C8.92669 9.98716 8.92669 9.51317 9.21992 9.21993C9.51316 8.92669 9.98713 8.92669 10.2804 9.21993L12 10.9396L13.7196 9.21993C14.0129 8.92669 14.4868 8.92669 14.7801 9.21993C15.0733 9.51317 15.0733 9.98716 14.7801 10.2804L13.0604 12.0001L14.7801 13.7198ZM12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default EmptyLine
