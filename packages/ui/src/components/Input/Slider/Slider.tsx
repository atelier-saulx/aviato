import React, { FunctionComponent } from 'react'
import { DefaultProps, styled } from '~/theme'
import { noop } from '@aviato/utils'

const StyledSlider = styled('div', {})

export interface SliderProps extends DefaultProps {
  onChange?(value: string): void
}

export const Slider: FunctionComponent<SliderProps> = (properties) => {
  const { onChange = noop, ...remainingProps } = properties

  return <StyledSlider onChange={onChange} {...remainingProps} />
}
