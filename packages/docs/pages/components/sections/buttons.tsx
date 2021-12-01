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
  paddingBottom: '20px',
})

const ButtonsPage = () => {
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
        <Title weight="Bold">Buttons</Title>
      </div>

      <DisplayComponent name="Buttons">
        <Wrapper>
          <Title weight="Bold">Buttons</Title>
          <Row>
            <Button variant="filled">Button</Button>
            <Button variant="outlined">Button</Button>
            <Button variant="transparent">Button</Button>
          </Row>

          <Title weight="Bold">Disabled Buttons</Title>
          <Row>
            <Button disabled variant="filled">
              Button
            </Button>
            <Button disabled variant="outlined">
              Button
            </Button>
            <Button disabled variant="transparent">
              Button
            </Button>
          </Row>
        </Wrapper>
      </DisplayComponent>
    </div>
  )
}

export default ButtonsPage
