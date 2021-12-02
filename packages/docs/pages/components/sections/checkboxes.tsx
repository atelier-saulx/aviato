import { styled } from '@aviato/ui'
import { Checkbox, CheckboxSize, Row, Column } from '@aviato/ui'
import { NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const Spacer = styled('div', {
  width: 6,
  height: 6,
})

const ShowCaseCheckboxes = ({ size }: { size: CheckboxSize }) => {
  return (
    <>
      <Checkbox size={size} />
      <Spacer />
      <Checkbox size={size} indeterminate={true} />
      <Spacer />
      <Checkbox size={size} checked={true} />
      <Spacer />
      <Checkbox size={size} indeterminate={true} checked={true} />
      <Spacer />
      <Checkbox size={size} disabled={true} indeterminate={true} />
      <Spacer />
      <Checkbox size={size} disabled={true} checked={true} />
      <Spacer />
      <Checkbox
        size={size}
        disabled={true}
        indeterminate={true}
        checked={true}
      />
    </>
  )
}

const CheckboxPage = () => {
  return (
    <Page>
      <ShowcaseComponent title="Checkboxes">
        <Column>
          <NextText weight="Bold">Medium</NextText>
          <Row>
            <ShowCaseCheckboxes size="medium" />
          </Row>

          <BigSpacer />

          <NextText weight="Bold">Small</NextText>
          <Row>
            <ShowCaseCheckboxes size="small" />
          </Row>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default CheckboxPage
