import { Column, Row, Page, List, ListItem } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ListPage = () => {
  const ShowList = () => {
    return (
      <>
        <Column>
          <Row>
            <List>
              <ListItem>Test</ListItem>
              <ListItem>Test</ListItem>
              <ListItem>Test</ListItem>
              <ListItem>Test</ListItem>
            </List>
          </Row>
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
