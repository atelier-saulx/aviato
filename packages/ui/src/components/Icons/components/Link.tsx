import React from 'react'
import { IconProps } from '../types'
import { Wrapper } from '../Wrapper'

const IconLink = (x: IconProps) => {
  let { color, css, onClick, ...props } = x

  if (!css) {
    css = {
      color,
    }
  }

  if (!css.color) {
    css.color = color
  }

  return (
    <Wrapper onClick={onClick} css={css}>
      <svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.66667}
          d="M8.3335 10.8333C8.69137 11.3118 9.14796 11.7077 9.67229 11.9941C10.1966 12.2806 10.7764 12.4509 11.3724 12.4936C11.9683 12.5363 12.5665 12.4503 13.1263 12.2415C13.6861 12.0327 14.1944 11.7059 14.6168 11.2833L17.1168 8.78335C17.8758 7.9975 18.2958 6.94499 18.2863 5.85251C18.2768 4.76002 17.8386 3.71497 17.0661 2.94243C16.2935 2.1699 15.2485 1.7317 14.156 1.7222C13.0635 1.71271 12.011 2.13269 11.2252 2.89168L9.79183 4.31668"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.66667}
          d="M11.6668 9.16665C11.309 8.68821 10.8524 8.29233 10.328 8.00587C9.80371 7.7194 9.22391 7.54905 8.62796 7.50637C8.03201 7.46369 7.43384 7.54968 6.87405 7.7585C6.31425 7.96732 5.8059 8.29409 5.3835 8.71665L2.8835 11.2167C2.12451 12.0025 1.70453 13.055 1.71402 14.1475C1.72352 15.24 2.16172 16.285 2.93426 17.0576C3.70679 17.8301 4.75184 18.2683 5.84433 18.2778C6.93681 18.2873 7.98932 17.8673 8.77517 17.1083L10.2002 15.6833"
        />
      </svg>
    </Wrapper>
  )
}

export default IconLink
