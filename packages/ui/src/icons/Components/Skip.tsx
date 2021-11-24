import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Skip: FunctionComponent<SvgProps> = ({
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
        d="M20 11.75C20 11.4766 19.8906 11.2487 19.6719 11.0664L14.4219 6.69143C14.1484 6.45445 13.8385 6.418 13.4922 6.58206C13.1641 6.74612 13 7.01044 13 7.37503V16.125C13 16.4896 13.1641 16.7539 13.4922 16.918C13.8385 17.0821 14.1484 17.0456 14.4219 16.8086L19.6719 12.4336C19.8906 12.2513 20 12.0235 20 11.75Z"
        fill={useColor(color)}
      />
      <path
        opacity="0.7"
        d="M12.5 11.75C12.5 11.4766 12.3906 11.2487 12.1719 11.0664L6.92188 6.69143C6.64844 6.45445 6.33854 6.418 5.99219 6.58206C5.66406 6.74612 5.5 7.01044 5.5 7.37503V16.125C5.5 16.4896 5.66406 16.7539 5.99219 16.918C6.33854 17.0821 6.64844 17.0456 6.92188 16.8086L12.1719 12.4336C12.3906 12.2513 12.5 12.0235 12.5 11.75Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Skip
