import { Page, styled, icons, Tooltip } from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const GridItem = styled('div', {
  padding: 10,
})

const Grid = styled('div', {
  margin: -10,
  display: 'flex',
  flexWrap: 'wrap',
})

const IconsPage = () => {
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
        <Grid>
          {Object.keys(icons).map((name) => {
            const Icon = icons[name]
            return (
              <Tooltip key={name} content={name}>
                <GridItem>
                  <Icon />
                </GridItem>
              </Tooltip>
            )
          })}
        </Grid>
      </ShowcaseComponent>
    </Page>
  )
}

export default IconsPage
