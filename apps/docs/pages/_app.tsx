import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { withPasswordProtect } from '@storyofams/next-password-protect'

import { initialiseApplication } from '../utils'
import { SideMenu } from '../components/side-menu'
import { themes, ApplicationRoot, Conditional } from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

initialiseApplication()

let loadingScreenTimeout

const MainApplication = ({ Component, pageProps }: AppProps) => {
  const hasLoaded = useHasLoaded()
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  /**
   * On first load, hide content and show progress bar.
   */
  useEffect(() => {
    if (!isFirstLoad || loadingScreenTimeout) return

    NProgress.start()

    loadingScreenTimeout = setTimeout(() => {
      setIsFirstLoad(false)
      NProgress.done()
    }, 200)
  }, [hasLoaded, isFirstLoad])

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
        <Conditional test={!isFirstLoad}>
          <ApplicationRoot>
            <SideMenu />
            <Component {...pageProps} />
          </ApplicationRoot>
        </Conditional>
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
