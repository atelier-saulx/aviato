import React, { useReducer, cloneElement } from 'react'

import { styled } from '~/theme'
import { AccordionItem } from './AccordionItem'
import { AccordionContext } from './AccordionContext'

const initialState = new Set()

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

export const Accordion = ({ children, type = 'multiple' }) => {
  const [selected, toggle] = useReducer(
    type === 'single' ? single : multiple,
    initialState
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
          cloneElement(child, { key: `Accordion-${index}`, index })
        )}
      </AccordionContext.Provider>
    </Container>
  )
}

Accordion.displayName = 'Accordion'

Accordion.Item = AccordionItem
