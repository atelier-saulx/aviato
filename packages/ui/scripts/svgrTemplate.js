// const propTypesTemplate = (
//   { imports, interfaces, componentName, props, jsx, exports },
//   { tpl }
// ) => {
//   return tpl`${imports}
// ${interfaces}

// function ${componentName}(${props}) {
//   return ${jsx};
// }

// ${exports}
//   `
// }

// module.exports = propTypesTemplate

function template(
  { template },
  opts,
  { imports, componentName, props, jsx, exports }
) {
  const typeScriptTpl = template.smart({
    plugins: ['typescript'],
  })

  return typeScriptTpl.ast`
    import React, { SVGProps } from 'react';

    function ${componentName}(${props}) {
      return ${jsx};
    }

    export default ${componentName};
  `
}

module.exports = template
