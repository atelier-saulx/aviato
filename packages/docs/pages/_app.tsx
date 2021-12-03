import '../styles/reset.css'
import '../styles/font.css'

import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'

import { withPasswordProtect } from '@storyofams/next-password-protect'

import { initialiseApplication } from '../utils'
import { SideMenu } from '../components/side-menu'
import { styled, MenuWidthConstant } from '@aviato/ui'

initialiseApplication()

const MainWrapper = styled('div', {
  display: 'flex',
  width: '100vw',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'hidden',
})

const ContentWrapper = styled('div', {
  position: 'relative',
  width: `calc(100vw - ${MenuWidthConstant}px)`,
  height: '100vh',
  padding: '10px',
  overflowX: 'hidden',
  overflowY: 'scroll',
})

const MainApplication = ({ Component, pageProps }: AppProps) => {
  const HeadContent = () => {
    return (
      <Head>
        <title>Aviato-UI</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
        />
        <meta property="og:title" content="Aviato-UI" key="title" />
      </Head>
    )
  }

  return (
    <>
      <HeadContent />

      <MainWrapper>
        <SideMenu />
        <ContentWrapper>
          <Component {...pageProps} />
        </ContentWrapper>
      </MainWrapper>
    </>
  )
}

export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(MainApplication)
  : MainApplication
