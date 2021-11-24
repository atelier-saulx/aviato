# based-ui

Monorepo containing three front-end packages: [ui](#ui-package), [theme](#theme-package), [icons](#icon-package).

## UI package

This contains several React components, such as `Button, Input, Label` and several types of `Collection`s.

**This package has both _Icons_ and _Themes_ as its dependencies.**

```jsx
import React from "react";
import { Button, Input } from "@based/ui";

export default () => {
  return (
    <>
      <Button>Test</Button>
    </>
  );
};
```

Each component takes several props.

## Theme package

This package contains common style and theme elements.

```jsx
import React from "react";
import { useColor } from "@based/theme";

export default () => {
  return (
    <div
      style={{
        padding: 16,
        border: "solid 1px " + useColor({ color: "divider" }),
        borderRadius: 8,
      }}
    ></div>
  );
};
```

## Icon package

This package contains icons that can be passed to the UI components.

```jsx
import React from 'react'
import { Button } from '@based/ui'

export default () => {
    return (
    <>
        <Button
            icon="Add"
            onClick={{
                console.info('flurpyflurp')
            }}>
        Test
        </Button>
    </>
    )
}
```
