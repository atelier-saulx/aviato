import React, { FunctionComponent } from 'react'
import useHover from '../../hooks/events/useHover'
import { useColor } from '../../theme'
import { Text } from '../../Components/Text'
// import { useHub } from '@saulx/hub'
import { TextValue } from '../../textParser'
import useLocation from 'wouter/use-location'

const Button = ({ label, to, active, prefix }) => {
  const [hover, isHover] = useHover()
  const [, setLocation] = useLocation()
  return (
    <div
      style={{
        padding: 8,
        borderRadius: 4,
        paddingTop: 4,
        paddingBottom: 4,
        marginBottom: 4,
        background: useColor({ color: 'divider', tone: 1 }),
        cursor: 'pointer',
        alignItems: 'center',
        transition: 'background 0.15s',
        backgroundColor:
          to === active
            ? useColor({ color: 'primary', opacity: 0.1 })
            : isHover
            ? useColor({ color: 'background', tone: 3 })
            : null,
      }}
      {...hover}
      onClick={() => {
        setLocation(`/${prefix}/${to}`)
      }}
    >
      <Text
        noSelect
        weight={to === active ? 'semibold' : 'regular'}
        style={{ marginLeft: to === active ? 1 : 0 }}
        color={{ color: to === active ? 'primary' : 'foreground' }}
      >
        {label}
      </Text>
    </div>
  )
}

type SideMenuAltProps = {
  active: string
  prefix: string
  sections: {
    label: TextValue
    items: { label: TextValue; to: string }[]
  }[]
}

const Section = ({ active, prefix, label, items }) => {
  return (
    <>
      <Text
        weight="semibold"
        noSelect
        style={{
          marginTop: 32,
          paddingLeft: 8,
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
      {items.map((v, i) => {
        return (
          <Button
            key={i}
            label={v.label}
            active={active}
            prefix={prefix}
            to={v.to}
          />
        )
      })}
    </>
  )
}

const SideMenuAlt: FunctionComponent<SideMenuAltProps> = ({
  active,
  prefix,
  sections,
}) => {
  const children = sections.map((v, i) => {
    return <Section key={i} active={active} prefix={prefix} {...v} />
  })
  return (
    <div
      style={{
        paddingLeft: 16,
        paddingRight: 16,
        minWidth: 240,
        maxWidth: 240,
        paddingTop: 112 - 32,
        borderRight: '1px solid ' + useColor({ color: 'divider' }),
      }}
    >
      {children}
    </div>
  )
}

export { SideMenuAlt }
