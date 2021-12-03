import { IconButton, styled } from '@aviato/ui'

import { NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
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

const IconButtonsPage = () => {
  return (
    <Page>
      <ShowcaseComponent title="Icon Buttons">
        <Column>
          <NextText weight="Bold">Icon Buttons</NextText>
          <Row>
            <IconButton />
            <Spacer />
            <IconButton variant="outlined" />
            <Spacer />
            <IconButton variant="transparent" />
            <Spacer />
          </Row>

          <BigSpacer />

          <NextText weight="Bold">Disabled</NextText>
          <Row>
            <IconButton disabled />
            <Spacer />
            <IconButton variant="outlined" disabled />
            <Spacer />
            <IconButton variant="transparent" disabled />
            <Spacer />
          </Row>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default IconButtonsPage
