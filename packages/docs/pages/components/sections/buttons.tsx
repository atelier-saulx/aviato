import { styled } from '@aviato/ui'
import { Button } from '@aviato/ui'
import { NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
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
    <Page>
      <ShowcaseComponent title="Buttons">
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
      </ShowcaseComponent>
    </Page>
  )
}

export default ButtonsPage
