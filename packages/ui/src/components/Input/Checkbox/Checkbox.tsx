import React, {
  BaseSyntheticEvent,
  ElementRef,
  forwardRef,
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
import { IconCheck, IconMinus } from '~/components/Icons'
import { onChange } from '~/types/events'

const Container = styled('div', {
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

const AlignmentContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'center',
})

const CheckboxContainer = styled('div', {
  paddingTop: 3,
})

const TextContainer = styled('div', {
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

const IconContainer = styled('div', {
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

export interface OnCheckboxChange extends onChange<BaseSyntheticEvent> {
  isChecked: boolean
}

type StitchedProps = Omit<ComponentProps<typeof Container>, 'onChange'>

export interface CheckboxProps extends StitchedProps {
  size?: CheckboxSize
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  label?: string
  description?: string
  index?: number
  onChange?: (value: boolean, payload: OnCheckboxChange) => void
}

export const Checkbox = forwardRef<ElementRef<typeof Container>, CheckboxProps>(
  (properties, forwardedRef) => {
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

        onChange(isCheckboxChecked, {
          isChecked: isCheckboxChecked,
          checkboxState: checkboxState,
          isDisabled,
          index,
          event,
        })
      },
      [isChecked]
    )

    const CheckboxComponent: FunctionComponent = (properties) => (
      <CheckboxContainer>
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

            <IconContainer size={size}>
              <Conditional test={isChecked && !hasIndeterminateState}>
                <IconCheck />
              </Conditional>

              <Conditional test={isChecked && hasIndeterminateState}>
                <IconMinus />
              </Conditional>
            </IconContainer>
          </Centered>
        </Column>
      </CheckboxContainer>
    )

    if (hasLabelOrDescription) {
      return (
        <Container>
          <AlignmentContainer>
            <CheckboxComponent ref={forwardedRef} {...remainingProps} />

            <Conditional test={hasLabelOrDescription}>
              <TextContainer onClick={handleChange}>
                <Text weight={hasDescription ? 'semibold' : 'medium'}>
                  {label}
                </Text>

                <Conditional test={hasLabel}>
                  <Spacer />
                </Conditional>

                <Text>{description}</Text>
              </TextContainer>
            </Conditional>
          </AlignmentContainer>
        </Container>
      )
    }

    return <CheckboxComponent ref={forwardedRef} {...remainingProps} />
  }
)
