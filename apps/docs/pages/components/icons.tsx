import { Page, styled, icons, Column, Row, Tooltip } from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'
import { chunk } from '@aviato/utils'

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

      <ShowcaseComponent background="transparent">
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
                        <Icon />
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
