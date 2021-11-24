import { useColor } from '../../../theme'
import React from 'react'

export const Image = ({ src }: { src?: string }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundImage: src
          ? `url(${src})`
          : `linear-gradient(135deg,${useColor({
              color: 'foreground',
              tone: 5,
              opacity: 0.3,
            })} 0%,${useColor({ color: 'background', tone: 2 })} 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  )
}
