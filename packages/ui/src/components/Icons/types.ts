import { StitchedCSS, Color } from '~/theme'
import { PropsEventHandler } from '~/components/BasedUI/types'

import { SVGProps } from 'react'

export type SvgElementProperties = SVGProps<SVGSVGElement>

// SvgElementProperties &
export type IconProps = {
  width?: number
  height?: number
  css?: StitchedCSS
  color?: Color
  onClick?: PropsEventHandler
}
