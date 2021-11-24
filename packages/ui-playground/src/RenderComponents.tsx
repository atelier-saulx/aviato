import React, { CSSProperties } from 'react'
import {
  SubText,
  useTooltip,
  Text,
  Code,
  useMultipleEvents,
  useColor,
  useHover,
} from '@based/ui'

const parseProps = (p) => {
  const children = []

  for (const key in p) {
    let value = p[key]

    let body

    if (typeof value === 'function') {
      value = value.toString()

      body = (
        <Text singleLine style={{ opacity: 0.5 }}>
          {value}
        </Text>
      )
    } else {
      if (typeof value === 'object') {
        value = JSON.stringify(value, null, 2)
        body = <Code style={{ opacity: 0.5 }}>{value}</Code>
      } else {
        if (typeof value === 'string') {
          if (value.length > 350) {
            value = value.slice(0, 350) + '...'
          }
          body = <Text style={{ opacity: 0.5 }}>{value}</Text>
        } else {
          value = JSON.stringify(value, null, 2)
          body = <Text style={{ opacity: 0.5 }}>{value}</Text>
        }
      }
    }

    children.push(
      <div
        key={key}
        style={{
          width: '100%',
          display: 'flex',
          marginRight: 15,
          justifyContent: 'space-between',
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Text weight="medium" style={{ minWidth: 150, maxWidth: 150 }}>
          {key}
        </Text>
        {body}
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100%',
        marginBottom: 15,
      }}
    >
      {children}
    </div>
  )
}

const PropsInfo = ({ componentProps }) => {
  return (
    <div
      style={{
        width: '100%',
        padding: 20,
      }}
    >
      {parseProps(componentProps)}
    </div>
  )
}

const ComponentWrapper = ({ Component, grid, componentProps, children }) => {
  if (Component === undefined) {
    Component = () => 'CANNOT FIND'

    console.log(Component, componentProps)
  }

  const [hover, isHover] = useHover()
  return (
    <div
      style={{
        marginBottom: '20px',
        borderRadius: 4,
        padding: 10,
        marginRight: grid ? '15px' : '0px',
        border: isHover
          ? '1px dashed ' +
            useColor({ color: 'foreground', tone: 5, opacity: 0.5 })
          : '1px solid rgba(0,0,0,0)',
      }}
      {...useMultipleEvents(
        useTooltip(<PropsInfo componentProps={componentProps} />, {
          width: 500,
          initialTimer: 1e3,
        }),
        hover
      )}
    >
      <Component {...componentProps}>{children || null}</Component>
    </div>
  )
}

const RenderComponents = ({ category, grid, bg = 'transparent' }) => {
  const s: CSSProperties = {
    border: '1px dashed ' + useColor({ color: 'foreground', opacity: 0.2 }),
    padding: '20px',
    borderRadius: '7px',
    display: 'flex',
    flexWrap: grid ? 'wrap' : 'nowrap',
    backgroundColor: bg,
    flexDirection: grid ? 'row' : 'column',
  }
  return (
    <div
      style={{
        marginBottom: '15px',
        width: '100%',
      }}
    >
      <div
        onClick={() => {
          window.location.search = '?category=' + category.name
        }}
      >
        <SubText
          style={{
            marginBottom: '5px',
          }}
        >
          {category.name}
        </SubText>
      </div>
      <div style={s}>
        {category.components.map((v, i) => {
          const x = {
            width: '100%',
            border:
              '1px dashed ' + useColor({ color: 'foreground', opacity: 0.2 }),
            padding: 20,
            borderRadius: '7px',
            display: 'flex',
            flexDirection: v.grid || grid ? 'row' : 'column',
            flexWrap: v.grid || grid ? 'wrap' : 'nowrap',
          }

          return (
            <div
              key={i}
              style={{
                marginBottom: '15px',
                marginRight: grid ? '15px' : '0px',
              }}
            >
              <div
                onClick={() => {
                  window.location.search = '?component=' + v.name
                }}
              >
                <SubText
                  style={{
                    marginBottom: '5px',
                  }}
                >
                  {v.name}
                </SubText>
              </div>
              <div key={v.name} style={x}>
                {v.props.map((p, i) => {
                  if (typeof p === 'function') {
                    return (
                      <div
                        key={i}
                        style={{
                          marginBottom: '15px',
                          marginRight: grid ? '15px' : '0px',
                        }}
                      >
                        {React.createElement(p)}
                      </div>
                    )
                  }

                  let { children } = p
                  if (children) {
                    if (typeof children === 'function') {
                      children = children()
                    }
                  }
                  const { Component } = v
                  return (
                    <ComponentWrapper
                      key={i}
                      Component={Component}
                      grid={v.grid || grid}
                      componentProps={p}
                    >
                      {children}
                    </ComponentWrapper>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RenderComponents
