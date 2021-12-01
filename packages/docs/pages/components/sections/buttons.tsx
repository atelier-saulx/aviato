import DisplayComponent from '../displayComponent'

import { Button, styled } from '@aviato/ui'
import { NextText } from '../../../components'

const RootDiv = styled('div', {
  paddingTop: 20,
  paddingBottom: 20,
})

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
})

const Row = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
})

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const Spacer = styled('div', {
  width: 6,
  height: 6,
})

const ButtonsPage = () => {
  return (
    <RootDiv>
      <DisplayComponent name="Buttons">
        <Wrapper>
          <NextText weight="Bold">Regular</NextText>
          <Row>
            <Button variant="filled">Button</Button>
            <Spacer />
            <Button variant="outlined">Button</Button>
            <Spacer />
            <Button variant="transparent">Button</Button>
          </Row>

          <BigSpacer />

          <NextText weight="Bold">Disabled</NextText>
          <Row>
            <Button disabled variant="filled">
              Button
            </Button>
            <Spacer />
            <Button disabled variant="outlined">
              Button
            </Button>
            <Spacer />
            <Button disabled variant="transparent">
              Button
            </Button>
          </Row>
        </Wrapper>
      </DisplayComponent>
    </RootDiv>
  )
}

export default ButtonsPage
