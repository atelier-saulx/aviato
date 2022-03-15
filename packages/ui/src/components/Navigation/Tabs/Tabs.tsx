import React, {
  forwardRef,
  ElementRef,
  SyntheticEvent,
  KeyboardEvent,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { clamp, filterChildrenByType, noop } from '@aviato/utils'

import { styled } from '~/theme'
import { Tab } from './Tab'
import { useUncontrolled } from '~/hooks'
import { Group } from '~/components/Layout'
import { findInitialTab, getNextTab, getPreviousTab } from './utils'
import { onChange } from '~/types'

type CaptureEvent = KeyboardEvent<HTMLDivElement>
type Direction = 'left' | 'right' | 'none'

const StyledTabs = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '64px',
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

    const [_activeTabIndex, setActiveTabIndex] = useUncontrolled({
      value: active,
      defaultValue: initialTab,
      finalValue: findInitialTab(tabChildren),
      rule: (value) => typeof value === 'number',
      onChange: () => {},
    })

    const activeTabIndex = clamp({
      value: _activeTabIndex,
      min: 0,
      max: tabChildren.length - 1,
    })

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

      const keyMap: { [key: string]: Direction } = {
        ArrowDown: 'left',
        ArrowLeft: 'left',
        ArrowUp: 'right',
        ArrowRight: 'right',
        Enter: 'none',
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

      const targetIndex =
        direction === 'left'
          ? getPreviousTab(activeTabIndex, tabChildren)
          : direction === 'right'
          ? getNextTab(activeTabIndex, tabChildren)
          : activeTabIndex

      setActiveTab({
        index: targetIndex,
        event,
      })
    }

    const setActiveTab = ({
      index,
      event,
    }: {
      index: number
      event: CaptureEvent | SyntheticEvent
    }) => {
      event.preventDefault()

      const targetChild = tabChildren[index]
      if (targetChild) {
        const { value } = targetChild?.props ?? {}
        const targetValue = value ?? index

        handleChange({ value: targetValue, index, event })
        setActiveTabIndex(index)
      }
    }

    const TabChildren = tabChildren.map((tab, index) => (
      <Tab
        {...tab.props}
        key={`TabItem-${index}`}
        isActive={activeTabIndex === index}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          return setActiveTab({ index, event })
        }}
      />
    ))

    return (
      <StyledTabs ref={forwardedRef} {...remainingProps}>
        <Group
          role="tablist"
          aria-orientation="horizontal"
          direction="vertical"
          spacing="xxl"
        >
          {TabChildren}
        </Group>
      </StyledTabs>
    )
  }
)

Tabs.displayName = 'Tabs'
