import { Column, Row, TextField, Page, styled, InputVariant } from '@aviato/ui'
import { log } from '@aviato/utils'
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
            <TextField
              variant={variant}
              placeholder="Type something here"
              onChange={(event) => {
                log.global.debug('TextField change: ', event)
              }}
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <TextField
              variant={variant}
              autosize
              minRows={3}
              maxRows={3}
              placeholder="Autosize with 3 rows"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <TextField
              variant={variant}
              autosize
              minRows={2}
              maxRows={6}
              placeholder="Autosize with 6 rows max, 2 min"
            />
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
              invalid
              placeholder="This is an error state"
            />
          </Row>
        </Column>
      </>
    )
  }

  const ShowComplexTextField = () => {
    return (
      <>
        <Column css={{ width: '100%' }}>
          <NextTitle weight="Bold" size="Medium">
            Form
          </NextTitle>

          <Row css={{ width: '100%' }}>
            <TextField
              placeholder="Type something here"
              label="This is a label"
              description="This is a description"
            />
          </Row>

          <BigSpacer />

          <Row css={{ width: '100%' }}>
            <TextField
              placeholder="Type something here"
              label="This is a label"
              description="This is a description"
              error="This is an error"
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

      <ShowcaseComponent background="transparent">
        <ShowComplexTextField />
      </ShowcaseComponent>
    </Page>
  )
}

export default TextFieldPage