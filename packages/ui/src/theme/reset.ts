export const globalReset = {
  html: {
    '-webkit-font-smoothing': 'antialiased',
    '-webkit-text-size-adjust': '100%',
  },

  '*': {
    userSelect: 'none',
    '-webkit-tap-highlight-color': 'transparent',
    'border-color': 'inherit',
    borderWidth: '1px',
  },

  '*, *::before, *::after': {
    'box-sizing': 'border-box',
  },

  /* Inherit fonts and reset margins */
  'body, h1, h2, h3, h4, p, figure, blockquote': {
    margin: 0,
    font: 'inherit',
  },
  'dl, dd, input, button, textarea, select': {
    margin: 0,
    font: 'inherit',
  },

  /* Set core root defaults */
  'html:focus-within': {
    'scroll-behavior': 'smooth',
  },

  body: {
    'min-height': '100vh',
    'text-rendering': 'optimizeSpeed',
    lineHeight: '1.5',
  },

  /* Make images easier to work with */
  'img, picture': {
    'max-width': '100%',
    display: 'block',
  },

  /* A elements that don't have a class get default styles */
  'a:not([class])': {
    'text-decoration-skip-ink': 'auto',
  },

  'input, textarea, fieldset': {
    appearance: 'none',
    border: '0',
    padding: '0',
    color: 'inherit',
    margin: '0',
    borderRadius: '0',
    minWidth: '0',
    font: 'inherit',
  },

  /* For IE, we want to remove the default cross ('X') that appears in input fields when a user starts typing - Make sure you add your own! */
  'input::-ms-clear': {
    display: 'none',
  },
}
