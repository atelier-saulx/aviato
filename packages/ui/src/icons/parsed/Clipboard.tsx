import React from 'react'
import { SVGProperties } from '../../types'

const SvgClipboard = (props: SVGProperties) => {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        fillOpacity={0.87}
        fillRule="evenodd"
        d="M4.66675 3.33339H4C3.82319 3.33339 3.65362 3.40363 3.5286 3.52866C3.40357 3.65368 3.33333 3.82325 3.33333 4.00006V13.3334C3.33333 13.5102 3.40357 13.6798 3.5286 13.8048C3.65362 13.9298 3.82319 14.0001 4 14.0001H12C12.1768 14.0001 12.3464 13.9298 12.4714 13.8048C12.5964 13.6798 12.6667 13.5102 12.6667 13.3334V4.00006C12.6667 3.82325 12.5964 3.65368 12.4714 3.52866C12.3464 3.40363 12.1768 3.33339 12 3.33339H11.3334V3.33341C11.3334 4.06979 10.7365 4.66675 10.0001 4.66675H6.00008C5.2637 4.66675 4.66675 4.06979 4.66675 3.33341V3.33339ZM10.0001 2.65616C10 2.65968 10 2.6632 10 2.66673C10 2.67026 10 2.67378 10.0001 2.67729V3.33341H6.00008V2.00008H10.0001V2.65616ZM11.3334 2.00006H12C12.5304 2.00006 13.0391 2.21077 13.4142 2.58585C13.7893 2.96092 14 3.46963 14 4.00006V13.3334C14 13.8638 13.7893 14.3725 13.4142 14.7476C13.0391 15.1227 12.5304 15.3334 12 15.3334H4C3.46957 15.3334 2.96086 15.1227 2.58579 14.7476C2.21071 14.3725 2 13.8638 2 13.3334V4.00006C2 3.46963 2.21071 2.96092 2.58579 2.58585C2.96086 2.21077 3.46957 2.00006 4 2.00006H4.66675C4.66676 1.26369 5.26371 0.666748 6.00008 0.666748H10.0001C10.7365 0.666748 11.3334 1.26369 11.3334 2.00006Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default SvgClipboard
