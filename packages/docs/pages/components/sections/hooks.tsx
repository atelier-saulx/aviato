import DisplayComponent from '../displayComponent'

import {
  Title,
  useLongPress,
  useMouseWheel,
  useWindowSize,
  log,
} from '@aviato/ui'

const HooksPage = () => {
  const LongPressButton = () => {
    const onLongPress = () => {
      log.info('Long-press after pressing for 300ms.')
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
        onClick={() => log.info('Regular press on release.')}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'nowrap',
          width: '200px',
          background: '#eeeeee',
          padding: '12px',
        }}
      >
        <p>Element scroll: {clampedOffset}</p>
      </div>
    )
  }

  const WindowDiv = () => {
    const { width, height } = useWindowSize()

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '200px',
          background: '#eeeeee',
          padding: '12px',
        }}
      >
        <p>Height: {height}</p>
        <p>Width: {width}</p>
      </div>
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
    </div>
  )
}

export default HooksPage
