import { styled } from '@aviato/ui'
import { Checkbox, CheckboxSize } from '@aviato/ui'
import { NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
})

const Row = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
})

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const ShowCaseCheckboxes = ({ size }: { size: CheckboxSize }) => {
  return (
    <>
      <Checkbox size={size} />
      <Checkbox size={size} indeterminate={true} />
      <Checkbox size={size} checked={true} />
      <Checkbox size={size} indeterminate={true} checked={true} />
      <Checkbox size={size} disabled={true} indeterminate={true} />
      <Checkbox size={size} disabled={true} checked={true} />
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
        <Wrapper>
          <NextText weight="Bold">Medium</NextText>
          <Row>
            <ShowCaseCheckboxes size="medium" />
          </Row>

          <BigSpacer />

          <NextText weight="Bold">Small</NextText>
          <Row>
            <ShowCaseCheckboxes size="small" />
          </Row>
        </Wrapper>
      </ShowcaseComponent>
    </Page>
  )
}

export default CheckboxPage
