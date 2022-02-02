import '@aviato/ui/css/reset.css'
import '@aviato/ui/css/fonts.css'
import '../styles/playground.css'

import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ApplicationRoot } from '@aviato/ui'

import { initialiseApplication } from '../utils'
import { SideMenu } from '../components/side-menu'
import { Header } from '../components/header'

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

      <ApplicationRoot navigation={<SideMenu />} header={<Header />} SSR>
        <Component {...pageProps} />
      </ApplicationRoot>
    </>
  )
}

export default MainApplication
