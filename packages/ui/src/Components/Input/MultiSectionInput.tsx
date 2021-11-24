import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Color, useColor } from '../../theme'
import { OnValueChange } from '../../types'
import useHover from '../../hooks/events/useHover'
import { SvgProps } from '../../icons'
import Clear from './Clear'
import {
  Section,
  getSectionAtCursor,
  handleSectionChange,
  selectNextSection,
  selectPreviousSection,
  preprocessAllSections,
  increaseCurrentSectionValue,
  decreaseCurrentSectionValue,
  selectSection,
  validAllSections,
} from './MultiSectionInputFunctions'

export type MultiSectionInputProps = {
  border: boolean
  weight?: 'semibold' | 'medium' | 'regular'
  style?: CSSProperties
  color?: Color
  value?: string
  identifier?: any
  onChange: OnValueChange<string>
  onChangeStrategy?: 'onChangeAndValid' | 'onValid'
  noBackground?: boolean
  noHover?: boolean
  icon?: FunctionComponent<SvgProps>
  placeholder?: string
  hasFocus?: boolean
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  sections: Section[]
}

export const MultiSectionInput: FunctionComponent<MultiSectionInputProps> = ({
  border,
  value,
  style,
  onChange,
  onChangeStrategy = 'onValid',
  noBackground,
  color = { color: 'background', tone: 1 },
  noHover,
  weight,
  icon: InputIcon,
  placeholder,
  hasFocus,
  onFocus,
  sections,
}) => {
  const [valid, setValid] = useState(true)
  const inputElement = useRef<HTMLInputElement>()

  const clear = useCallback(() => {
    inputElement.current.value = ''
    onChange(null)
  }, [onChange])

  const [hover, isHover] = noHover ? [{}, false] : useHover()
  const [isFocus, setFocus] = useState(hasFocus)

  useEffect(() => {
    inputElement.current.value = value
  }, [value])

  /**
   * Triggers when input is blurred
   */
  function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    const currentSectionIndex = getSectionAtCursor(event.target, sections)

    preprocessAllSections(event.target, sections)

    handleSectionChange(event.target, currentSectionIndex, sections, setValid)

    if (onChangeStrategy === 'onValid' && valid) {
      onChange(event.target.value)
    }

    setFocus(false)
  }

  /**
   * Triggers when input changes
   */
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const currentSectionIndex = getSectionAtCursor(event.target, sections)

    handleSectionChange(event.target, currentSectionIndex, sections, setValid)

    const hasValidChange =
      onChangeStrategy === 'onChangeAndValid' &&
      validAllSections(event.target, sections)

    if (hasValidChange) {
      setValid(true)
      onChange(event.target.value)
    }
  }

  /**
   * Triggers when key is pressed
   */
  function handleKeydownEvent(event: React.KeyboardEvent) {
    const element = event.target as HTMLInputElement
    const currentSectionIndex = getSectionAtCursor(element, sections)

    if (event.key === sections[currentSectionIndex]?.separator) {
      event.preventDefault()
      event.stopPropagation()
      preprocessAllSections(element, sections)
      handleSectionChange(element, currentSectionIndex, sections, setValid)
      selectNextSection(element, currentSectionIndex, sections)
    } else if (event.key === 'Tab') {
      if (event.shiftKey && currentSectionIndex > 0) {
        event.preventDefault()
        event.stopPropagation()
        selectPreviousSection(element, currentSectionIndex, sections)
      } else if (!event.shiftKey && currentSectionIndex < sections.length - 1) {
        event.preventDefault()
        event.stopPropagation()
        selectNextSection(element, currentSectionIndex, sections)
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      event.stopPropagation()
      increaseCurrentSectionValue(element, sections)
      selectSection(element, currentSectionIndex, sections)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      event.stopPropagation()
      decreaseCurrentSectionValue(element, sections)
      selectSection(element, currentSectionIndex, sections)
    }
  }

  return (
    <div
      style={{
        width: 200,
      }}
    >
      <div
        {...hover}
        style={{
          position: 'relative',
          paddingLeft: border && isFocus ? 11 : 12,
          paddingRight: border && isFocus ? 11 : 12,
          display: 'flex',
          alignItems: 'center',
          borderRadius: '4px',
          flexGrow: 1,
          background: noBackground
            ? 'transparent'
            : useColor({
                color: color.color,
                tone: isFocus || isHover ? color.tone + 1 : 1,
              }),
          border: !valid
            ? '2px solid ' + useColor({ color: 'error' })
            : border
            ? isFocus
              ? '2px solid ' + useColor({ color: 'primary' })
              : '1px solid ' +
                useColor({
                  color: 'divider',
                  opacity: border ? 1 : 0,
                })
            : null,
          ...style,
        }}
      >
        <>
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {InputIcon ? (
              <InputIcon color={{ color: 'foreground', tone: 4 }} />
            ) : null}
          </div>
          <div style={{ width: 28 }} />
        </>
        <input
          ref={inputElement}
          placeholder={placeholder}
          style={{
            width: '100%',
            paddingLeft: 6.5,
            paddingTop: isFocus && border ? 6.5 : 7.5,
            paddingBottom: isFocus && border ? 6.5 : 7.5,
            appearance: 'none',
            fontSize: '15px',
            lineHeight: '24px',
            letterSpacing: '-0.015em',
            background: 'none',
            fontFamily: 'Font',
            color: useColor({ color: 'foreground' }),
            userSelect: 'all',
            fontWeight:
              weight === 'semibold'
                ? 600
                : weight === 'medium'
                ? 500
                : 'normal',
          }}
          onFocus={(event) => {
            setFocus(true)
            if (onFocus) {
              onFocus(event)
            }
          }}
          onBlur={(event) => {
            handleOnBlur(event)
          }}
          onChange={(event) => {
            handleOnChange(event)
          }}
          onKeyDown={(event) => {
            handleKeydownEvent(event)
          }}
        />
        <Clear
          style={{
            opacity: isHover && value ? 1 : 0,
          }}
          onClick={clear}
        />
      </div>
    </div>
  )
}
