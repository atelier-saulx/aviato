import {
  Column,
  Row,
  Page,
  Tabs,
  Tab,
  styled,
  useHasLoaded,
  IconAperture,
  IconSchedule,
  IconUploadCloud,
  IconEmail,
} from '@aviato/ui'
import { log } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const TabsPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

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

          <BigSpacer />

          <Row>
            <Tabs>
              <Tab value="components" leftIcon={<IconAperture />}>
                Components
              </Tab>
              <Tab value="design" leftIcon={<IconSchedule />}>
                Design
              </Tab>
              <Tab value="docs" leftIcon={<IconUploadCloud />}>
                Docs
              </Tab>
              <Tab value="resources" leftIcon={<IconEmail />}>
                Resources
              </Tab>
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
