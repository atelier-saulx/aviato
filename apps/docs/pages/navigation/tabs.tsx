import {
  Column,
  Row,
  Page,
  Tabs,
  Tab,
  useHasLoaded,
  IconAperture,
  IconSchedule,
  IconUploadCloud,
  IconEmail,
  IconAttachment,
  styled,
} from '@aviato/ui'
import { log } from '@aviato/utils'

import { ShowcaseHeader, ShowcaseComponent, BigSpacer } from '../../components'

const TabContainer = styled('div', {
  padding: '0 $xxl',
  background: '$Background1dp',
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
            <TabContainer>
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
            </TabContainer>
          </Row>

          <BigSpacer />

          <Row>
            <TabContainer>
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
                <Tab value="resources" leftIcon={<IconEmail />} disabled>
                  Resources
                </Tab>
                <Tab value="files" leftIcon={<IconAttachment />}>
                  Files
                </Tab>
              </Tabs>
            </TabContainer>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Tabs"
        description={`
          Can be used to switch between different views, features and
          environments.
        `}
      />

      <ShowcaseComponent
        codeBlock={`
import { Tabs } from '@aviato/ui'

<Tabs
  onChange={(value, payload) => {
    console.log('Tab change: ', { value, payload })
  }}
>
  <Tab value="components">Components</Tab>
  <Tab value="design">Design</Tab>
  <Tab value="docs">Docs</Tab>
  <Tab value="resources">Resources</Tab>
</Tabs>
      `}
      >
        <ShowTabs />
      </ShowcaseComponent>
    </Page>
  )
}

export default TabsPage
