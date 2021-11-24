import '@compiled/react'
import React, {
  useState,
  FunctionComponent,
  useRef,
  useEffect,
  CSSProperties,
} from 'react'
import { getStringValue, TextValue } from '../../textParser'
import { useColor } from '../../theme'
import useHover from '../../hooks/events/useHover'
import { EditName as EditIcon } from '../../icons'
import useScopedState from '../../hooks/useScopedState'

type EditableTitle = {
  value?: TextValue
  placeholder?: TextValue
  identifier?: any
  onChange?: (value: string) => void
  onBlur?: (event: React.FormEvent<HTMLDivElement>) => void
  placeholderAsDefault?: boolean
  autoFocus?: boolean
  weight?: 'regular' | 'medium' | 'semibold'
  hoverTone?: 1 | 2 | 3
  horizontalPaddding?: number
}

export const EditableTitle: FunctionComponent<EditableTitle> = ({
  value,
  onChange,
  onBlur,
  placeholderAsDefault,
  autoFocus,
  identifier,
  placeholder = '',
  weight = 'semibold',
  hoverTone = 2,
  horizontalPaddding = 9,
}) => {
  const [hover, isHover] = !onChange ? [{}, false] : useHover()
  const [isEditing, setEditing] = useState(false)
  const [inputText, setInputText] = useScopedState(value, identifier, isEditing)
  const ref = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  const editingFix = () => ref.current && ref.current.blur()
  useEffect(() => {
    window.addEventListener('blur', editingFix)
    return () => {
      window.removeEventListener('blur', editingFix)
    }
  }, [])

  useEffect(() => {
    if (ref.current && autoFocus) {
      setEditing(true)
      // @ts-ignore
      ref.current.focus()
    }
  }, [autoFocus])

  const textProperties: CSSProperties = {
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '-0.015em',
    fontWeight:
      weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 'normal',
  }

  const showPlaceholder = !inputText || (placeholderAsDefault && !inputText)
  const showEllipsis = !isEditing && !isHover

  return (
    <div
      {...hover}
      style={{
        display: 'flex',
        flexGrow: 1,
        width: 'calc(100% - 30px)',
        borderRadius: '4px',
        border: isEditing
          ? '1px solid ' + useColor({ color: 'divider' })
          : null,
        overflow: 'hidden',
      }}
    >
      <div
        ref={ref}
        contentEditable={!!onChange}
        suppressContentEditableWarning
        className={[
          showPlaceholder ? 'showPlaceholder' : undefined,
          placeholderAsDefault ? 'placeholderAsDefault' : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
        css={{
          minWidth: 20,
          minHeight: 24,
          '&.showPlaceholder::before': {
            content: '"' + getStringValue(placeholder) + '"',
            color: String(useColor({ color: 'foreground', tone: 3 })),
            ...textProperties,
          },
          '&.showPlaceholder.placeholderAsDefault::before': {
            color: String(useColor({ color: 'foreground' })),
          },
          '&.showPlaceholder::focus': {
            textOverflow: 'unset',
          },
        }}
        style={{
          userSelect: !onChange ? 'none' : null,
          cursor: !onChange ? 'default' : null,
          background:
            !isEditing && isHover
              ? useColor({ color: 'background', tone: hoverTone })
              : null,

          paddingLeft: !isEditing ? horizontalPaddding + 1 : horizontalPaddding,
          paddingRight: !isEditing
            ? horizontalPaddding + 1
            : horizontalPaddding,
          paddingTop: !isEditing ? 1 : null,
          paddingBottom: !isEditing ? 1 : null,
          ...textProperties,
          color: useColor({ color: 'foreground' }),
          boxShadow: isEditing
            ? `0px 3px 8px 1px ${useColor({
                color: 'background',
                tone: 2,
              })}`
            : null,
          overflow: isFocused ? 'visible' : 'hidden',
          textOverflow: showEllipsis ? 'ellipsis' : 'unset',

          // backgroundColor: isEditing ? 'red' : 'yellow',
        }}
        onInput={(event) => {
          const el = event.target as HTMLElement
          el.classList.remove('showPlaceholder')
          const v = el.innerText
          if (v === '' || v === '\n') {
            el.innerText = ''
            el.classList.add('showPlaceholder')
          }
          onChange(v)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === 'Escape') {
            event.preventDefault()
            event.stopPropagation()
            ;(event.target as HTMLElement).blur()
            const el = event.target as HTMLElement
            const v = el.innerText
            setInputText(v)
            setEditing(false)
            if (typeof onBlur === 'function') onBlur(event)
          }
        }}
        onBlur={(event) => {
          const el = event.target as HTMLElement
          const v = el.innerText
          if (v === '\n') {
            el.innerText = ''
            return
          }
          setInputText(v)
          setEditing(false)
          if (typeof onBlur === 'function') onBlur(event)
          if (placeholderAsDefault) el.classList.add('placeholderAsDefault')
          setIsFocused(false)
        }}
        onFocus={(event) => {
          const el = event.target as HTMLElement
          el.classList.remove('placeholderAsDefault')
          setIsFocused(true)
        }}
        onClick={(event) => {
          event.stopPropagation()
          if (onChange && !isEditing) {
            setEditing(true)
            ;(event.target as HTMLElement).focus()
          }
        }}
      >
        {getStringValue(inputText) || ''}
      </div>
      {onChange && !isEditing && isHover ? (
        <EditIcon color={{ color: 'foreground' }} />
      ) : null}
    </div>
  )
}
