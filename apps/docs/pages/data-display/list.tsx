import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ListPage = () => {
  const ShowList = () => {
    return (
      <>
        <Column>
          <Row>List</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>List</NextTitle>

      <NextText color="Secondary">
        Lists are continuous, vertical indexes of text or images.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowList />
      </ShowcaseComponent>
    </Page>
  )
}

export default ListPage
