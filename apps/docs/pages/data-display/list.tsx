import { Column, Row, Page, List, ListItem } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ListPage = () => {
  const ShowList = () => {
    return (
      <>
        <Column>
          <Row>
            <List>
              <ListItem isActive>Monday</ListItem>
              <ListItem>Tuesday</ListItem>
              <ListItem>Wednesday</ListItem>
              <ListItem>Thursday</ListItem>
              <ListItem>Friday</ListItem>
              <ListItem>Saturday</ListItem>
              <ListItem>Sunday</ListItem>
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

      <ShowcaseComponent>
        <ShowList />
      </ShowcaseComponent>
    </Page>
  )
}

export default ListPage
