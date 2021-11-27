import DisplayComponent from '../displayComponent'

import {
  log,
  Title,
  useLongPress,
  useMouseWheel,
  useWindowSize,
  useHover,
  styled,
} from '@aviato/ui'

const StyledDiv = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'flex-start',
  background: '#eeeeee',
  padding: '12px',
})

const HooksPage = () => {
  const LongPressButton = () => {
    const onLongPress = () => {
      log.global.info('Long-press after pressing for 300ms.')
    }

    const longPressEvent = useLongPress(onLongPress)

    return (
      <button
        style={{
          cursor: 'pointer',
          background: '#eeeeee',
          padding: '10px 20px',
          borderRadius: '6px',
        }}
        onClick={() => log.global.info('Regular press on release.')}
        {...longPressEvent}
      >
        Button
      </button>
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
    const [hover, isHovered, isActive] = useHover()

    return (
      <StyledDiv {...hover}>
        <p>Hover?: {isHovered ? 'Yes' : 'No'}</p>
        <p>Active?: {isActive ? 'Yes' : 'No'}</p>
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
