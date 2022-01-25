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
} from '@aviato/ui'
import { log } from '@aviato/utils'

import {
  NextTitle,
  NextText,
  ShowcaseComponent,
  BigSpacer,
} from '../../components'

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
              <Tab value="resources" leftIcon={<IconEmail />} disabled>
                Resources
              </Tab>
              <Tab value="files" leftIcon={<IconAttachment />}>
                Files
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
        Can be used to switch between different views, features and
        environments.
      </NextText>

      <ShowcaseComponent
        codeBlock={`
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
