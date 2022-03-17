import { Column, Row, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const TopBarPage = () => {
  const ShowTopBar = () => {
    return (
      <>
        <Column>
          <Row>TopBar</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="TopBar"
        description={`
          Secondary navigation that can be used for tabs, search, actions, etc.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowTopBar />
      </ShowcaseComponent>
    </Page>
  )
}

export default TopBarPage
