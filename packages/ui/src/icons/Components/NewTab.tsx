import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const NewTab: FunctionComponent<SvgProps> = ({
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
        d="M17.6719 15.0781V7.74219C17.6719 7.29688 17.3906 7 16.9375 7L9.60156 7.01562C9.16406 7.01562 8.88281 7.33594 8.88281 7.70312C8.88281 8.07031 9.20312 8.38281 9.57031 8.38281H11.8906L15.6094 8.24219L14.1953 9.49219L7.21875 16.4844C7.07812 16.625 7 16.7969 7 16.9609C7 17.3281 7.32812 17.6797 7.71094 17.6797C7.89062 17.6797 8.05469 17.6094 8.19531 17.4688L15.1797 10.4766L16.4375 9.0625L16.2891 12.6172V15.1094C16.2891 15.4688 16.6016 15.7969 16.9844 15.7969C17.3516 15.7969 17.6719 15.4922 17.6719 15.0781Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default NewTab
