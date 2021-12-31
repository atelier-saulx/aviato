import { Column, Row, TextField, Page, styled, InputVariant } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'
import { capitalize } from '../../utils'

const BigSpacer = styled('div', {
  width: '100%',
  height: 10,
})

const TextFieldPage = () => {
  const ShowTextField = ({ variant }: { variant: InputVariant }) => {
    const uppercaseVariant = capitalize(variant)

    return (
      <>
        <Column css={{ width: '100%' }}>
          <NextTitle weight="Bold" size="Medium">
            {uppercaseVariant}
          </NextTitle>

          <Row css={{ width: '100%' }}>
            <TextField variant={variant} placeholder="Type something here" />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <TextField
              variant={variant}
              autosize
              placeholder="Autosize without a row limit"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <TextField
              variant={variant}
              autosize
              minRows={2}
              maxRows={4}
              placeholder="Autosize with 4 rows max"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <TextField
              variant={variant}
              invalid
              placeholder="Type something here"
            />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Text Field
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        Capture string input from user
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowTextField variant="outlined" />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowTextField variant="filled" />
      </ShowcaseComponent>
    </Page>
  )
}

export default TextFieldPage
