import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'
import { menuWidth } from '~/components/SideMenu'

const PageWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: '$Background2dp',

  variants: {
    sideMenu: {
      true: {
        paddingLeft: menuWidth,
      },
    },
  },
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
  hasSideMenu?: boolean
}

type ForwardProps = ComponentProps<typeof StyledPage> & PageProps

export const Page = React.forwardRef<
  ElementRef<typeof StyledPage>,
  ForwardProps
>((properties, forwardedRef) => {
  const { mode, hasSideMenu = true, children, ...remainingProps } = properties

  return (
    <PageWrapper sideMenu={hasSideMenu}>
      <StyledPage mode={mode} ref={forwardedRef} {...remainingProps}>
        {children}
      </StyledPage>
    </PageWrapper>
  )
})
