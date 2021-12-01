import { styled } from '@aviato/ui'
import { Checkbox } from '@aviato/ui'
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

const Spacer = styled('div', {
  width: 6,
  height: 6,
})

const CheckboxPage = () => {
  return (
    <Page>
      <ShowcaseComponent title="Checkbox">
        <Wrapper>
          <NextText weight="Bold">Medium</NextText>
          <Row>
            <Checkbox />
            <Checkbox checked={true} />
            <Checkbox indeterminate={true} />
            <Checkbox indeterminate={true} checked={true} />
            <Checkbox disabled={true} indeterminate={true} />
          </Row>

          <BigSpacer />

          <NextText weight="Bold">Small</NextText>
          <Row>
            <Checkbox size="small" />
            <Checkbox size="small" checked={true} />
            <Checkbox size="small" indeterminate={true} />
            <Checkbox size="small" indeterminate={true} checked={true} />
            <Checkbox size="small" disabled={true} indeterminate={true} />
          </Row>
        </Wrapper>
      </ShowcaseComponent>
    </Page>
  )
}

export default CheckboxPage
