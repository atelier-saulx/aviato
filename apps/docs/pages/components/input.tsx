import {
  Column,
  Row,
  Input,
  Page,
  styled,
  getRandomIcon,
  InputVariant,
} from '@aviato/ui'
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

  const ShowInput = ({ variant }: { variant: InputVariant }) => {
    return (
      <>
        <Column css={{ width: '100%' }}>
          <Row css={{ width: '100%' }}>
            <Input variant={variant} placeholder="Type something here" />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <Input
              variant={variant}
              leftIcon={<RandomIcon />}
              placeholder="Type something here"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <Input
              variant={variant}
              rightIcon={<RandomIcon />}
              placeholder="Type something here"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <Input
              variant={variant}
              leftIcon={<RandomIcon />}
              rightIcon={<RandomIcon />}
              placeholder="Type something here"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <Input
              variant={variant}
              placeholder="Type something here"
              invalid
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <Input
              variant={variant}
              leftIcon={<RandomIcon />}
              rightIcon={<RandomIcon />}
              placeholder="Type something here"
              disabled
            />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Input
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        Capture string input from user
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowInput variant="outlined" />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowInput variant="filled" />
      </ShowcaseComponent>
    </Page>
  )
}

export default InputPage
