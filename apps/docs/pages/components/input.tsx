import { Column, Row, Input, Page, styled, getRandomIcon } from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 10,
})

/**
 * TODO: Fix SSR issue with Vector Icons!
 */
const InputPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  const RandomIcon = () => {
    const Icon = getRandomIcon()
    return <Icon />
  }

  const ShowInput = () => {
    return (
      <>
        <Column>
          <Row>
            <Input placeholder="Type something here" />
          </Row>

          <BigSpacer />

          <Row>
            <Input
              leftIcon={<RandomIcon />}
              placeholder="Type something here"
            />
          </Row>

          <BigSpacer />

          <Row>
            <Input
              rightIcon={<RandomIcon />}
              placeholder="Type something here"
            />
          </Row>

          <BigSpacer />

          <Row>
            <Input
              leftIcon={<RandomIcon />}
              rightIcon={<RandomIcon />}
              placeholder="Type something here"
            />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Text Field
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        Capture string input from user
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowInput />
      </ShowcaseComponent>
    </Page>
  )
}

export default InputPage
