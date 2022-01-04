import {
  Column,
  Row,
  Input,
  Page,
  styled,
  getRandomIcon,
  InputVariant,
} from '@aviato/ui'
import { log } from '@aviato/utils'
import { useHasLoaded } from '@aviato/hooks'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'
import { capitalize } from '../../utils'

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
    const uppercaseVariant = capitalize(variant)

    return (
      <>
        <Column css={{ width: '100%' }}>
          <NextTitle size="small">{uppercaseVariant}</NextTitle>

          <Row css={{ width: '100%' }}>
            <Input
              variant={variant}
              placeholder="Type something here"
              onChange={(event) => {
                log.global.debug('Input change: ', event)
              }}
            />
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

  const ShowComplexInput = () => {
    return (
      <>
        <Column css={{ width: '100%' }}>
          <NextTitle>Form</NextTitle>

          <Row css={{ width: '100%' }}>
            <Input
              placeholder="Type something here"
              label="This is a label"
              description="This is a description"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <Input
              placeholder="Type something here"
              label="This is a label"
              description="This is a description"
              error="This is an error"
            />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Input</NextTitle>

      <NextText color="Secondary">Capture string input from user</NextText>

      <ShowcaseComponent background="transparent">
        <ShowInput variant="outlined" />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowInput variant="filled" />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowComplexInput />
      </ShowcaseComponent>
    </Page>
  )
}

export default InputPage
