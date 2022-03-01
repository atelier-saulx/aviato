import React, { forwardRef, ElementRef, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'
import { isText } from '@aviato/utils'

import { Text } from '~/components/Text'
import { Group } from '~/components'
import { styled } from '~/theme'

const StyledListSection = styled('div', {})

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexShrink: 0,

  variants: {
    type: {
      top: {},
      bottom: {},
    },
  },
})

export interface ListSectionProps
  extends ComponentProps<typeof StyledListSection> {
  top: ReactNode
  bottom: ReactNode
}

export const ListSection = forwardRef<
  ElementRef<typeof StyledListSection>,
  ListSectionProps
>((properties, forwardedRef) => {
  const { top, bottom, ...remainingProps } = properties

  const TopChild = isText(top) ? (
    <Text weight="semibold" color="Primary" css={{ lineHeight: 1 }}>
      {top}
    </Text>
  ) : (
    top
  )

  const BottomChild = isText(bottom) ? (
    <Text color="Secondary" css={{ lineHeight: 1 }}>
      {bottom}
    </Text>
  ) : (
    bottom
  )

  return (
    <StyledListSection ref={forwardedRef} {...remainingProps}>
      <Group direction="horizontal" space="xxs">
        <Container>{TopChild}</Container>
        <Container>{BottomChild}</Container>
      </Group>
    </StyledListSection>
  )
})
