import { useRef } from 'react'

import { log } from '@aviato/utils'
import { styled, useIdle } from '@aviato/ui'
import { Button, Text } from '@aviato/ui'
import { Page } from '../../../components'

import {
  useElementRect,
  useHover,
  useLongPress,
  useMouseWheel,
  useWindowSize,
} from '@aviato/ui'

import { ShowcaseComponent } from '../../../components'

const StyledDiv = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'flex-start',
  background: '#FFF',
  padding: '12px',
  borderRadius: '4px',
})

const HooksPage = () => {
  const IdleDiv = () => {
    const isIdle = useIdle(500)

    return (
      <StyledDiv>
        <Text>User is idle: {isIdle ? 'Yes 😴' : 'Nope ⚡️'}</Text>
      </StyledDiv>
    )
  }

  const LongPressButton = () => {
    const onLongPress = () => {
      log.global.info('Long-press after pressing for 300ms.')
    }

    const longPressEvent = useLongPress(onLongPress)

    return (
      <Button
        onClick={() => log.global.info('Regular press on release.')}
        {...longPressEvent}
      >
        Button
      </Button>
    )
  }

  const ScrollDiv = () => {
    const wheelOffset = useMouseWheel()
    const clampedOffset = Math.floor(wheelOffset)

    return (
      <StyledDiv>
        <Text>Page scroll: {clampedOffset}</Text>
      </StyledDiv>
    )
  }

  const DimensionDiv = () => {
    const ref = useRef<HTMLDivElement>(null)

    const { width: windowWidth, height: windowHeight } = useWindowSize()
    const { width: elementWidth, height: elementHeight } = useElementRect(
      ref,
      true
    )

    return (
      <StyledDiv ref={ref}>
        <Text>Page Width: {windowWidth}</Text>
        <Text>Page Height: {windowHeight}</Text>
        <Text>Element Width: {elementWidth}</Text>
        <Text>Element Height: {elementHeight}</Text>
      </StyledDiv>
    )
  }

  const HoverDiv = () => {
    const [hoverRef, isHovered, isActive] = useHover<HTMLDivElement>()

    return (
      <StyledDiv ref={hoverRef}>
        <Text>Hover? - {isHovered ? '😃' : '🙂'}</Text>
        <Text>Active? - {isActive ? '😎' : '🙂'}</Text>
      </StyledDiv>
    )
  }

  return (
    <Page>
      <ShowcaseComponent title="Idle Hook">
        <IdleDiv />
      </ShowcaseComponent>

      <ShowcaseComponent title="Long-press Hook">
        <LongPressButton />
      </ShowcaseComponent>

      <ShowcaseComponent title="Hover Hook">
        <HoverDiv />
      </ShowcaseComponent>

      <ShowcaseComponent title="Window Size Hook">
        <DimensionDiv />
      </ShowcaseComponent>

      <ShowcaseComponent title="Page Scroll Hook">
        <ScrollDiv />
      </ShowcaseComponent>
    </Page>
  )
}

export default HooksPage
