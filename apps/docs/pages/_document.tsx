import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

import { getCssText } from '@aviato/ui'
import { fontNames } from '../utils/font-names'

export default class Document extends NextDocument {
  render() {
    const PreloadFonts: any = () => {
      return fontNames.map((fontName, key) => {
        const splitFont = fontName.split('.')
        const fontType = splitFont[splitFont.length - 1]

        return (
          <link
            key={`FontName-${key}`}
            rel="preload"
            href={`/fonts/${fontName}`}
            as="font"
            type={`font/${fontType}`}
            crossOrigin="anonymous"
          />
        )
      })
    }

    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <PreloadFonts />
          <link
            rel="preload"
            href="/fonts/Font-Black.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
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
