import '@aviato/ui/dist/css/reset.css'
import '@aviato/ui/dist/css/fonts.css'

import React from 'react'

import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import { withPasswordProtect } from '@storyofams/next-password-protect'

import { initialiseApplication } from '../utils'
import { SideMenu } from '../components/side-menu'
import { themes, ApplicationRoot } from '@aviato/ui'

import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

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
        <link rel="shortcut icon" href="/favicon.ico" />
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
