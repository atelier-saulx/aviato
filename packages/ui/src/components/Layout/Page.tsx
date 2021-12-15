import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const PageRoot = styled('div', {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'scroll',
  backgroundColor: '$Background2dp',
})

const PageWrapper = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  width: '100%',
  height: '100vh',
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

export const Page: FunctionComponent<PageProps> = ({
  mode = 'center',
  children,
}) => {
  return (
    <PageRoot>
      <PageWrapper mode={mode}>{children}</PageWrapper>
    </PageRoot>
  )
}
