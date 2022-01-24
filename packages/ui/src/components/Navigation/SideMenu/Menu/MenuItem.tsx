import React, {
  ElementRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { Conditional } from '~/components/Utilities/Conditional'
import { Text } from '~/components/Text'
import { styled, classNames } from '~/theme'
import { IconChevronDown } from '~/components/Icons/components'

const StyledMenuItem = styled('button', {
  width: '100%',
  padding: '4px 12px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  borderRadius: 4,
  color: '$TextSecondary',
  background: 'transparent',

  '&:hover': {
    background: '$ActionMainHover',
  },

  '&:active': {
    color: '$TextPrimary',
    background: '$PrimaryLightSelected',
  },
  '&.isActive': {
    color: '$TextPrimary',
    background: '$PrimaryLightSelected',
  },

  '&.isHeader': {
    cursor: 'unset',

    '&:hover': {
      background: 'transparent',
    },
  },
})

const StyledChild = styled('div', {
  paddingTop: '2px',
})

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
  width: '100%',
})

const Icon = styled(IconChevronDown, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 'auto',
  variants: {
    state: {
      active: {
        transform: 'rotate(180deg)',
      },
      inactive: {
        transform: 'rotate(360deg)',
      },
    },
  },
})

export interface MenuItemProps extends ComponentProps<typeof StyledMenuItem> {
  title: string
  isActive?: boolean
  isHeader?: boolean
  startOpen?: boolean
  onClick?: (value) => void
}

export const MenuItem = forwardRef<
  ElementRef<typeof StyledMenuItem>,
  MenuItemProps
>((properties, forwardedRef) => {
  const {
    title,
    onClick = noop,
    children,
    isActive = false,
    isHeader = false,
    startOpen = false,
    ...remainingProps
  } = properties

  const hasChildren = Boolean(children)
  const isCollapsible = !isHeader && hasChildren

  const [isOpen, setIsOpen] = useState(startOpen)

  useEffect(() => {
    setIsOpen(isHeader || startOpen)
  }, [isHeader])

  const toggle = useCallback(() => {
    if (!isCollapsible) {
      return onClick()
    }

    if (hasChildren) {
      setIsOpen(!isOpen)
    } else {
      onClick()
    }
  }, [isCollapsible, isOpen, hasChildren])

  const classes = classNames({
    isActive,
    isHeader,
  })

  const iconState = isOpen ? 'active' : 'inactive'

  return (
    <>
      <StyledMenuItem
        onClick={toggle}
        className={classes}
        ref={forwardedRef}
        {...remainingProps}
      >
        <Column>
          <Text
            weight={isHeader ? 'bold' : 'regular'}
            color={isHeader || hasChildren ? 'Primary' : 'Inherit'}
          >
            {title}
          </Text>

          <Conditional test={hasChildren && !isHeader}>
            <Icon state={iconState} />
          </Conditional>
        </Column>
      </StyledMenuItem>

      <Conditional test={isOpen}>
        <StyledChild onClick={(event) => event.stopPropagation()}>
          {children}
        </StyledChild>
      </Conditional>
    </>
  )
})
