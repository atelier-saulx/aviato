import React, {
  BaseSyntheticEvent,
  ElementRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { styled } from '~/theme'
import { Conditional } from '~/components/Utilities/Conditional'
import { Text } from '~/components/Text'
import { Column } from '~/components/Layout'
import { IconCheck, IconMinus } from '~/icons'
import { DefaultChangePayload } from '~/types/events'

const StyledCheckboxWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
})

const Centered = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
})

const AlignmentWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'center',
})

const CheckboxWrapper = styled('div', {
  paddingTop: 3,
})

const TextWrapper = styled('div', {
  paddingLeft: 12,
})

const Spacer = styled('div', {
  width: '100%',
  height: 4,
})

const StyledCheckbox = styled('input', {
  cursor: 'pointer',
  appearance: 'none',
  padding: 0,
  outline: 0,
  display: 'block',
  overflow: 'visible',
  border: '1px solid $OtherInputBorderDefault',
  background: 'transparent',
  borderRadius: '4px',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:checked': {
    border: '1px solid $PrimaryMain',
    backgroundColor: '$PrimaryMain',

    '&:disabled': {
      border: '1px solid $OtherDisabledOutline',
      backgroundColor: '$OtherDisabledBackground',
    },
  },

  variants: {
    size: {
      small: {
        width: '16px',
        height: '16px',

        '& svg': {
          width: '12px',
          height: '12px',
        },
      },

      medium: {
        width: '20px',
        height: '20px',
      },
    },
  },
})

const IconWrapper = styled('div', {
  position: 'absolute',
  zIndex: '1',
  top: '0',
  left: '0',
  pointerEvents: 'none',
  color: '$PrimaryMainContrast',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    size: {
      small: {
        width: '16px',
        height: '16px',

        '& svg': {
          width: '12px',
          height: '12px',
        },
      },

      medium: {
        width: '20px',
        height: '20px',
      },
    },
  },
})

export type CheckboxSize = 'small' | 'medium'

export enum CHECKBOX_STATES {
  Unchecked = 'Unchecked',
  Checked = 'Checked',
  Indeterminate = 'Indeterminate',
}

export interface OnCheckboxChangePayload
  extends DefaultChangePayload<BaseSyntheticEvent> {
  isChecked: boolean
}

export interface CheckboxProps {
  size?: CheckboxSize
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  label?: string
  description?: string
  index?: number
  onChange?: (payload: OnCheckboxChangePayload) => void
}

type ForwardProps = ComponentProps<typeof StyledCheckboxWrapper> & CheckboxProps

/***
 * TODO: Implement proper indeterminate logic
 */
export const Checkbox = React.forwardRef<
  ElementRef<typeof StyledCheckboxWrapper>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    size = 'small',
    checked = false,
    disabled = false,
    indeterminate = false,
    label,
    description,
    onChange = noop,
    index = 0,
    ...remainingProps
  } = properties

  const [isDisabled, setIsDisbled] = useState(disabled)
  const [isChecked, setIsChecked] = useState(checked)
  const [hasIndeterminateState] = useState(indeterminate)

  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)
  const hasLabelOrDescription = hasLabel || hasDescription

  useEffect(() => {
    setIsDisbled(disabled)
    setIsChecked(checked)
  }, [checked, disabled])

  const handleChange = useCallback(
    (event: BaseSyntheticEvent) => {
      if (isDisabled) {
        return noop()
      }

      const isCheckboxChecked = !isChecked
      setIsChecked(isCheckboxChecked)

      const checkboxState = isCheckboxChecked
        ? CHECKBOX_STATES.Checked
        : CHECKBOX_STATES.Unchecked

      onChange({
        isChecked: isCheckboxChecked,
        checkboxState: checkboxState,
        isDisabled,
        index,
        event,
      })
    },
    [isChecked]
  )

  const CheckboxComponent: FunctionComponent = (properties) => {
    return (
      <CheckboxWrapper>
        <Column>
          <Centered>
            <StyledCheckbox
              type="checkbox"
              checked={isChecked}
              onChange={handleChange}
              disabled={disabled}
              size={size}
              {...properties}
            />

            <IconWrapper size={size}>
              <Conditional test={isChecked && !hasIndeterminateState}>
                <IconCheck />
              </Conditional>

              <Conditional test={isChecked && hasIndeterminateState}>
                <IconMinus />
              </Conditional>
            </IconWrapper>
          </Centered>
        </Column>
      </CheckboxWrapper>
    )
  }

  if (hasLabelOrDescription) {
    return (
      <StyledCheckboxWrapper>
        <AlignmentWrapper>
          <CheckboxComponent ref={forwardedRef} {...remainingProps} />

          <Conditional test={hasLabelOrDescription}>
            <TextWrapper onClick={handleChange}>
              <Text weight={hasDescription ? 'Semibold' : 'Medium'}>
                {label}
              </Text>

              <Conditional test={hasLabel}>
                <Spacer />
              </Conditional>

              <Text>{description}</Text>
            </TextWrapper>
          </Conditional>
        </AlignmentWrapper>
      </StyledCheckboxWrapper>
    )
  }

  return <CheckboxComponent ref={forwardedRef} {...remainingProps} />
})
