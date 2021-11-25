import { DisplayComponent } from '../displayComponent'

import { Title, Text, Paragraph } from '@aviato/ui'

const MenuPage = () => {
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
        <Title fontWeight="bold">Text</Title>
      </div>

      <DisplayComponent name="Title">
        <Title>Title</Title>
      </DisplayComponent>

      <DisplayComponent name="Text">
        <Text>Text</Text>
      </DisplayComponent>

      <DisplayComponent name="Paragraph">
        <Paragraph>Paragraph</Paragraph>
      </DisplayComponent>
    </div>
  )
}

export default MenuPage
