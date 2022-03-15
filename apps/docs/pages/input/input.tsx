import { useEffect, useMemo, useState } from 'react'
import {
  Column,
  Row,
  Input,
  Page,
  getRandomIcon,
  InputVariant,
  useHasLoaded,
  Title,
} from '@aviato/ui'
import { log, capitalize } from '@aviato/utils'

import {
  NextTitle,
  ShowcaseHeader,
  ShowcaseComponent,
  BigSpacer,
} from '../../components'

const ComponentProps = `
interface InputProps extends BaseInputProps {
  label?: string
  description?: string
  error?: string
  invalid?: boolean
}

interface BaseInputProps {
  value?: string
  defaultValue?: string
  component?: ElementType
  type?: InputType
  placeholder?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  variant?: InputVariant
  disabled?: boolean
  invalid?: boolean
  multiline?: boolean
  maxRows?: number
  minRows?: number
  onChange?: (value: string, payload: OnInputChange) => void
  autoFocus?: boolean
}
`

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
          <Title size="small" css={{ paddingBottom: 12 }}>
            {uppercaseVariant}
          </Title>

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
      <ShowcaseHeader
        title="Input"
        description={`
          Capture string input from user
        `}
        props={ComponentProps}
      />

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
