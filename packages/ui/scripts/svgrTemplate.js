function template({ template }, opts, { componentName, jsx }) {
  const typeScriptTpl = template.smart({
    plugins: ['typescript'],
  })

  return typeScriptTpl.ast`
    import React from 'react';
    import { SVGProperties } from './types';

    function ${componentName}(properties: SVGProperties) {
      return ${jsx};
    }

    export default ${componentName};
  `
}

module.exports = template
