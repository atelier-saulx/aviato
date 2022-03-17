import { useState } from 'react'
import { Page, RadioGroup, Radio, Column, Row } from '@aviato/ui'
import { log } from '@aviato/utils'

import { ShowcaseHeader, ShowcaseComponent, BigSpacer } from '../../components'

const ComponentProps = `
interface RadioGroupProps {
  value?: string
  defaultValue?: string
  label?: string
  description?: string
  error?: string
  direction?: 'horizontal' | 'vertical'
  onChange?: (value: string, payload: OnRadioGroupChange) => void
}
`

const RadioGroupPage = () => {
  const ShowRadiogroup = () => {
    const [value, setValue] = useState('Thing 2')

    return (
      <>
        <Column>
          <Row>
            <RadioGroup
              label="Uncontrolled example"
              description="Select anything"
              onChange={(value, payload) => {
                log.global.debug('RadioGroup change: ', { value, payload })
              }}
            >
              <Radio value="Test 1">Test 1</Radio>
              <Radio value="Test 2">Test 2</Radio>
              <Radio value="Test 3">Test 3</Radio>
              <Radio value="Test 4">Test 4</Radio>
            </RadioGroup>
          </Row>

          <BigSpacer />

          <Row>
            <RadioGroup
              label="Controlled example"
              description="Select Thing 1 to see an error"
              error={value === 'Thing 1' ? 'Error!' : null}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <Radio value="Thing 1">Thing 1</Radio>
              <Radio value="Thing 2">Thing 2</Radio>
              <Radio value="Thing 3">Thing 3</Radio>
              <Radio value="Thing 4">Thing 4</Radio>
            </RadioGroup>
          </Row>

          <BigSpacer />

          <Row>
            <RadioGroup
              label="Select a goober"
              description="Goobers are strange"
              direction="vertical"
            >
              <Radio value="Goober 1">Goober 1</Radio>
              <Radio value="Goober 2">Goober 2</Radio>
              <Radio value="Goober 3">Goober 3</Radio>
              <Radio value="Goober 4">Goober 4</Radio>
            </RadioGroup>
          </Row>

          <BigSpacer />
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Radio Group"
        description={`
          A control that allows the user to toggle selection within a small set of options.
        `}
        props={ComponentProps}
      />

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { RadioGroup } from '@aviato/ui'

<RadioGroup
  label="Controlled example"
  description="Select Thing 1 to see an error"
  error={value === 'Thing 1' ? 'Error!' : null}
  value={value}
  onChange={(value) => setValue(value)}
>
  <Radio value="Thing 1">Thing 1</Radio>
  <Radio value="Thing 2">Thing 2</Radio>
  <Radio value="Thing 3">Thing 3</Radio>
  <Radio value="Thing 4">Thing 4</Radio>
</RadioGroup>
        `}
      >
        <ShowRadiogroup />
      </ShowcaseComponent>
    </Page>
  )
}

export default RadioGroupPage
