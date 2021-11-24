import '../styles/reset.css'
import '../styles/font.css'

import type { AppProps } from 'next/app'

import Head from 'next/head'

import { SideMenu } from '../components/side-menu'

const HeadContent = () => {
  return (
    <Head>
      <title>Based-UI Documentation</title>
      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
      />
      <meta property="og:title" content="Aviato-UI" key="title" />
    </Head>
  )
}

function App({ Component, pageProps }: AppProps) {
  const MainWrapper = ({ children }: any) => {
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

export default App
