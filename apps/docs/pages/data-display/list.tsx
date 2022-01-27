import {
  Column,
  Row,
  Page,
  List,
  ListItem,
  IconCheck,
  Switch,
  Checkbox,
  IconCheckCircle,
  IconMore,
  IconPlus,
  ListIcon,
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
                leftArea: <ListIcon icon="IconModel" />,
                rightArea: <IconMore />,
                content: 'Header Title',
              }}
              footer={{
                leftArea: <IconPlus />,
                content: 'Add type',
              }}
            >
              <ListItem
                leftArea={<ListIcon icon="IconModel" />}
                rightArea={<IconMore />}
              >
                Name
              </ListItem>
              <ListItem
                leftArea={<ListIcon icon="IconModel" />}
                rightArea={<IconMore />}
              >
                Name
              </ListItem>
              <ListItem
                leftArea={<ListIcon icon="IconModel" />}
                rightArea={<IconMore />}
              >
                Name
              </ListItem>
              <ListItem
                leftArea={<ListIcon icon="IconModel" />}
                rightArea={<IconMore />}
              >
                Name
              </ListItem>
            </List>
          </Row>
        </Column>
      </>
    )
  }

  const ShowLargeList = () => {
    return (
      <>
        <Column>
          <Row css={{ minWidth: 600 }}>
            <List type="complex">
              <ListItem
                leftArea={<ListIcon icon="IconModel" size="large" />}
                rightArea={<IconMore />}
                showDragIcon
              >
                Name
              </ListItem>
              <ListItem
                leftArea={<ListIcon icon="IconModel" size="large" />}
                showDragIcon
              >
                Name
              </ListItem>
              <ListItem
                leftArea={<ListIcon icon="IconModel" size="large" />}
                showDragIcon
              >
                Name
              </ListItem>
              <ListItem
                leftArea={<ListIcon icon="IconModel" size="large" />}
                showDragIcon
              >
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

      <ShowcaseComponent background="transparent">
        <ShowLargeList />
      </ShowcaseComponent>
    </Page>
  )
}

export default ListPage
