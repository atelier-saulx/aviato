import { useState } from 'react'
import { Page, RadioGroup, Radio, Column, Row, styled } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const RadioGroupPage = () => {
  const ShowRadiogroup = () => {
    const [value, setValue] = useState('Test 1')

    return (
      <>
        <Column>
          <Row>
            <RadioGroup value={value} onChange={setValue}>
              <Radio value="Test 1">Test 1</Radio>
              <Radio value="Test 2">Test 2</Radio>
              <Radio value="Test 3">Test 3</Radio>
              <Radio value="Test 4">Test 4</Radio>
            </RadioGroup>
          </Row>

          <BigSpacer />

          <Row>Currently active: {value}</Row>
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
