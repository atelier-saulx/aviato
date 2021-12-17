import '@aviato/ui/css/reset.css'
import '@aviato/ui/css/fonts.css'
import '../styles/nprogress.css'
import '../styles/playground.css'

import React from 'react'

import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import { withPasswordProtect } from '@storyofams/next-password-protect'

import { initialiseApplication } from '../utils'
import { SideMenu } from '../components/side-menu'
import { themes, ApplicationRoot, styled } from '@aviato/ui'

import Router from 'next/router'
import NProgress from 'nprogress'

import { ToggleThemeButton } from '../components/toggle-theme'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

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

const hasPasswordProtection = process.env.PASSWORD_PROTECT || false

const ExportedApplication = hasPasswordProtection
  ? withPasswordProtect(MainApplication, {
      loginComponentProps: {
        logo: 'https://i.ibb.co/b1B1ZyT/android-chrome-512x512.png',
        backUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        buttonBackgroundColor: '#3D53E7',
        buttonColor: 'white',
      },
    })
  : MainApplication

export default ExportedApplication
