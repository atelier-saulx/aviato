import React from 'react'
import RenderComponents from '../RenderComponents'
import { icons } from '@based/ui'

const iconsArray = []

const iconProps = [
  {},
  {
    color: { color: 'primary' },
  },
  {
    color: { color: 'secondary' },
  },
  {
    framed: true,
  },
  {
    framed: true,
    frameColor: { color: 'secondary' },
  },
]

for (const key in icons.icons) {
  iconsArray.push({
    Component: icons[key],
    name: key,
    props: iconProps,
  })
}

export default {
  name: 'icons',
  Render: ({ category }) => <RenderComponents grid category={category} />,
  components: iconsArray,
}
