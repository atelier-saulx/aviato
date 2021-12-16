export const globalResetText = () => resetCSS

const resetCSS = `
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */
html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the main element consistently in IE.
 */
main {
  display: block;
}

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd em font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace;
  font-size: 1em;
}

/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd em font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent sub and sup elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/**
 * Remove the border on images inside links in IE 10.
 */
img {
  border-style: none;
}

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */
button,
input {
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */
button,
select {
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */
button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */
button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 0;
}

/**
 * Correct the padding in Firefox.
 */
fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from fieldset elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    fieldset elements in all browsers.
 */
legend {
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */
[type='checkbox'],
[type='radio'] {
  box-sizing: border-box;
  padding: 0;
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */
[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to inherit in Safari.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/**
 * Add the correct display in IE 10+.
 */
template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */
[hidden] {
  display: none;
}

/**
 * Remove default margin
 */
* {
  margin: 0;
}

body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/**
 * Box sizing rules
 */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/**
 * Create a root stacking context
 */
#root,
#__next {
  isolation: isolate;
}

/**
 * Core root defaults
 */
html,
body {
  height: 100%;
  min-height: 100%;
  min-width: 100%;
}

html,
body {
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.15;
}

/**
 * A elements that don't have a class get default styles
 */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

a {
  text-decoration: none;
  color: inherit;
}

body,
form,
h1,
h2,
h3,
h4,
h5,
h6,
p {
  font: inherit;
}

base,
basefont,
datalist,
head,
meta,
script,
style,
title,
noembed,
param,
template {
  display: none;
}

/**
 * IMPORTANT: This removes the focus outline for most browsers.

 * Be aware this is a backwards accessibility step! Mozilla adds a dotted outline around A tags
 * and buttons when they receive tab focus which I haven't found an unhacky way of removing.
 */
a:focus,
button:focus {
  outline: 0;
}

button {
  appearance: none;
  background-color: transparent;
  border: 0;
  padding: 0;
}

select {
  appearance: none;
  background: none;
  border: 0;
}

ol,
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

input,
textarea,
fieldset {
  appearance: none;
  border: 0;
  padding: 0;
  color: inherit;
  margin: 0;
  border-radius: 0;
  min-width: 0;
  font: inherit;
}

input::-ms-clear {
  display: none;
}

textarea:focus,
input:focus select:focus {
  outline: none;
}

*:focus {
  outline: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  appearance: none;
}

iframe {
  border: none;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #9e9e9e;
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/**
 * Remove all animations and transitions for people that prefer not to see them
 */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

`
