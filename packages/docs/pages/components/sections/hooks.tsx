import { useRef } from 'react'

import { log } from '@aviato/utils'
import { styled } from '@aviato/ui'
import { Button, Title, Text } from '@aviato/ui'

import {
  useElementRect,
  useHover,
  useLongPress,
  useMouseWheel,
  useWindowSize,
} from '@aviato/ui'

import DisplayComponent from '../displayComponent'

const StyledDiv = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'flex-start',
  background: '#eeeeee',
  padding: '12px',
})

const StyledButton = styled('button', {
  cursor: 'pointer',
  background: '#eeeeee',
  padding: '10px 20px',
  borderRadius: '6px',
})

const HooksPage = () => {
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
        <p>Element scroll: {clampedOffset}</p>
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
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <div
        style={{
          paddingLeft: 20,
        }}
      >
        <Title weight="Bold">Hooks</Title>
      </div>

      <DisplayComponent name="Button">
        <LongPressButton />
      </DisplayComponent>

      <DisplayComponent name="Scroll">
        <ScrollDiv />
      </DisplayComponent>

      <DisplayComponent name="Window Size">
        <DimensionDiv />
      </DisplayComponent>

      <DisplayComponent name="Hover">
        <HoverDiv />
      </DisplayComponent>
    </div>
  )
}

export default HooksPage
