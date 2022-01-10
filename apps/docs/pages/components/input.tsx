import {
  Column,
  Row,
  Input,
  Page,
  styled,
  getRandomIcon,
  InputVariant,
} from '@aviato/ui'
import { useEffect, useState } from 'react'
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

    const [inputValue, setInputValue] = useState('')
    const [isInvalid, setIsInvalid] = useState(false)

    useEffect(() => {
      setIsInvalid(inputValue === 'test')
    }, [inputValue])

    return (
      <>
        <Column css={{ width: '100%' }}>
          <NextTitle size="small">{uppercaseVariant}</NextTitle>

          <Row css={{ width: '100%' }}>
            <Input
              variant={variant}
              placeholder="Type something here"
              onChange={(value, payload) => {
                log.global.debug('Input change: ', { value, payload })
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
              placeholder="Type `test` to see invalid input field"
              value={inputValue}
              invalid={isInvalid}
              onChange={(value, payload) => {
                log.global.debug('Input change: ', { value, payload })
                setInputValue(value)
              }}
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
          <NextTitle size="small">Form</NextTitle>

          <Row css={{ width: '100%' }}>
            <Input
              placeholder="Type something here"
              label="This is a label"
              description="This is a description"
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

      <ShowcaseComponent background="transparent" padding="small">
        <ShowInput variant="outlined" />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent" padding="small">
        <ShowInput variant="filled" />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent" padding="small">
        <ShowComplexInput />
      </ShowcaseComponent>
    </Page>
  )
}

export default InputPage
