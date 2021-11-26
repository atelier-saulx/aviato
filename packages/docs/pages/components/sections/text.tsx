import DisplayComponent from '../displayComponent'

import { Title, Text, Paragraph } from '@aviato/ui'
import { styled } from '@aviato/theme'

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

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
        <Column>
          <Paragraph>Paragraph</Paragraph>
          <Paragraph weight="semibold">Paragraph</Paragraph>
          <Paragraph weight="bold">Paragraph</Paragraph>
          <Paragraph size="medium">Paragraph</Paragraph>
          <Paragraph size="large">Paragraph</Paragraph>
        </Column>
      </DisplayComponent>
    </div>
  )
}

export default MenuPage
