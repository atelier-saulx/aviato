import { useCallback, useState } from 'react'
import {
  Page,
  RadioGroup,
  Radio,
  Column,
  Row,
  styled,
  OnRadioGroupChangePayload,
} from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'
import { log } from '@aviato/utils'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const RadioGroupPage = () => {
  const ShowRadiogroup = () => {
    const onRadioGroupChange = useCallback(
      (event: OnRadioGroupChangePayload) => {
        log.global.debug('RadioGroup change: ', event)
      },
      []
    )

    const [value, setValue] = useState('Thing 1')

    return (
      <>
        <Column>
          <Row>
            <RadioGroup
              onChange={onRadioGroupChange}
              label="Select your favorite developer"
              description="This is not anonymous, ofcourse."
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
              error={value === 'Thing 1' ? 'Do not select Thing 1' : null}
              value={value}
              onChange={({ value }) => setValue(value)}
            >
              <Radio value="Thing 1">Thing 1</Radio>
              <Radio value="Thing 2">Thing 2</Radio>
              <Radio value="Thing 3">Thing 3</Radio>
              <Radio value="Thing 4">Thing 4</Radio>
            </RadioGroup>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Radio Group
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        A control that allows the user to toggle selection within a small set of
        options.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowRadiogroup />
      </ShowcaseComponent>
    </Page>
  )
}

export default RadioGroupPage
