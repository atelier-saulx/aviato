import { SVGProps } from 'react'

type SvgElementProperties = SVGProps<SVGSVGElement>

/**
 * Extend default SVG properties
 */
export interface SVGProperties extends SVGProps<SVGSVGElement> {
  fill?: SvgElementProperties['fill']
  width?: SvgElementProperties['width']
  height?: SvgElementProperties['height']
}
