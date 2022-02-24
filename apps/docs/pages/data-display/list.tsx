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
  ListSection,
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
                children: 'Header Title',
              }}
              footer={{
                leftArea: <IconPlus />,
                children: 'Footer Title',
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
            <List type="complex" isDraggable>
              <ListItem leftArea={<ListIcon icon="IconModel" size="large" />}>
                Name
              </ListItem>
              <ListItem leftArea={<ListIcon icon="IconModel" size="large" />}>
                Name
              </ListItem>
              <ListItem leftArea={<ListIcon icon="IconModel" size="large" />}>
                Name
              </ListItem>
              <ListItem leftArea={<ListIcon icon="IconLink" size="large" />}>
                Name
              </ListItem>
            </List>
          </Row>
        </Column>
      </>
    )
  }

  const ShowFloatingList = () => {
    return (
      <>
        <Column>
          <Row css={{ minWidth: 600 }}>
            <List type="floating" isDraggable>
              <ListItem
                leftArea={
                  <ListIcon icon="IconText" size="large" background="purple" />
                }
                rightArea={<IconMore />}
              >
                Name
              </ListItem>
              <ListItem
                leftArea={<ListIcon icon="IconModel" size="large" />}
                rightArea={<IconMore />}
              >
                Name
              </ListItem>
              <ListItem
                leftArea={<ListIcon icon="IconModel" size="large" />}
                rightArea={<IconMore />}
              >
                Name
              </ListItem>
              <ListItem
                leftArea={<ListIcon icon="IconLink" size="large" />}
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

  const ShowPrimitives = () => {
    return (
      <>
        <Column>
          <Row css={{ minWidth: 300 }}>
            <List type="floating">
              <ListItem
                leftArea={
                  <ListIcon icon="IconText" size="large" background="purple" />
                }
              >
                <ListSection top="String" bottom="Text, word, etc." />
              </ListItem>

              <ListItem
                leftArea={
                  <ListIcon
                    icon="IconMarkdown"
                    size="large"
                    background="purple"
                  />
                }
              >
                <ListSection top="Markdown" bottom="Markdown editor" />
              </ListItem>

              <ListItem
                leftArea={
                  <ListIcon
                    icon="IconInteger"
                    size="large"
                    background="yellow"
                  />
                }
              >
                <ListSection top="Number" bottom="Amount, ID, etc." />
              </ListItem>

              <ListItem
                leftArea={
                  <ListIcon icon="IconFloat" size="large" background="pink" />
                }
              >
                <ListSection top="Float" bottom="Price, percentage, etc." />
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

      <ShowcaseComponent background="transparent">
        <ShowFloatingList />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowPrimitives />
      </ShowcaseComponent>

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
