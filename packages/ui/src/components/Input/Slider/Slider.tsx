/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FunctionComponent } from 'react'
import { DefaultProps, styled } from '~/theme'
import { noop } from '@aviato/utils'
import { useUncontrolled } from '@aviato/hooks'

const StyledSlider = styled('div', {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  cursor: 'pointer',
  width: '100%',
  height: 16,
})

const Track = styled('div', {
  position: 'absolute',
  height: '6px',
  width: '100%',
  backgroundColor: '$OtherInputBorderDefault',
  borderRadius: '4px',
  top: '50%',
  transform: 'translateY(-50%)',
})

const Bar = styled('div', {
  position: 'absolute',
  height: '6px',
  backgroundColor: '$OtherInputBorderActive',
  borderRadius: '4px',
  left: '0%',
  width: '40%',
})

const Thumb = styled('div', {
  position: 'absolute',
  cursor: 'pointer',
  height: '16px',
  width: '16px',
  backgroundColor: '$PrimaryMainContrast',
  border: '4px solid $OtherInputBorderActive',
  color: '$OtherInputBorderActive',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: '40%',
})

export interface SliderProps extends DefaultProps {
  value?: number
  defaultValue?: number
  onChange?(value: string): void
}

export const Slider: FunctionComponent<SliderProps> = (properties) => {
  const { value, defaultValue, onChange = noop, ...remainingProps } = properties

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 0,
    rule: (val) => typeof val === 'number',
    onChange,
  })

  return (
    <StyledSlider {...remainingProps}>
      <Track>
        <Bar />
        <Thumb />
      </Track>

      <input type="hidden" value={_value} />
    </StyledSlider>
  )
}
