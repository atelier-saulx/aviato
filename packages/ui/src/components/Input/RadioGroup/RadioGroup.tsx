import React, { FunctionComponent } from 'react'
import { DefaultProps } from '~/theme'

export interface RadioGroupProps extends DefaultProps {}

export const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  children,
}) => {
  return <>{children}</>
}
