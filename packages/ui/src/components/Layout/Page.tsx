import React, { ElementRef } from 'react'
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

export type PageProps = {
  mode?: 'center'
}

type ForwardProps = ComponentProps<typeof StyledPage> & PageProps

export const Page = React.forwardRef<
  ElementRef<typeof StyledPage>,
  ForwardProps
>((properties, forwardedRef) => {
  const { mode, children, ...remainingProps } = properties

  return (
    <StyledPage mode={mode} ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledPage>
  )
})
