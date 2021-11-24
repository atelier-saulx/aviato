import React, { CSSProperties, FunctionComponent } from 'react'

export type BasicCardProps = {
  value?: string
  style?: CSSProperties
  imageUrl?: string
}

export const BasicCard: FunctionComponent<BasicCardProps> = ({
  children,
  value = '',
  style = {},
  imageUrl = '',
}) => {
  return (
    <div
      style={{
        border: '1px solid #eaebed',
        borderRadius: '4px',
        width: '31%',
        margin: '1%',
        ...style,
      }}
    >
      {imageUrl !== '' && (
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            minHeight: '220px',
          }}
        />
      )}

      <div
        style={{
          padding: '16px',
        }}
      >
        {children ?? value}
      </div>
    </div>
  )
}
