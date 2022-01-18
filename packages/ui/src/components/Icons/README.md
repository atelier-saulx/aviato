### SUMMARY

Utilities used:

- https://www.vandebron.tech/blog/optimizing-converting-and-exporting-svg-icons-in-react
- https://react-svgr.com/docs/cli/

### HOW TO USE

You can import icons individually.

```tsx
import { IconPlus } from '@aviato/ui'

const TestComponent = () => {
  return <IconPlus />
}
```

If you prefer, you can also import all icons.

```tsx
import { icons } from '@aviato/ui'

Object.keys(icons).forEach((iconName) => {
  console.log('Icon name: ', iconName)
})

const TestComponent = () => {
  const { IconPlus } = icons

  return <IconPlus />
}
```
