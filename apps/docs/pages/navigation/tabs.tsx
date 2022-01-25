import { Column, Row, Page, Tabs, Tab } from '@aviato/ui'
import { log } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const TabsPage = () => {
  const ShowTabs = () => {
    return (
      <>
        <Column>
          <Row>
            <Tabs
              onChange={(value, payload) => {
                log.global.debug('Tab change: ', { value, payload })
              }}
            >
              <Tab value="components">Components</Tab>
              <Tab value="design">Design</Tab>
              <Tab value="docs">Docs</Tab>
              <Tab value="resources">Resources</Tab>
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

      <ShowcaseComponent>
        <ShowTabs />
      </ShowcaseComponent>
    </Page>
  )
}

export default TabsPage
