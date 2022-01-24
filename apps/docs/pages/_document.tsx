import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

import { getCssAndReset } from '@aviato/ui'
import { PreloadFonts } from '../utils/fonts'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <PreloadFonts />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{
              __html: getCssAndReset(),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
