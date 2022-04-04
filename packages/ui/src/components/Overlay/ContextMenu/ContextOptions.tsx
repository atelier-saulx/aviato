import React, { FC, useState } from 'react'
import { removeOverlay } from '~/components/BasedUI/Overlay'
import { IconCheck } from '~/components'
import { ContextItem } from '.'

export type Value = string | number | undefined

export type Option = {
  value: Value
  label?: React.ReactNode | string
}

export type ContextOptionsProps = {
  items: Option[] | null | undefined
  value: undefined | string | number
  onChange: (value: string | number | undefined) => void
}

export const ContextOptionItem: FC<{
  option: Option
  onChange: (value: Value) => void
  value: Value
}> = ({ option, onChange, value }) => {
  const [isSelected, setIsSelected] = useState(0)
  return (
    <ContextItem
      css={{
        backgroundColor:
          isSelected === 1
            ? '$ActionLightSelected !important'
            : isSelected === 1
            ? '$ActionLightHover'
            : null,
        '&:hover': {
          backgroundColor: '$ActionLightHover',
        },
        '&:active': {
          backgroundColor: '$ActionLightHover',
        },
      }}
      inset
      leftIcon={value === option.value ? <IconCheck /> : null}
      onClick={() => {
        setIsSelected(1)
        onChange(option.value)
        setTimeout(() => {
          setIsSelected(2)
          setTimeout(() => {
            removeOverlay()
          }, 125)
        }, 75)
        return true
      }}
    >
      {option.label || option.value}
    </ContextItem>
  )
}

export const ContextOptions: FC<ContextOptionsProps> = ({
  items = [],
  value,
  onChange,
}) => {
  // filter

  const [v, setValue] = useState(value)

  const children = items.map((opt, i) => {
    return (
      <ContextOptionItem
        key={i}
        onChange={(v) => {
          setValue(v)
          onChange(v)
        }}
        option={opt}
        value={v}
      />
    )
  })
  return <>{children}</>
}
