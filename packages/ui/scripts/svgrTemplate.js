const astTemplate = require('./astTemplate')

function template(_flap, opts, { jsx, componentName }) {
  return astTemplate(jsx, componentName.name.replace('Svg', 'Icon'))
}

module.exports = template
