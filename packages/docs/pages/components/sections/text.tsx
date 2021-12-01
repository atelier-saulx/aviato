import { styled } from '@aviato/ui'
import { Title, Text } from '@aviato/ui'

import { NextTitle } from '../../../components'

import DisplayComponent from '../displayComponent'

const RootDiv = styled('div', {
  paddingTop: 20,
  paddingBottom: 20,
})

const TextPage = () => {
  return (
    <RootDiv>
      <NextTitle weight="Bold" paddingLeft={20}>
        Text
      </NextTitle>

      <DisplayComponent name="Title">
        <Title>Title</Title>
      </DisplayComponent>

      <DisplayComponent name="Text">
        <Text>Text</Text>
      </DisplayComponent>
    </RootDiv>
  )
}

export default TextPage
