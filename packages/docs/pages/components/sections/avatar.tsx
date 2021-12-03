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
            <Avatar size="small" username="Morten Olsen-Broesby" />
            <Spacer />
            <Avatar size="medium" username="Maarten de Winter" />
            <Spacer />
            <Avatar size="large" username="Yves Beer" />
          </Row>
          <BigSpacer />
          <NextText weight="Bold">Image Avatars</NextText>
          <Row>
            <Avatar
              size="small"
              image="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            />
            <Spacer />
            <Avatar
              size="medium"
              image="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            />
            <Spacer />
            <Avatar
              size="large"
              image="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            />
          </Row>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default AvatarPage
