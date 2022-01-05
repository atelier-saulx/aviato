import '@aviato/ui/css/reset.css'
import '@aviato/ui/css/fonts.css'
import '../styles/playground.css'

import React from 'react'

import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThemeProvider, ApplicationRoot } from '@aviato/ui'

import { initialiseApplication } from '../utils'
import { SideMenu } from '../components/side-menu'

initialiseApplication()

const MainApplication = ({ Component, pageProps }: AppProps) => {
  const HeadContent = () => {
    return (
      <Head>
        <title>Aviato-UI</title>
        <meta property="og:title" content="Aviato-UI" key="title" />
      </Head>
    )
  }

  return (
    <>
      <HeadContent />

      <ThemeProvider>
        <ApplicationRoot navigation={<SideMenu />}>
          <Component {...pageProps} />
        </ApplicationRoot>
      </ThemeProvider>
    </>
  )
}

export default MainApplication
