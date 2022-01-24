import { Column, Row, Page, Avatar, styled } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const SmallSpacer = styled('div', {
  width: 10,
  height: 10,
})

const AvatarPage = () => {
  const ShowAvatar = () => {
    return (
      <>
        <Column>
          <Row css={{ alignItems: 'center ' }}>
            <Avatar
              src="https://picsum.photos/200/300"
              alt="Lorem Ipsum"
              size="extrasmall"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.photos/200/300"
              alt="Lorem Ipsum"
              size="small"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.photos/200/300"
              alt="Lorem Ipsum"
              size="medium"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.photos/200/300"
              alt="Lorem Ipsum"
              size="large"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.photos/200/300"
              alt="Lorem Ipsum"
              size="extralarge"
            />
          </Row>

          <SmallSpacer />

          <Row css={{ alignItems: 'center ' }}>
            <Avatar
              src="https://picsum.invalid.invalid"
              alt="Lorem Ipsum"
              size="extrasmall"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.invalid.invalid"
              alt="Lorem Ipsum"
              size="small"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.invalid.invalid"
              alt="Lorem Ipsum"
              size="medium"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.invalid.invalid"
              alt="Lorem Ipsum"
              size="large"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.invalid.invalid"
              alt="Lorem Ipsum"
              size="extralarge"
            />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Avatar</NextTitle>

      <NextText color="Secondary">
        Display user profile image, initials or fallback icon.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowAvatar />
      </ShowcaseComponent>
    </Page>
  )
}

export default AvatarPage
