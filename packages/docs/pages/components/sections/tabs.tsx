import { styled, Tab } from '@aviato/ui'
import { Row, Column } from '@aviato/ui'
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

const TabsPage = () => {
  return (
    <Page>
      <ShowcaseComponent title="Tabs">
        <Column>
          <Row>
            <Tab>Button</Tab>
            <Spacer />
            <Tab isActive>Button</Tab>
            <Spacer />
            <Tab disabled>Button</Tab>
          </Row>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default TabsPage
