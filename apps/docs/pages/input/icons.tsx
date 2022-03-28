import {
  Page,
  styled,
  icons,
  useHasLoaded,
  CodeSnippet,
  Text,
  Row,
  Column,
  Tooltip,
  IconFile,
} from '@aviato/ui'
import { chunk } from '@aviato/utils'

import { ShowcaseHeader } from '../../components'

const GridItem = styled('div', {
  padding: 20,
  minWidth: 20,
  minHeight: 20,
})

const Item = styled('div', {
  display: 'flex',
  alignItems: 'center',
  paddingBottom: 20,
  color: '$TextPrimary',
})

const CustomSpacer = styled('div', {
  marginLeft: 20,
})

const CodeToDisplay = `
import { IconPlus, icons } from '@aviato/ui'

const TestComponent = () => {
  return <IconPlus />
}

Object.keys(icons).forEach((iconName) => {
  console.log('Icon name: ', iconName)
})

const OtherTestComponent = () => {
  const { IconPlus } = icons

  return <IconPlus />
}
`

const IconsPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  const mappedIconNames = Object.keys(icons).map((keyName, index) => {
    const TargetIcon = icons[keyName]

    return (
      <Item key={`Icons${index}`}>
        <TargetIcon />
        <CustomSpacer />
        <Text>{keyName}</Text>
      </Item>
    )
  })

  const IconView = () => {
    const iconArray = Object.keys(icons)
    const iconGroups = chunk(iconArray, 6)

    return (
      <Column
        css={{
          flexWrap: 'wrap',
        }}
      >
        {iconGroups.map((iconGroup, groupIndex) => {
          return (
            <Row
              key={groupIndex}
              css={{
                flexWrap: 'wrap',
              }}
            >
              {iconGroup.map((key, index) => {
                const Icon = icons[key]

                return (
                  <GridItem key={`GridItem-${index}`}>
                    <Tooltip label={key}>
                      <Icon
                        // color
                        onClick={() => {
                          global.alert('snurpi!')
                        }}
                      />
                    </Tooltip>
                  </GridItem>
                )
              })}
            </Row>
          )
        })}
      </Column>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Icons"
        description={`
          Aviato provides multiple ways to use icons in your project.
        `}
      />

      <IconView />

      {/* <IconFile color="" /> */}

      <CodeSnippet language="tsx">{CodeToDisplay}</CodeSnippet>

      <GridItem>
        <>{mappedIconNames}</>
      </GridItem>
    </Page>
  )
}

export default IconsPage
