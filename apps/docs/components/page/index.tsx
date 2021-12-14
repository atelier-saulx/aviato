import { FunctionComponent } from 'react'
import { styled } from '@aviato/ui'

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
  if (!fullscreen) {
    return <PageWrapper>{children}</PageWrapper>
  }

  return <PageWrapperFullscreen>{children}</PageWrapperFullscreen>
}
