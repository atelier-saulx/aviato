import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const NewUser: FunctionComponent<SvgProps> = ({
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
        d="M15.0391 12.1094C16.2988 12.1094 17.3828 10.9844 17.3828 9.51953C17.3828 8.07227 16.293 7 15.0391 7C13.791 7 12.6953 8.0957 12.7012 9.53125C12.7012 10.9844 13.7852 12.1094 15.0391 12.1094ZM11.3594 17.5352H18.7188C19.6387 17.5352 19.9668 17.2715 19.9668 16.7559C19.9668 15.2441 18.0742 13.1582 15.0391 13.1582C11.998 13.1582 10.1055 15.2441 10.1055 16.7559C10.1055 17.2715 10.4336 17.5352 11.3594 17.5352Z"
        fill={useColor(color)}
      />
      <path
        d="M10.334 9.98828C10.334 11.2598 9.39062 12.2441 8.29492 12.2441C7.20508 12.2441 6.25586 11.2598 6.25586 10C6.25 8.75195 7.21094 7.79688 8.29492 7.79688C9.38477 7.79688 10.334 8.72852 10.334 9.98828Z"
        fill={useColor(color)}
        fillOpacity="0.7"
      />
      <path
        d="M9.47852 17.5352H5.03125C4.28711 17.5352 4 17.2422 4 16.7148C4 15.0918 5.65234 13.1406 8.29492 13.1406C9.38477 13.1406 10.2227 13.4629 10.8789 13.8965C9.61328 14.8691 8.86914 16.6504 9.47852 17.5352Z"
        fill={useColor(color)}
        fillOpacity="0.7"
      />
    </svg>
  )
}

export default NewUser
