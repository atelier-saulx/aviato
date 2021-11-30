import { styled } from '@aviato/ui'
import { Title, Text } from '@aviato/ui'

import DisplayComponent from '../displayComponent'

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const TextPage = () => {
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
        <Title weight="Bold">Text</Title>
      </div>

      <DisplayComponent name="Title">
        <Title>Title</Title>
      </DisplayComponent>

      <DisplayComponent name="Text">
        <Text>Text</Text>
      </DisplayComponent>
    </div>
  )
}

export default TextPage
