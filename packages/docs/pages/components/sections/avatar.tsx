import { Avatar, styled } from '@aviato/ui'

import { NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
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

const AvatarPage = () => {
  return (
    <Page>
      <ShowcaseComponent title="Avatars">
        <Column>
          <NextText weight="Bold">Avatar</NextText>
          <Row>
            <Avatar size="small" username="Morton Olsen-Broesby" />
            <Avatar size="medium" username="Maarten de Winter" />
            <Avatar size="large" username="Yves Beer" />
            <Spacer />
          </Row>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default AvatarPage
