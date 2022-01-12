import React, {
  createContext,
  useContext,
  useReducer,
  cloneElement,
  useRef,
} from 'react'
import { styled } from '~/theme'
import { IconChevronDown } from '~/icons'
import { Text } from '../../Text'

const AccordionContext = createContext(undefined)

const initalState = new Set()
const multiple = (selected, index) => {
  selected = new Set(selected)
  if (selected.has(index)) {
    selected.delete(index)
  } else {
    selected.add(index)
  }
  return selected
}

const single = (selected, index) => {
  return selected.has(index) ? new Set() : new Set([index])
}

const Container = styled('div', {
  width: '100%',
})

const ItemContainer = styled('div', {
  width: '100%',
  cursor: 'pointer',
  borderBottom: '1px solid $OtherDivider',
})

const ItemHeader = styled('header', {
  height: 40,
  display: 'flex',
  alignItems: 'center',

  variants: {
    state: {
      active: {
        backgroundColor: '$ActionMainHover',
        '&:hover': {
          background: '$ActionMainSelected',
        },
        '&:active': {
          background: '$ActionMainHover',
        },
      },
      inactive: {
        '&:hover': {
          background: '$ActionMainHover',
        },
        '&:active': {
          background: '$ActionMainSelected',
        },
      },
    },
  },
})

const Icon = styled(IconChevronDown, {
  width: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.3s',
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

const Body = styled(Text, {
  paddingTop: 12,
  paddingBottom: 16,
  paddingLeft: 40,
})

export const Accordion = ({ children, type = 'multiple' }) => {
  const [selected, toggle] = useReducer(
    type === 'single' ? single : multiple,
    initalState
  )
  return (
    <Container>
      <AccordionContext.Provider
        value={{
          type,
          selected,
          toggle,
        }}
      >
        {children.map((child, index) =>
          cloneElement(child, { key: index, index })
        )}
      </AccordionContext.Provider>
    </Container>
  )
}

Accordion.Item = ({ title, children, index = 0, active = false }) => {
  const { selected, toggle } = useContext(AccordionContext)
  const activeRef = useRef(false)

  if (activeRef.current !== active) {
    activeRef.current = active
    if (active) {
      selected.add(index)
    } else {
      selected.delete(index)
    }
  }

  const isActive = selected.has(index)
  const state = selected.has(index) ? 'active' : 'inactive'

  return (
    <ItemContainer onClick={() => toggle(index)}>
      <ItemHeader state={state}>
        <Icon state={state} />
        <Text weight="medium">{title}</Text>
      </ItemHeader>
      {isActive ? <Body>{children}</Body> : null}
    </ItemContainer>
  )
}
