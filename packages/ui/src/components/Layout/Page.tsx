import React, { ElementRef, forwardRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

const StyledPage = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  width: '100%',
  height: '100%',
  padding: '20px',

  variants: {
    mode: {
      center: {
        margin: '0 auto',
        maxWidth: '860px',
      },
    },
  },
})

export interface PageProps extends ComponentProps<typeof StyledPage> {
  mode?: 'center'
}

export const Page = forwardRef<ElementRef<typeof StyledPage>, PageProps>(
  (properties, forwardedRef) => {
    const { mode, children, ...remainingProps } = properties

    return (
      <StyledPage mode={mode} ref={forwardedRef} {...remainingProps}>
        {children}
      </StyledPage>
    )
  }
)
