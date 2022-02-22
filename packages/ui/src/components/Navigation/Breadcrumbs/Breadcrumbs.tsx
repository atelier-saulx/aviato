import React, {
  forwardRef,
  ElementRef,
  ReactNode,
  Children,
  cloneElement,
} from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { getIconFromName, IconName } from '~/components'

const StyledBreadcrumbs = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const StyledSeparator = styled('div', {
  marginLeft: '8px',
  marginRight: '8px',
})

export interface BreadcrumbsProps
  extends ComponentProps<typeof StyledBreadcrumbs> {
  separator?: ReactNode
  separatorIcon?: IconName
  children: ReactNode
}

export const Breadcrumbs = forwardRef<
  ElementRef<typeof StyledBreadcrumbs>,
  BreadcrumbsProps
>((properties, forwardedRef) => {
  const { children, separator, separatorIcon, ...remainingProps } = properties

  const DefaultIcon = getIconFromName('IconChevronRight')

  let TargetSeparator: ReactNode = <DefaultIcon />

  if (separator) {
    TargetSeparator = separator
  } else if (separatorIcon) {
    const TargetIcon = getIconFromName(separatorIcon)
    TargetSeparator = <TargetIcon />
  }

  const breadcrumbs = Children.toArray(children).reduce(
    (accumulator: ReactNode[], child: any, index, array) => {
      accumulator.push(cloneElement(child, { key: `breadcrumb-${index}` }))

      if (index !== array.length - 1) {
        accumulator.push(
          <StyledSeparator key={`separator-${index}`}>
            {TargetSeparator}
          </StyledSeparator>
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
