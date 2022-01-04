import { useState } from 'react'
import { Page, RadioGroup, Radio, Column, Row, styled } from '@aviato/ui'
import { log } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const RadioGroupPage = () => {
  const ShowRadiogroup = () => {
    const [value, setValue] = useState('Thing 2')

    return (
      <>
        <Column>
          <Row>
            <RadioGroup
              label="Select your favorite developer"
              description="This is not anonymous, of course"
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
              description="Do not select Thing 1"
              error={value === 'Thing 1' ? 'Elderberries!' : null}
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
      <NextTitle>Radio Group</NextTitle>

      <NextText color="Secondary">
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
