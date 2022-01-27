import {
  Column,
  Row,
  Page,
  List,
  ListItem,
  IconCheck,
  IconModel,
  Switch,
  Checkbox,
  IconCheckCircle,
  IconMore,
} from '@aviato/ui'

import {
  NextTitle,
  NextText,
  ShowcaseComponent,
  SmallSpacer,
} from '../../components'

const ListPage = () => {
  const ShowSimpleList = () => {
    return (
      <>
        <Column>
          <Row css={{ minWidth: 600 }}>
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

          <SmallSpacer />

          <Row css={{ minWidth: 600 }}>
            <List>
              <ListItem leftArea={<IconCheck />} rightArea={<Switch />}>
                Test 1
              </ListItem>
              <ListItem leftArea={<IconCheckCircle />} rightArea={<Checkbox />}>
                Test 2
              </ListItem>
            </List>
          </Row>
        </Column>
      </>
    )
  }

  const ShowComplexList = () => {
    return (
      <>
        <Column>
          <Row css={{ minWidth: 600 }}>
            <List
              header={{
                title: 'Title',
                leftArea: <IconModel />,
                rightArea: <IconMore />,
              }}
            >
              <ListItem leftArea={<IconModel />} rightArea={<IconMore />}>
                Name
              </ListItem>
              <ListItem leftArea={<IconModel />} rightArea={<IconMore />}>
                Name
              </ListItem>
              <ListItem leftArea={<IconModel />} rightArea={<IconMore />}>
                Name
              </ListItem>
              <ListItem leftArea={<IconModel />} rightArea={<IconMore />}>
                Name
              </ListItem>
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
        <ShowSimpleList />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowComplexList />
      </ShowcaseComponent>
    </Page>
  )
}

export default ListPage
