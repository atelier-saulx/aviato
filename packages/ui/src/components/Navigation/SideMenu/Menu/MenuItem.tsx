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

const IconContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 'auto',
  width: 24,
  height: 24,
  borderRadius: 24,
})

const ExpandIndicator = styled(IconChevronDown, {
  color: '$TextPrimary',

  variants: {
    state: {
      expanded: {
        transform: 'rotate(180deg)',
      },
      hidden: {
        transform: 'rotate(360deg)',
      },
    },
  },
})

const StyledMenuItem = styled('button', {
  width: '100%',
  padding: '4px 12px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  borderRadius: 4,
  background: 'transparent',
  color: '$TextPrimary',

  '&:hover': {
    background: '$ActionLightHover',
  },

  '&:active': {
    color: '$ActionLightContrast',
    background: '$ActionLightSelected',
  },
  '&.isActive': {
    color: '$ActionLightContrast',
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

export interface MenuItemProps extends ComponentProps<typeof StyledMenuItem> {
  title: string
  isActive?: boolean
  isHeader?: boolean
  startOpen?: boolean
  isOpen?: boolean
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
    isOpen,
    ...remainingProps
  } = properties

  const hasChildren = Boolean(children)
  const isExpandable = hasChildren && !isHeader
  const isCollapsible = !isHeader && hasChildren

  const [isOpenState, setIsOpenState] = useState(startOpen)

  useEffect(() => {
    setIsOpenState(isHeader || startOpen)
  }, [isHeader])

  useEffect(() => {
    if (isOpen !== undefined) {
      setIsOpenState(isOpen)
    }
  }, [isOpen])

  const toggle = useCallback(() => {
    if (!isCollapsible) {
      return onClick()
    }

    if (hasChildren) {
      setIsOpenState(!isOpenState)
    } else {
      onClick()
    }
  }, [isCollapsible, isOpenState, hasChildren])

  const classes = classNames({
    isActive,
    isHeader,
    isExpandable,
  })

  const iconState = isOpenState ? 'expanded' : 'hidden'
  const fontWeight = isHeader ? 'bold' : isExpandable ? 'semibold' : 'regular'

  return (
    <>
      <StyledMenuItem
        onClick={toggle}
        className={classes}
        ref={forwardedRef}
        {...remainingProps}
      >
        <Column>
          <Text color="inherit" weight={fontWeight}>
            {title}
          </Text>

          <Conditional test={isExpandable}>
            <IconContainer>
              <ExpandIndicator state={iconState} />
            </IconContainer>
          </Conditional>
        </Column>
      </StyledMenuItem>

      <Conditional test={isOpenState}>
        <StyledChild onClick={(event) => event.stopPropagation()}>
          {children}
        </StyledChild>
      </Conditional>
    </>
  )
})

MenuItem.displayName = 'MenuItem'
