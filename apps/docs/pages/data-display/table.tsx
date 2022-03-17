import { Column, Row, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const TablePage = () => {
  const ShowTable = () => {
    return (
      <>
        <Column>
          <Row>Table</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Table"
        description={`
          Tables are used to organize and display data efficiently.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowTable />
      </ShowcaseComponent>
    </Page>
  )
}

export default TablePage
