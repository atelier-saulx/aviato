export const globalFontsText = () => fontsCSS

const fontsCSS = `
@font-face {
  font-family: 'Font';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url('/fonts/Font-Thin.woff2') format('woff2'),
    url('/fonts/Font-Thin.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: url('/fonts/Font-ThinItalic.woff2') format('woff2'),
    url('/fonts/Font-ThinItalic.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url('/fonts/Font-ExtraLight.woff2') format('woff2'),
    url('/fonts/Font-ExtraLight.woff') format('woff');
}
@font-face {
  font-family: 'Font';
  font-style: italic;
  font-weight: 200;
  font-display: swap;
  src: url('/fonts/Font-ExtraLightItalic.woff2') format('woff2'),
    url('/fonts/Font-ExtraLightItalic.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('/fonts/Font-Light.woff2') format('woff2'),
    url('/fonts/Font-Light.woff') format('woff');
}
@font-face {
  font-family: 'Font';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: url('/fonts/Font-LightItalic.woff2') format('woff2'),
    url('/fonts/Font-LightItalic.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/Font-Regular.woff2') format('woff2'),
    url('/fonts/Font-Regular.woff') format('woff');
}
@font-face {
  font-family: 'Font';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/Font-Italic.woff2') format('woff2'),
    url('/fonts/Font-Italic.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/Font-Medium.woff2') format('woff2'),
    url('/fonts/Font-Medium.woff') format('woff');
}
@font-face {
  font-family: 'Font';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/Font-MediumItalic.woff2') format('woff2'),
    url('/fonts/Font-MediumItalic.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/Font-SemiBold.woff2') format('woff2'),
    url('/fonts/Font-SemiBold.woff') format('woff');
}
@font-face {
  font-family: 'Font';
  font-style: italic;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/Font-SemiBoldItalic.woff2') format('woff2'),
    url('/fonts/Font-SemiBoldItalic.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/Font-Bold.woff2') format('woff2'),
    url('/fonts/Font-Bold.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/Font-BoldItalic.woff2') format('woff2'),
    url('/fonts/Font-BoldItalic.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/Font-ExtraBold.woff2') format('woff2'),
    url('/fonts/Font-ExtraBold.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: italic;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/Font-ExtraBoldItalic.woff2') format('woff2'),
    url('/fonts/Font-ExtraBoldItalic.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('/fonts/Font-Black.woff2') format('woff2'),
    url('/fonts/Font-Black.woff') format('woff');
}

@font-face {
  font-family: 'Font';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: url('/fonts/Font-BlackItalic.woff2') format('woff2'),
    url('/fonts/Font-BlackItalic.woff') format('woff');
}

@font-face {
  font-family: 'Font var';
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
  font-named-instance: 'Regular';
  src: url('/fonts/Font-roman.var.woff2') format('woff2');
}

@font-face {
  font-family: 'Font var';
  font-weight: 100 900;
  font-display: swap;
  font-style: italic;
  font-named-instance: 'Italic';
  src: url('/fonts/Font-italic.var.woff2') format('woff2');
}

html {
  font-family: Font;
}

`
