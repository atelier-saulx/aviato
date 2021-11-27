import DisplayComponent from '../displayComponent'

import { Title, useLongPress } from '@aviato/ui'

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
        {...longPressEvent}
      >
        Button
      </button>
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
    </div>
  )
}

export default HooksPage
