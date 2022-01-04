import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

const PageWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  overflowY: 'scroll',
  backgroundColor: '$Background2dp',
})

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

      fullscreen: {},
    },
  },
})

export type PageProps = {
  mode?: 'center' | 'fullscreen'
}

type ForwardProps = ComponentProps<typeof StyledPage> & PageProps

export const Page = React.forwardRef<
  ElementRef<typeof StyledPage>,
  ForwardProps
>((properties, forwardedRef) => {
  const { mode, children, ...remainingProps } = properties

  return (
    <PageWrapper>
      <StyledPage mode={mode} ref={forwardedRef} {...remainingProps}>
        {children}
      </StyledPage>
    </PageWrapper>
  )
})
