module.exports = {
  multipass: true, // boolean. false by default

  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },

  plugins: [
    // Convert colors to currentColor
    {
      name: 'convertColors',
      params: {
        currentColor: true,
      },
    },

    // Remove specific attributes
    {
      name: 'removeAttrs',
      params: {
        attrs: '(xmlns|fill-opacity|stroke-opacity)',
      },
    },

    // Sort remaining attributes
    {
      name: 'sortAttrs',
      params: {
        xmlnsOrder: 'alphabetical',
      },
    },
  ],
}
