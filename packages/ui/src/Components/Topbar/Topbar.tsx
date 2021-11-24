import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor } from '../../theme'
import renderChildren from '../../util/renderChildren'
import { Children } from '../../types'
import '@compiled/react'

type TopbarProps = {
  style?: CSSProperties
  children?: Children
  className?: string
}

export const Topbar: FunctionComponent<TopbarProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <div
      className={className}
      style={style}
      css={{
        paddingTop: 12.5,
        paddingBottom: 12.5,
        paddingLeft: 32,
        paddingRight: 32,
        height: 56,
        minHeight: 56,
        maxHeight: 56,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid ' + useColor({ color: 'divider' }),
      }}
    >
      {renderChildren(children, {})}
    </div>
  )
}
