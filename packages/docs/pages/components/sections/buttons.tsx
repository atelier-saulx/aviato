import DisplayComponent from '../displayComponent'

import { Title, Button, styled } from '@aviato/ui'

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

const RootDiv = styled('div', {
  paddingTop: 20,
  paddingBottom: 20,
})

const TitleDiv = styled('div', {
  paddingLeft: 20,
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
      <TitleDiv>
        <Title weight="Bold">Buttons</Title>
      </TitleDiv>

      <DisplayComponent name="Buttons">
        <Wrapper>
          <Title weight="Bold">Regular</Title>
          <Row>
            <Button variant="filled">Button</Button>
            <Spacer />
            <Button variant="outlined">Button</Button>
            <Spacer />
            <Button variant="transparent">Button</Button>
          </Row>

          <BigSpacer />

          <Title weight="Bold">Disabled</Title>
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
