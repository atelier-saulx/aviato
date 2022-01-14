import React, { CSSProperties, forwardRef, ReactNode } from 'react'
import { getZIndex } from '~/theme'
import { Popper } from '~/components/Overlay'

interface SelectDropdownProps {
  mounted: boolean
  uuid: string
  maxDropdownHeight?: number | string
  withinPortal?: boolean
  children: ReactNode
  referenceElement?: HTMLElement
  direction?: CSSProperties['flexDirection']
  zIndex?: number
  dropdownPosition?: 'bottom' | 'top' | 'flip'
}

export const SelectDropdown = forwardRef<HTMLDivElement, SelectDropdownProps>(
  (
    {
      mounted,
      uuid,
      maxDropdownHeight,
      withinPortal = true,
      children,
      referenceElement,
      direction = 'column',
      zIndex = getZIndex('Popover'),
      dropdownPosition = 'flip',
    }: SelectDropdownProps,
    ref
  ) => {
    return (
      <Popper
        referenceElement={referenceElement}
        mounted={mounted}
        position={dropdownPosition === 'flip' ? 'bottom' : dropdownPosition}
        withinPortal={withinPortal}
        zIndex={zIndex}
        modifiers={[
          {
            name: 'preventOverflow',
            enabled: false,
          },
          {
            name: 'flip',
            enabled: dropdownPosition === 'flip',
          },
        ]}
      >
        <div style={{ maxHeight: maxDropdownHeight, display: 'flex' }}>
          <div
            id={`${uuid}-items`}
            aria-labelledby={`${uuid}-label`}
            role="listbox"
            ref={ref}
            onMouseDown={(event) => event.preventDefault()}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: direction,
                width: '100%',
                background: 'red',
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </Popper>
    )
  }
)
