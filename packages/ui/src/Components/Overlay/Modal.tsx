import React, { PropsWithChildren, FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { Close, IconName, iconFromString } from '../../icons'
import { Button, ButtonProps } from '../Button'
import useOverlayProps from '../../hooks/overlay/useOverlayProps'
import { OnClose } from '.'
import renderChildren from '../../util/renderChildren'
import { TextValue } from '../../textParser'
import { EditableTitle } from '../Input/EditableTitle'

export type ModalHeaderProps = PropsWithChildren<{
  closeButton?: boolean
  title?: TextValue
  onEditTitle?: (value: string) => void
  editableTitlePlaceholder?: string
  editableTitlePlaceholderAsDefault?: boolean
  onClose?: OnClose
  icon?: IconName
  framed?: boolean
  noBorder?: boolean
}>

export type ConfirmButton = ButtonProps
export type ModalProps = {
  onClose?: OnClose
  height?: number | 'string'
  width?: number | 'string'
  header?: ModalHeaderProps | ((props: object) => ModalHeaderProps)
  confirmButton?: ConfirmButton | ((props: object) => ConfirmButton)
} & { [key: string]: any }

export const ModalHeader: FunctionComponent<ModalHeaderProps> = ({
  closeButton,
  title,
  onEditTitle,
  editableTitlePlaceholder,
  editableTitlePlaceholderAsDefault,
  noBorder,
  children,
  icon,
  framed,
  onClose,
}) => {
  const Icon = icon ? iconFromString(icon) : null
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 25px 10px 25px',
        borderBottom: `1px solid ${useColor({
          color: 'divider',
        })}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        {Icon ? (
          <Icon
            framed={framed}
            style={{
              marginRight: framed ? 15 : 10,
              marginLeft: framed ? '0px' : '-5px',
            }}
          />
        ) : null}
        {title || editableTitlePlaceholderAsDefault ? (
          <EditableTitle
            onChange={onEditTitle}
            placeholder={editableTitlePlaceholder}
            placeholderAsDefault={editableTitlePlaceholderAsDefault}
            value={title}
          />
        ) : (
          <div />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {children}
        {closeButton ? (
          <Close
            style={{ marginRight: '-4px', marginLeft: '16px' }}
            onClick={onClose}
          />
        ) : null}
      </div>
    </div>
  )
}

export const Modal: FunctionComponent<ModalProps> = (initialProps) => {
  const props = useOverlayProps(initialProps)
  let { onClose, confirmButton, children, header } = props

  if (typeof header === 'function') {
    header = header(props)
  }

  if (typeof confirmButton === 'function') {
    confirmButton = confirmButton(props)
  }

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        padding: 24,
      }}
    >
      <div
        style={{
          height: props.height || null,
          maxHeight: 'calc(100% - 52px)',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'all',
          background: useColor({ color: 'background' }),
          borderRadius: '2px',
          width: props.width || 910,
          maxWidth: 'calc(100% - 30px)',
          boxShadow: `0px 8px 16px 1px ${useColor({
            color: 'foreground',
            tone: 2,
            opacity: 0.33,
          })}`,
        }}
      >
        {header ? <ModalHeader onClose={onClose} {...header} /> : null}
        <div
          style={{
            minHeight: 180,
            paddingBottom: header ? 40 : 60,
            overflowY: 'auto',
            overflowX: 'hidden',
            height: 'auto',
            position: 'relative',
            maxHeight: '100%',
          }}
        >
          <div
            style={{
              marginTop: header ? 32 : 60,
              paddingLeft: 64,
              paddingRight: 64,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {renderChildren(children, props)}
          </div>
          {confirmButton ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 32,
                marginRight: 80,
              }}
            >
              <Button
                {...confirmButton}
                onClick={(event) => {
                  // @ts-ignore
                  confirmButton.onClick(event, props)
                  onClose()
                }}
                color={confirmButton.color || { color: 'primary' }}
                icon={confirmButton.icon}
              >
                {confirmButton.children}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
