import React, {
  forwardRef,
  ElementRef,
  cloneElement,
  SyntheticEvent,
  KeyboardEvent,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { clamp, filterChildrenByType, noop } from '@aviato/utils'

import { styled } from '~/theme'
import { Tab } from './Tab'
import { useUncontrolled, useUuid } from '~/hooks'
import { Group } from '~/components/Layout'
import { findInitialTab, getNextTab, getPreviousTab } from './utils'
import { onChange } from '~/types'

type CaptureEvent = KeyboardEvent<HTMLDivElement>
type Direction = 'left' | 'right'

const StyledTabs = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '64px',
  background: '$Background1dp',
  padding: '0 $xxl',
})

export interface OnTabChange extends onChange {
  value: string | number
}

type StitchedProps = Omit<ComponentProps<typeof StyledTabs>, 'onChange'>

export interface TabsProps extends StitchedProps {
  initialTab?: number
  active?: number
  onChange?: (value: string | number, payload: OnTabChange) => void
}

export const Tabs = forwardRef<ElementRef<typeof StyledTabs>, TabsProps>(
  (properties, forwardedRef) => {
    const {
      initialTab,
      active,
      onChange = noop,
      children,
      ...remainingProps
    } = properties

    const tabChildren = filterChildrenByType(children, Tab)

    const [_activeTab, setActiveTabIndex] = useUncontrolled({
      value: active,
      defaultValue: initialTab,
      finalValue: findInitialTab(tabChildren),
      rule: (value) => typeof value === 'number',
      onChange: () => {},
    })

    const activeTab = clamp({
      value: _activeTab,
      min: 0,
      max: tabChildren.length - 1,
    })

    const uuid = useUuid({ prefix: 'tabs' })

    const handleChange = ({
      value,
      index,
      event,
    }: {
      value: string | number
      index: number
      event: SyntheticEvent
    }) => {
      onChange(value, {
        value,
        index,
        event,
      })
    }

    const handleKeyDown = (event: CaptureEvent) => {
      const { code } = event?.nativeEvent ?? {}

      if (code === 'Enter') {
        return event.preventDefault()
      }

      const keyMap: { [key: string]: Direction } = {
        ArrowDown: 'left',
        ArrowLeft: 'left',
        ArrowUp: 'right',
        ArrowRight: 'right',
      }

      const direction = keyMap[code]
      if (direction) {
        onKeyDown({ direction, event })
      }
    }

    const onKeyDown = ({
      direction,
      event,
    }: {
      direction: Direction
      event: CaptureEvent
    }) => {
      event.preventDefault()

      if (direction === 'left') {
        const previousTab = getPreviousTab(activeTab, tabChildren)
        setActiveTabIndex(previousTab)
      } else {
        const nextTab = getNextTab(activeTab, tabChildren)
        setActiveTabIndex(nextTab)
      }
    }

    const mappedTabChildren = tabChildren.map((tab, index) => {
      return cloneElement(tab, {
        name: uuid,
        key: `TabItem-${index}`,
        isActive: activeTab === index,
        onKeyDown: (event) => handleKeyDown(event),
        onClick: (event: SyntheticEvent) => {
          const targetChild = tabChildren[index]
          const { value } = targetChild?.props ?? {}
          const targetValue = value ?? index

          handleChange({ value: targetValue, index, event })

          return setActiveTabIndex(index)
        },
      })
    })

    return (
      <StyledTabs ref={forwardedRef} {...remainingProps}>
        <Group
          role="tablist"
          aria-orientation="horizontal"
          direction="row"
          spacing="xxl"
        >
          {mappedTabChildren}
        </Group>
      </StyledTabs>
    )
  }
)
