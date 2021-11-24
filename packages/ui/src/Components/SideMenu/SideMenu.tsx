import React, {
  FunctionComponent,
  CSSProperties,
  useEffect,
  useRef,
  SyntheticEvent,
  ComponentType,
  useState,
  useReducer,
} from 'react'
import { useColor, Color } from '../../theme'
import { Text } from '../Text'
import { SideMenuItem } from './SideMenuItem'
import { TextValue } from '../../textParser'
import { IconName } from '../../icons'
import useWindowSize from '../../hooks/events/useWindowSize'
import { Data } from '../../types'
import isComponent from '../../util/isComponent'

type FooterProps = {
  icon: IconName
  title: TextValue
  type: string // ?
  label: TextValue // ?
  items?: SideMenuItemProps[]
}

export type SideMenuItemProps = {
  checkResize?: () => void
  title?: TextValue
  icon?: IconName
  isSmall?: boolean
  style?: CSSProperties
  onClick?: (event: SyntheticEvent, meta: object) => void
  active?: boolean
  data?: Data
  to?: string
  type?: string
  label?: TextValue
  items?: SideMenuItemProps[]
  hidden?: boolean | undefined
  inverseColor?: boolean
  color?: Color
}

type SideMenuProps = {
  width?: number
  style?: CSSProperties
  items: SideMenuItemProps[]
  Logo?: ComponentType<{ isSmall?: boolean }>
  footer?: FooterProps[] | ComponentType<{ isSmall?: boolean }>
  collapse?: number
  Header?: FunctionComponent<{ isSmall: boolean }>
  inverseColor?: boolean
}

const sizeReducer = (cnt) => {
  return cnt + 1
}

export const SideMenu: FunctionComponent<SideMenuProps> = ({
  items,
  style,
  Logo,
  width = 240,
  footer,
  Header,
  collapse = 1500,
  inverseColor,
}) => {
  const size = useWindowSize()
  const isSmall = collapse ? size.width < collapse : false

  // other metric to recalc -- pass it down
  const elementRef = useRef<HTMLDivElement>()
  const [isLarger, setIsLarger] = useState(false)
  const [sizeCheck, checkResize] = useReducer(sizeReducer, 0)
  useEffect(() => {
    const elem = elementRef.current
    const raf = global.requestAnimationFrame(() => {
      if (elem.clientHeight < elem.scrollHeight) {
        setIsLarger(true)
      } else {
        setIsLarger(false)
      }
    })
    return () => {
      global.cancelAnimationFrame(raf)
    }
  }, [sizeCheck, elementRef, isSmall, items && items.length, size])

  const wrapItems = items.map((item, index) => {
    if (item.hidden) {
      return null
    }
    if (item.type === 'label') {
      return isSmall ? (
        <div key={index} style={{ height: 24 }} />
      ) : (
        <Text
          style={{
            marginBottom: 8,
            marginTop: 8,
            marginLeft: 16,
          }}
          noSelect
          singleLine
          weight="semibold"
          color={{ color: inverseColor ? 'background' : 'foreground' }}
          key={index}
        >
          {item.label}
        </Text>
      )
    }
    return (
      <SideMenuItem
        checkResize={checkResize}
        inverseColor={inverseColor}
        isSmall={isSmall}
        key={index}
        {...item}
      />
    )
  })

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: useColor({
          color: inverseColor ? 'foreground' : 'background',
          tone: inverseColor ? 1 : 2,
        }),
        width: isSmall ? 48 : width,
        minWidth: isSmall ? 48 : width,
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid ' + useColor({ color: 'divider' }),
        ...style,
      }}
    >
      {Logo ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            maxHeight: 60,
            marginTop: 16,
            minHeight: 60,
            padding: 8,
            paddingBottom: 8,
            marginBottom: 16,
          }}
        >
          <Logo isSmall={isSmall} />
        </div>
      ) : null}
      {Header ? (
        <div style={{ paddingLeft: 8, paddingRight: 8 }}>
          <Header isSmall={isSmall} />
        </div>
      ) : null}

      <div
        ref={elementRef}
        style={{
          padding: 8,
          paddingTop: 16,
          paddingBottom: isLarger ? 16 : 8,
          transition: 'border 0.25s',
          borderTop: isLarger
            ? '1px solid ' +
              useColor({
                color: inverseColor ? 'background' : 'foreground',
                opacity: 0.2,
              })
            : '1px solid transparent',

          borderBottom: isLarger
            ? '1px solid ' +
              useColor({
                color: inverseColor ? 'background' : 'foreground',
                opacity: 0.2,
              })
            : '1px solid transparent',

          overflowY: 'auto',
          flexGrow: 1,
        }}
      >
        {items ? (
          footer ? (
            <div
              style={{
                flexGrow: 1,
                flexBasis: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {wrapItems}
            </div>
          ) : (
            wrapItems
          )
        ) : null}
      </div>
      {footer ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 0,
          }}
        >
          {isComponent(footer)
            ? React.createElement(footer, { isSmall })
            : footer.map((item, index) => {
                if (item.type === 'label') {
                  return (
                    <Text
                      style={{
                        marginBottom: 8,
                        marginTop: 8,
                      }}
                      color={{
                        color: inverseColor ? 'background' : 'foreground',
                      }}
                      key={index}
                    >
                      {item.label}
                    </Text>
                  )
                }
                return <SideMenuItem key={index} {...item} />
              })}
        </div>
      ) : null}
    </div>
  )
}
