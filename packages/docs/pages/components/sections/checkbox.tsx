import { Checkbox, OnCheckboxChangePayload, styled } from '@aviato/ui'
import { IconButton, Column, Row, getRandomIconName } from '@aviato/ui'
import { useCallback, useState } from 'react'
import { NextTitle, NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const Spacer = styled('div', {
  width: 6,
  height: 6,
})

const capitalize = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

const CheckboxPage = () => {
  const ShowCheckboxes = () => {
    return <>Test</>
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Checkbox
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        A control that allows the user to toggle between checked and not
        checked.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowCheckboxes />
      </ShowcaseComponent>
    </Page>
  )
}

export default CheckboxPage
