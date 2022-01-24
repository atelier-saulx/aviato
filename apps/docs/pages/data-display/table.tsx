import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

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
      <NextTitle>Table</NextTitle>

      <NextText color="Secondary">
        Tables are used to organize and display data efficiently.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowTable />
      </ShowcaseComponent>
    </Page>
  )
}

export default TablePage
