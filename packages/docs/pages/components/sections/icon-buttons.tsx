import { IconButton, styled, Row, Column } from '@aviato/ui'

import { NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

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
          </Row>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default IconButtonsPage
