import { Column, Row, Page, Tabs, Tab } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const TabsPage = () => {
  const ShowTabs = () => {
    return (
      <>
        <Column>
          <Row>
            <Tabs>
              <Tab>Components</Tab>
              <Tab>Design</Tab>
              <Tab>Docs</Tab>
              <Tab>Resources</Tab>
            </Tabs>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Tabs</NextTitle>

      <NextText color="Secondary">
        Switch between different views, features and environments.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowTabs />
      </ShowcaseComponent>
    </Page>
  )
}

export default TabsPage
