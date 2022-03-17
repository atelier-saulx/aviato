import { Column, Row, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const GridPage = () => {
  const ShowGrid = () => {
    return (
      <>
        <Column>
          <Row>Grid</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Grid"
        description={`
          Show information in a grid view.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowGrid />
      </ShowcaseComponent>
    </Page>
  )
}

export default GridPage
