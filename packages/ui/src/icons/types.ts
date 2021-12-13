import { SVGProps } from 'react'

type SvgElementProperties = SVGProps<SVGSVGElement>

/**
 * Extend from default SVG properties, expose having custom props in the future.
 */
export interface SVGProperties extends SVGProps<SVGSVGElement> {
  fill?: SvgElementProperties['fill']
  width?: SvgElementProperties['width']
  height?: SvgElementProperties['height']
}
