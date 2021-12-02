import { styled } from '@aviato/ui'
import { UserButton } from '@aviato/ui'
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

const UserButtonPage = () => {
  return (
    <Page>
      <ShowcaseComponent title="User-Button">
        <Wrapper>
          <NextText weight="Bold">User Button</NextText>
          <Row>
            <UserButton userName="Maarten de Winter"></UserButton>
            <Spacer />
          </Row>
        </Wrapper>
      </ShowcaseComponent>
    </Page>
  )
}

export default UserButtonPage
