import { Column, Row, Page, Avatar } from '@aviato/ui'

import {
  ShowcaseHeader,
  ShowcaseComponent,
  SmallSpacer,
} from '../../components'

const AvatarPage = () => {
  const ShowAvatar = () => {
    return (
      <>
        <Column>
          <Row css={{ alignItems: 'center ' }}>
            <Avatar
              src="https://picsum.photos/24/24"
              label="Lorem Ipsum"
              size="extrasmall"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.photos/28/28"
              label="Lorem Ipsum"
              size="small"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.photos/32/32"
              label="Lorem Ipsum"
              size="medium"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.photos/36/36"
              label="Lorem Ipsum"
              size="large"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.photos/40/40"
              label="Lorem Ipsum"
              size="extralarge"
            />
          </Row>

          <SmallSpacer />

          <Row css={{ alignItems: 'center ' }}>
            <Avatar
              src="https://picsum.invalid.invalid"
              label="Lorem Ipsum"
              size="extrasmall"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.invalid.invalid"
              label="Lorem Ipsum"
              size="small"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.invalid.invalid"
              label="Lorem Ipsum"
              size="medium"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.invalid.invalid"
              label="Lorem Ipsum"
              size="large"
            />

            <SmallSpacer />

            <Avatar
              src="https://picsum.invalid.invalid"
              label="Lorem Ipsum"
              size="extralarge"
            />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Avatar"
        description={`
          Display user profile image, initials or fallback icon.
        `}
      />

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Avatar } from '@aviato/ui'

<Avatar
  src="https://picsum.photos/36/36"
  alt="Image text"
  size="large"
/>
      `}
      >
        <ShowAvatar />
      </ShowcaseComponent>
    </Page>
  )
}

export default AvatarPage
