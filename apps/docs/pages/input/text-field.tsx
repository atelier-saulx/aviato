import { useEffect, useState } from 'react'
import { Column, Row, TextField, Page, InputVariant, Title } from '@aviato/ui'
import { log, capitalize } from '@aviato/utils'

import { ShowcaseHeader, ShowcaseComponent, BigSpacer } from '../../components'

const ComponentProps = `
interface TextFieldProps extends BaseInputProps {
  autosize?: boolean
  maxRows?: number
  minRows?: number
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

const TextFieldPage = () => {
  const ShowTextField = ({ variant }: { variant: InputVariant }) => {
    const uppercaseVariant = capitalize(variant)

    const [inputValue, setInputValue] = useState('')
    const [isInvalid, setIsInvalid] = useState(false)

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
            <TextField
              variant={variant}
              placeholder="Type something here"
              onChange={(value, payload) => {
                log.global.debug('TextField change: ', { value, payload })
              }}
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <TextField
              variant={variant}
              autosize
              minRows={3}
              maxRows={3}
              placeholder="Autosize with 3 rows"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <TextField
              variant={variant}
              autosize
              minRows={2}
              maxRows={6}
              placeholder="Autosize with 6 rows max, 2 min"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <TextField
              variant={variant}
              autosize
              placeholder="Autosize without a row limit"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <TextField
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
            <TextField variant={variant} placeholder="Disabled" disabled />
          </Row>
        </Column>
      </>
    )
  }

  const ShowComplexTextField = () => {
    return (
      <>
        <Column css={{ width: '100%' }}>
          <Title size="small" css={{ paddingBottom: 12 }}>
            Form
          </Title>

          <Row css={{ width: '100%' }}>
            <TextField
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
        title="Text Field"
        description={`
          Capture string input from user
        `}
        props={ComponentProps}
      />

      <ShowcaseComponent
        background="transparent"
        padding="small"
        codeBlock={`
<TextField
  variant={variant}
  value={inputValue}
  invalid={isInvalid}
  onChange={(value, payload) => {
    console.log('TextField change: ', { value, payload })
  }}
/>
        `}
      >
        <ShowTextField variant="outline" />
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        padding="small"
        codeBlock={`
<TextField
  variant={variant}
  placeholder="Type something here"
/>
      `}
      >
        <ShowTextField variant="filled" />
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        padding="small"
        codeBlock={`
<TextField
  placeholder="Type something here"
  label="This is a label"
  description="This is a description"
/>
      `}
      >
        <ShowComplexTextField />
      </ShowcaseComponent>
    </Page>
  )
}

export default TextFieldPage
