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
  alignItems: 'center',
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
            <Avatar size="small" username="Morten Olsen-Broesby" />
            <Spacer />
            <Avatar size="medium" username="Maarten de Winter" />
            <Spacer />
            <Avatar size="large" username="Yves Beer" />
          </Row>
        </Column>
      </ShowcaseComponent>

      <ShowcaseComponent title="Avatar with CSS">
        <Avatar
          username="Test"
          css={{
            width: '200px;',
            height: '200px',
            borderRadius: '200px',
          }}
        />
      </ShowcaseComponent>
    </Page>
  )
}

export default AvatarPage
