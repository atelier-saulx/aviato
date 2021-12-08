import { SVGProps } from 'react'

type SvgElementProperties = SVGProps<SVGSVGElement>

export interface SVGProperties {
  fill: SvgElementProperties['fill']
}
