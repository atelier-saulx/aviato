import DisplayComponent from '../displayComponent'

import { styled } from '@aviato/ui'
import { log } from '@aviato/ui'
import {
  Title,
  useDimensions,
  useHover,
  useLongPress,
  useMouseWheel,
  useWindowSize,
} from '@aviato/ui'
import { useRef } from 'react'

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
      <StyledButton
        onClick={() => log.global.info('Regular press on release.')}
        {...longPressEvent}
      >
        Button
      </StyledButton>
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
    const {
      borderBox: { width, height },
    } = useDimensions(ref, true)

    return (
      <StyledDiv ref={ref}>
        <p>Page Width: {windowWidth}</p>
        <p>Page Height: {windowHeight}</p>
        <p>Element Width: {Math.ceil(width)}</p>
        <p>Element Height: {Math.ceil(height)}</p>
      </StyledDiv>
    )
  }

  const HoverDiv = () => {
    const [hoverRef, isHovered, isActive] = useHover<HTMLDivElement>()

    return (
      <StyledDiv ref={hoverRef}>
        <p>Hover? - {isHovered ? '😃' : '🙂'}</p>
        <p>Active? - {isActive ? '😎' : '🙂'}</p>
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
        <Title fontWeight="bold">Hooks</Title>
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
