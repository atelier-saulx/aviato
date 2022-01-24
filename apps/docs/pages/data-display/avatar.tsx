import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const AvatarPage = () => {
  const ShowAvatar = () => {
    return (
      <>
        <Column>
          <Row>Avatar</Row>
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
