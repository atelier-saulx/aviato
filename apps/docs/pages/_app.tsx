import '@aviato/ui/css/reset.css'
import '@aviato/ui/css/fonts.css'
import '../styles/playground.css'

import React from 'react'

import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import { initialiseApplication } from '../utils'
import { SideMenu } from '../components/side-menu'
import { themes, ApplicationRoot, styled } from '@aviato/ui'

import { ToggleThemeButton } from '../components/toggle-theme'

initialiseApplication()

const TopRight = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  paddingTop: 10,
  paddingRight: 16,
})

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
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        defaultTheme="system"
        value={themes}
      >
        <ApplicationRoot>
          <SideMenu />
          <Component {...pageProps} />

          <TopRight>
            <ToggleThemeButton />
          </TopRight>
        </ApplicationRoot>
      </ThemeProvider>
    </>
  )
}

export default MainApplication
