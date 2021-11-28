import '../styles/reset.css'
import '../styles/font.css'

import React, { FunctionComponent } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { SideMenu } from '../components/side-menu'
import { initialiseApplication } from '../utils'

initialiseApplication()

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

  const MainWrapper: FunctionComponent = ({ children }) => {
    return (
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          overflowX: 'hidden',
        }}
      >
        {children}
      </div>
    )
  }

  const ContentWrapper = ({ children }: any) => {
    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          padding: '10px',
          overflowX: 'hidden',
        }}
      >
        {children}
      </div>
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

const App = (props: AppProps) => {
  return MainApplication(props)
}

export default App
