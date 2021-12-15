import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const PageRoot = styled('div', {
  backgroundColor: '$Background2dp',
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'scroll',
})

const PageWrapperFullscreen = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: '20px',
  width: '100%',
  height: '100vh',
})

const PageWrapper = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: '20px',
  margin: '0 auto',
  width: '100%',
  maxWidth: '860px',
  height: '100vh',
})

export type PageProps = {
  fullscreen?: boolean
}

export const Page: FunctionComponent<PageProps> = ({
  fullscreen = false,
  children,
}) => {
  const Wrapper = fullscreen ? PageWrapperFullscreen : PageWrapper

  return (
    <PageRoot>
      <Wrapper>{children}</Wrapper>
    </PageRoot>
  )
}
