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
  Badge,
  Group,
} from '@aviato/ui'

import {
  ShowcaseHeader,
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
                Small
              </ListItem>

              <ListItem
                leftArea={<ListIcon icon="IconModel" size="medium" />}
                rightArea={<IconMore />}
              >
                Medium
              </ListItem>

              <ListItem
                leftArea={<ListIcon icon="IconModel" size="large" />}
                rightArea={<IconMore />}
              >
                Large
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
                <ListSection
                  top="Title"
                  bottom={
                    <>
                      <Group space="xxs">
                        <Badge type="action" variant="light" size="small">
                          String
                        </Badge>
                        <Badge type="action" variant="light" size="small">
                          Required
                        </Badge>
                        <Badge type="action" variant="light" size="small">
                          Title
                        </Badge>
                      </Group>
                    </>
                  }
                />
              </ListItem>

              <ListItem
                leftArea={
                  <ListIcon
                    icon="IconEdit"
                    size="large"
                    background="sailorBlue"
                  />
                }
                rightArea={<IconMore />}
              >
                <ListSection
                  top="Content"
                  bottom={
                    <>
                      <Group space="xxs">
                        <Badge type="action" variant="light" size="small">
                          Rich text
                        </Badge>
                        <Badge type="action" variant="light" size="small">
                          Required
                        </Badge>
                      </Group>
                    </>
                  }
                />
              </ListItem>
            </List>
          </Row>
        </Column>
      </>
    )
  }

  const ShowPrimitives = () => {
    const leftSide = (
      <Row css={{ minWidth: 250 }}>
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
              <ListIcon icon="IconMarkdown" size="large" background="purple" />
            }
          >
            <ListSection top="Markdown" bottom="Markdown editor" />
          </ListItem>

          <ListItem
            leftArea={
              <ListIcon icon="IconEdit" size="large" background="purple" />
            }
          >
            <ListSection top="Rich text" bottom="Editor with formatting" />
          </ListItem>

          <ListItem
            leftArea={
              <ListIcon
                icon="IconAttachment"
                size="large"
                background="orange"
              />
            }
          >
            <ListSection top="Asset" bottom="Supports any file type" />
          </ListItem>

          <ListItem
            leftArea={
              <ListIcon icon="IconJson" size="large" background="red" />
            }
          >
            <ListSection top="JSON Editor" bottom="JSON structures" />
          </ListItem>
        </List>
      </Row>
    )

    const rightSide = (
      <Row css={{ minWidth: 250 }}>
        <List type="floating">
          <ListItem
            leftArea={
              <ListIcon icon="IconInteger" size="large" background="yellow" />
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

          <ListItem
            leftArea={
              <ListIcon icon="IconBoolean" size="large" background="blue" />
            }
          >
            <ListSection top="Boolean" bottom="True or false" />
          </ListItem>

          <ListItem
            leftArea={
              <ListIcon icon="IconReference" size="large" background="teal" />
            }
          >
            <ListSection top="Reference" bottom="Data relations" />
          </ListItem>
        </List>
      </Row>
    )

    return (
      <>
        <Group align="start">
          {leftSide}
          {rightSide}
        </Group>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="List"
        description={`
          Lists are continuous, vertical indexes of text or images.
        `}
      />

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
