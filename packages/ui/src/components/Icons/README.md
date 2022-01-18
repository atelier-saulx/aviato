## HOW TO USE

You can import icons individually:

```tsx
import { IconPlus } from '@aviato/ui'

const TestComponent = () => {
  return <IconPlus />
}
```

You can also import all icons:

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

Here's how to get a random icon:

```tsx
import { getRandomIcon } from '@aviato/ui'

const TestComponent = () => {
  const RandomIcon = getRandomIcon()
  return <RandomIcon />
}
```

```tsx
import { getRandomIconName, icons } from '@aviato/ui'

const TestComponent = () => {
  const randomIconName = getRandomIconName()
  const RandomIcon = icons[randomIconName]
  return <RandomIcon />
}
```

---

## Utilities used

- https://www.vandebron.tech/blog/optimizing-converting-and-exporting-svg-icons-in-react
- https://react-svgr.com/docs/cli/
