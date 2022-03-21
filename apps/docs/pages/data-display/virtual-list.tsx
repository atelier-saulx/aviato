import { Column, Row, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const VirtualListPage = () => {
  const ShowVirtualList = () => {
    return (
      <>
        <Column>
          <Row>VirtualList</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="VirtualList"
        description={`
          Show information in a VirtualList view.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowVirtualList />
      </ShowcaseComponent>
    </Page>
  )
}

export default VirtualListPage
