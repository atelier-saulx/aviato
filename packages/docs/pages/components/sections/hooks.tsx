import DisplayComponent from '../displayComponent'

import { styled } from '@aviato/ui/theme'
import { log } from '@aviato/ui/utils'
import {
  Title,
  useLongPress,
  useMouseWheel,
  useWindowSize,
  useHover,
} from '@aviato/ui'

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

  const WindowDiv = () => {
    const { width, height } = useWindowSize()

    return (
      <StyledDiv>
        <p>Height: {height}</p>
        <p>Width: {width}</p>
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
        <WindowDiv />
      </DisplayComponent>

      <DisplayComponent name="Hover">
        <HoverDiv />
      </DisplayComponent>
    </div>
  )
}

export default HooksPage
