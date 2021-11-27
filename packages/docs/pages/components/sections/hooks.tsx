import DisplayComponent from '../displayComponent'

import { Title, useLongPress, useMouseWheel } from '@aviato/ui'

const HooksPage = () => {
  const LongPressButton = () => {
    const onLongPress = () => {
      console.log('Long-press after pressing for 300ms.')
    }

    const longPressEvent = useLongPress(onLongPress)

    return (
      <button
        style={{
          cursor: 'pointer',
          background: 'lightblue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
        }}
        onClick={() => console.log('Regular press on release.')}
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
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'nowrap',
          width: '300px',
          height: '100px',
          background: '#eeeeee',
        }}
      >
        <p>Element scroll: {clampedOffset}</p>
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
    </div>
  )
}

export default HooksPage
