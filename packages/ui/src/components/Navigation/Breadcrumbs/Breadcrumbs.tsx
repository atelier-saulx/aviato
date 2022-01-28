import React, {
  forwardRef,
  ElementRef,
  ReactNode,
  Children,
  cloneElement,
} from 'react'
import { ComponentProps } from '@stitches/react'

import { StitchedCSS, styled } from '~/theme'
import { Text } from '~/components'

const StyledBreadcrumbs = styled('div', {
  display: 'flex',
})

const SeparatorCSS: StitchedCSS = {
  marginLeft: '8px',
  marginRight: '8px',
}

export interface BreadcrumbsProps
  extends ComponentProps<typeof StyledBreadcrumbs> {
  separator?: ReactNode
  children: ReactNode
}

export const Breadcrumbs = forwardRef<
  ElementRef<typeof StyledBreadcrumbs>,
  BreadcrumbsProps
>((properties, forwardedRef) => {
  const { children, separator = '/', ...remainingProps } = properties

  const breadcrumbs = Children.toArray(children).reduce(
    (accumulator: ReactNode[], child: any, index, array) => {
      accumulator.push(cloneElement(child, { key: `breadcrumb-${index}` }))

      if (index !== array.length - 1) {
        accumulator.push(
          <Text key={`separator-${index}`} css={SeparatorCSS}>
            {separator}
          </Text>
        )
      }

      return accumulator
    },
    []
  )

  return (
    <StyledBreadcrumbs ref={forwardedRef} {...remainingProps}>
      {breadcrumbs}
    </StyledBreadcrumbs>
  )
})

Breadcrumbs.displayName = 'Breadcrumbs'
