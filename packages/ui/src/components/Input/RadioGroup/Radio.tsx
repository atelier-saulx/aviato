import React, { FunctionComponent } from 'react'
import { DefaultProps, styled } from '~/theme'
import { Text } from '~/components/Text'
import { noop } from '@aviato/utils'
import { useUuid } from '@aviato/hooks'

const Label = styled('label', {
  display: 'flex',
  alignItems: 'center',
})

const StyledRadio = styled('input', {
  position: 'relative',
  width: 20,
  height: 20,
  borderRadius: 20 / 2,

  border: '1px solid $OtherInputBorderDefault',

  '&:checked': {
    background: '$PrimaryMain',
    borderColor: '$PrimaryMain',

    '&::before': {
      position: 'absolute',
      top: `calc(50% - ${10 / 2}px)`,
      left: `calc(50% - ${10 / 2}px)`,
      width: 10,
      height: 10,
      borderRadius: 10 / 2,

      content: `''`,
      display: 'block',
      backgroundColor: '#FFF',
    },
  },
})

const Span = styled('span', {
  paddingLeft: 12,
})

export interface RadioProps extends DefaultProps {
  value: string
  checked?: boolean
  disabled?: boolean
  name?: string
  onChange?(value: string): void
}

export const Radio: FunctionComponent<RadioProps> = (properties) => {
  const {
    value,
    checked = false,
    disabled = false,
    onChange = noop,
    name,
    children,
    ...remainingProps
  } = properties

  const uuid = useUuid({ prefix: 'radio-item' })

  return (
    <Label>
      <StyledRadio
        type="radio"
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        id={uuid}
        name={name}
        {...remainingProps}
      />

      <Span>
        <Text>{children}</Text>
      </Span>
    </Label>
  )
}
