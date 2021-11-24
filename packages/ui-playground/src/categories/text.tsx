import { Text, SubText, Title, Code } from '@based/ui'
import { randomText, randomTitle } from './util'
import RenderComponents from '../RenderComponents'

const code = `import { addOverlay, OnClose, OverlayOptions } from '../../Components/Overlay'
import { GenericOverlay } from '../../Components/Overlay/GenericOverlay'
import { PositionProps } from './useOverlayPosition'
import React, {
  ComponentType,
  PropsWithChildren,
  SyntheticEvent,
  useCallback,
} from 'react'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'

export default function useOverlay<P>(
  component: ComponentType<P>,
  props?: PropsWithChildren<P & PositionProps>,
  handler?: (selection: Event | any) => OnClose | undefined,
  Overlay: ComponentType = GenericOverlay,
  options: OverlayOptions = { transparent: true }
): (
  e: Event | SyntheticEvent,
  selectionProps?: PropsWithChildren<any>
) => void {
  const ctx = createOverlayContextRef(props)
  return useCallback(
    (e: Event | SyntheticEvent, selectionProps) => {
      let cancel: OnClose
      if (handler) {
        cancel = handler(e)
      }
      const reactNode = (
        <OverlayContext.Provider value={ctx}>
          <Overlay
            Component={component}
            target={e.currentTarget}
            {...selectionProps}
          />
        </OverlayContext.Provider>
      )
      addOverlay(
        reactNode,
        () => {
          if (cancel) cancel()
        },
        options
      )
    },
    [ctx]
  )
}
`

export default {
  name: 'text',
  Render: RenderComponents,
  components: [
    {
      name: 'Text',
      category: 'text',
      Component: Text,
      props: [
        {
          weight: 'regular',
          children: randomText,
        },
        {
          weight: 'medium',
          singleLine: true,
          noSelect: true,
          children: randomText,
        },
        {
          weight: 'semibold',
          children: randomText,
        },
        {
          weight: 'semibold',
          children: [
            'hello',
            { en: ' snurk' },
            { format: 'date-time-human', value: Date.now() },
            ' ',
            { format: 'uppercase', value: { en: 'drol' } },
          ],
        },
      ],
    },
    {
      name: 'Title',
      category: 'text',
      Component: Title,
      props: [
        {
          size: 'regular',
          children: randomTitle,
        },
        {
          size: 'small',
          children: randomTitle,
        },
      ],
    },
    {
      name: 'SubText',
      category: 'text',
      Component: SubText,
      props: [
        {
          children: randomTitle,
        },
      ],
    },
    {
      name: 'Code',
      category: 'text',
      Component: Code,
      props: [
        {
          children: code,
        },
      ],
    },
  ],
}
