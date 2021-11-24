import React from 'react'
import {
  Button,
  Switch,
  SwitchTextButton,
  Card,
  CardOption,
  icons,
} from '@based/ui'
import RenderComponents from '../RenderComponents'
import { randomIcon, randomTitle, randomText } from './util'
import { wait } from '@saulx/utils'
// rly bad
const { List, Grid } = icons

const genButtonProps = () => {
  const props = []

  const colors = [
    'primary',
    'secondary',
    'primaryAccent',
    'secondaryAccent',
    'background',
    'foreground',
  ]

  props.push(
    {
      icon: randomIcon(),
      children: 'Foreground no bg',
      foregroundColor: {
        color: 'foreground',
        tone: 2,
      },
      onClick: () => {},
      color: { color: 'background', opacity: 0 },
    },
    {
      icon: randomIcon(),
      children: 'Button with actionKeys!',
      actionKeys: ['Enter', 'ArrowDown'],
      onClick: async () => {
        console.info('Key is pressed!')
        await wait(1e3)
      },
    }
  )

  for (const color of colors) {
    const vars = [
      {
        icon: randomIcon(),
        children: randomTitle,
        color: { color },
        onClick: async () => {
          console.info('Key is pressed!')
          await wait(1e3)
        },
      },
      {
        children: randomTitle,
        color: { color },
        onClick: async () => {
          console.info('Key is pressed!')
          await wait(1e3)
        },
      },
      {
        icon: randomIcon(),
        color: { color },
        onClick: async () => {
          console.info('Key is pressed!')
          await wait(1e3)
        },
      },
    ]
    props.push(...vars)
  }

  return props
}

export default {
  name: 'button',
  Render: ({ category }) => <RenderComponents grid category={category} />,
  components: [
    {
      name: 'CardOption',
      category: 'button',
      Component: CardOption,
      props: [
        {
          label: 'Grid',
          value: true,
          children: <Grid color={{ color: 'foreground' }} />,
          onChange: () => {},
          // icon:
        },
        {
          label: 'Grid',
          value: false,
          children: <List color={{ color: 'foreground' }} />,
          onChange: () => {},
          // icon:
        },
      ],
    },
    {
      name: 'Button',
      category: 'button',
      Component: Button,
      props: genButtonProps(),
    },
    {
      name: 'Card',
      category: 'button',
      Component: Card,
      props: [
        {
          label: 'Card',
          icon: 'multipleChoice',
          children: randomText(),
        },
      ],
    },
    {
      name: 'Switch',
      Component: Switch,
      props: [
        {
          value: true,
          onChange: () => {},
        },
        {
          value: false,
          onChange: () => {},
        },
      ],
    },
    {
      name: 'SwitchTextButton',
      Component: SwitchTextButton,
      props: [
        {
          value: true,
          onChange: () => {},
        },
        {
          value: false,
          onChange: () => {},
        },
      ],
    },
  ],
}
