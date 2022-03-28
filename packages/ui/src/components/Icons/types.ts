import { StitchedCSS, Color } from '~/theme'

import { SVGProps } from 'react'

type SvgElementProperties = SVGProps<SVGSVGElement>

// SvgElementProperties &
export type IconProps = {
  width?: number
  height?: number
  css?: StitchedCSS
  color?: Color
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}
