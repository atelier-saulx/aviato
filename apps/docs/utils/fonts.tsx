/**
 * Array of links for font-preloading.
 */
export const PreloadFonts: any = () => {
  return fontsToPreload.map((fontName, key) => {
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

/**
 * Curated list of fonts for preloading.
 */
export const fontsToPreload = [
  'Font-Regular.woff2',
  'Font-Bold.woff2',
  'Font-Medium.woff2',
  'Font-SemiBold.woff2',
  'Font-Black.woff2',
  'Font-ExtraBold.woff2',
  'Font-ExtraLight.woff2',
  'Font-Italic.woff2',
  'Font-Light.woff2',
  'Font-Thin.woff2',
  'Font-ExtraBoldItalic.woff2',
  'Font-BlackItalic.woff2',
  'Font-BoldItalic.woff2',
  'Font-ExtraLightItalic.woff2',
  'Font-LightItalic.woff2',
  'Font-MediumItalic.woff2',
  'Font-SemiBoldItalic.woff2',
  'Font-ThinItalic.woff2',
]

/**
 * Complete list of fonts.
 */
export const allFontNames = [
  'Font-ExtraBoldItalic.woff',
  'Font-Black.woff',
  'Font-Black.woff2',
  'Font-BlackItalic.woff',
  'Font-BlackItalic.woff2',
  'Font-Bold.woff',
  'Font-Bold.woff2',
  'Font-BoldItalic.woff',
  'Font-BoldItalic.woff2',
  'Font-ExtraBold.woff',
  'Font-ExtraBold.woff2',
  'Font-ExtraBoldItalic.woff2',
  'Font-ExtraLight.woff',
  'Font-ExtraLight.woff2',
  'Font-ExtraLightItalic.woff',
  'Font-ExtraLightItalic.woff2',
  'Font-Italic.woff',
  'Font-Italic.woff2',
  'Font-Light.woff',
  'Font-Light.woff2',
  'Font-LightItalic.woff',
  'Font-LightItalic.woff2',
  'Font-Medium.woff',
  'Font-Medium.woff2',
  'Font-MediumItalic.woff',
  'Font-MediumItalic.woff2',
  'Font-Regular.woff',
  'Font-Regular.woff2',
  'Font-SemiBold.woff',
  'Font-SemiBold.woff2',
  'Font-SemiBoldItalic.woff',
  'Font-SemiBoldItalic.woff2',
  'Font-Thin.woff',
  'Font-Thin.woff2',
  'Font-ThinItalic.woff',
  'Font-ThinItalic.woff2',
]
