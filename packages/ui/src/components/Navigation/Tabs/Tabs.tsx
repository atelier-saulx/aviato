import React, {
  forwardRef,
  ElementRef,
  cloneElement,
  SyntheticEvent,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { clamp, filterChildrenByType, noop } from '@aviato/utils'

import { styled } from '~/theme'
import { Tab } from './Tab'
import { useUncontrolled, useUuid } from '~/hooks'
import { Group } from '~/components/Layout'
import { findInitialTab } from './utils'
import { onChange } from '~/types'

const StyledTabs = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '64px',
  background: '$Background1dp',
  padding: '0 $xxl',
})

export interface OnTabChange extends onChange {
  value: string
}

type StitchedProps = Omit<ComponentProps<typeof StyledTabs>, 'onChange'>

export interface TabsProps extends StitchedProps {
  initialTab?: number
  active?: number
  onChange?: (value: string, payload: OnTabChange) => void
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

    const mappedTabChildren = tabChildren.map((tab, index) => {
      return cloneElement(tab, {
        name: uuid,
        key: `TabItem-${index}`,
        isActive: activeTab === index,
        onClick: (event: SyntheticEvent) => {
          if (activeTab === index) return

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
