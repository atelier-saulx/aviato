import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useColor } from '../../../theme'
import { Text } from '../../Text'
import { TabProps, TabSizes, TabsProps } from './types'
import useLocation from 'wouter/use-location'
// import { useHub } from '@saulx/hub'

const Tab = ({
  tab,
  onClick,
  activeTab,
  index,
  tabSizes,
  noIndicator,
}: TabProps) => {
  const isActive = activeTab === index
  const [, setLocation] = useLocation()
  // const hub = useHub()

  return (
    <div
      style={{
        marginRight: tab.border ? 40 : 30,
        cursor: 'pointer',
        display: 'flex',
        position: 'relative',
        width: tabSizes ? tabSizes[index].width : null,
      }}
      onClick={useCallback(() => {
        if (tab.to) {
          setLocation(tab.to)
          // hub.set('device.history', tab.to)
        }
        if (onClick) {
          // @ts-ignore
          onClick(tab, index)
        }
      }, [tab, onClick, index])}
    >
      <Text
        noSelect
        // singleLine
        weight={isActive ? 'semibold' : noIndicator ? 'regular' : 'medium'}
        style={{
          whiteSpace: 'nowrap',
          marginLeft:
            isActive && tabSizes
              ? -tabSizes[index].width * (noIndicator ? 0.015 : 0.012)
              : null,
          // fontWeight: isActive ? 650 : 500,
        }}
      >
        {tab.title}
      </Text>
      <div
        style={{
          position: 'absolute',
          right: -21,
          height: 24,
          borderRight: tab.border
            ? '1px solid ' + useColor({ color: 'divider' })
            : null,
        }}
      />
    </div>
  )
}

export const Tabs = ({
  onChange,
  active,
  tabs = [],
  noIndicator,
  style,
  noBorder,
  indicatorMargin = 0,
  color = { color: 'primary' },
}: TabsProps) => {
  // const [activeTab, setActive] = useState(active)
  const [tabSizes, setTabsizes] = useState<TabSizes>()
  const ref = useRef()

  const onClick = useCallback(
    (active, index) => {
      // setActive(index)
      if (tabs[index].onClick) {
        // @ts-ignore
        tabs[index].onClick()
      }
      if (onChange) {
        global.requestAnimationFrame(() => {
          onChange(active, index)
        })
      }
    },
    [onChange]
  )

  useEffect(() => {
    global.requestAnimationFrame(() => {
      if (ref.current) {
        const current = ref.current || ({} as any)
        // @ts-ignore
        const children = current.childNodes
        const tabSizes: TabSizes = []

        const xTop =
          // @ts-ignore
          current.getBoundingClientRect && current.getBoundingClientRect().x
        for (let i = 0; i < children.length - 1; i++) {
          const { x, width } = children[i].getBoundingClientRect()
          tabSizes.push({
            width: width,
            x: x - xTop,
          })
        }
        setTabsizes(tabSizes)
      }
    })
  }, [tabs, ref.current, active])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        position: 'relative',
        opacity: tabSizes ? 1 : 0,
        transition: 'opacity 0.1s',
        paddingBottom: noBorder ? null : 10,
        borderBottom: noBorder
          ? null
          : '1px solid ' + useColor({ color: 'divider' }),
        ...style,
      }}
    >
      {tabs.map((tab, index) => {
        return (
          <Tab
            key={index}
            tab={tab}
            onClick={onClick}
            noIndicator={noIndicator}
            activeTab={active}
            index={index}
            tabSizes={tabSizes}
            indicatorMargin={indicatorMargin}
          />
        )
      })}
      <div
        style={{
          opacity: noIndicator ? 0 : 1,
          position: 'absolute',
          bottom: -1 * indicatorMargin,
          width: tabSizes ? tabSizes[active].width * 1.05 : 0,
          left: 0,
          transition: 'width 0.25s, transform 0.2s ease-in-out',
          transform: `translate3d(${
            tabSizes ? tabSizes[active].x : 0
          }px,0px,0px)`,
          height: 4,
          backgroundColor: useColor(color),
        }}
      />
    </div>
  )
}
