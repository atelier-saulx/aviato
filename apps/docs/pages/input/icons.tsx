import {
  Page,
  styled,
  icons,
  Column,
  Row,
  Tooltip,
  useHasLoaded,
} from '@aviato/ui'
import { chunk } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const GridItem = styled('div', {
  padding: 20,
  minWidth: 20,
  minHeight: 20,
})

const IconsPage = () => {
  const iconArray = Object.keys(icons)
  const iconGroups = chunk(iconArray, 6)

  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  return (
    <Page>
      <NextTitle>Icons</NextTitle>

      <NextText color="Secondary">
        Aviato provides multiple ways to use icons in your project
      </NextText>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
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

      `}
      >
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
                        <Icon width={16} height={16} />
                      </Tooltip>
                    </GridItem>
                  )
                })}
              </Row>
            )
          })}
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default IconsPage
