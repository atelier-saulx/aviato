import { useEffect, useMemo, useState } from 'react'
import {
  Column,
  Row,
  Input,
  Page,
  getRandomIcon,
  InputVariant,
  useHasLoaded,
} from '@aviato/ui'
import { log, capitalize } from '@aviato/utils'

import {
  NextTitle,
  NextText,
  ShowcaseComponent,
  BigSpacer,
} from '../../components'

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
    const Icon = useMemo(() => <RandomIcon />, [])

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
              leftIcon={Icon}
              placeholder="Type something here"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <Input
              variant={variant}
              rightIcon={Icon}
              placeholder="Type something here"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <Input
              variant={variant}
              leftIcon={Icon}
              rightIcon={Icon}
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
              leftIcon={Icon}
              rightIcon={Icon}
              placeholder="Disabled"
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

      <ShowcaseComponent
        background="transparent"
        padding="small"
        codeBlock={`
<Input
  variant={variant}
  value={inputValue}
  invalid={isInvalid}
  onChange={(value, payload) => {
    console.log('Input change: ', { value, payload })
  }}
/>
        `}
      >
        <ShowInput variant="outline" />
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        padding="small"
        codeBlock={`
<Input
  variant={variant}
  leftIcon={Icon}
  rightIcon={Icon}
  placeholder="Type something here"
/>
      `}
      >
        <ShowInput variant="filled" />
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        padding="small"
        codeBlock={`
<Input
  placeholder="Type something here"
  label="This is a label"
  description="This is a description"
/>
      `}
      >
        <ShowComplexInput />
      </ShowcaseComponent>
    </Page>
  )
}

export default InputPage
