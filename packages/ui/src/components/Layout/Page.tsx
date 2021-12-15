import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const PageRoot = styled('div', {
  backgroundColor: '$Background2dp',
})

const PageWrapperFullscreen = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: '20px',
  width: '100%',
})

const PageWrapper = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: '20px',
  width: '100%',
  maxWidth: '860px',
  margin: '0 auto',
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
