import { Page, Column, Editor } from '@aviato/ui'
import { log } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const CodeToDisplay = `
import { Editor } from '@aviato/ui'

<Editor language="tsx">
  // Import component
  import { Button } from '@aviato/ui'

  <Button>Lorem</Button>
</Editor>
`

const CodeEditorPage = () => {
  return (
    <Page>
      <NextTitle>Code Editor</NextTitle>

      <NextText color="Secondary">Edit code in an inline editor.</NextText>

      <ShowcaseComponent codeBlock={CodeToDisplay}>
        <Column css={{ width: '100%' }}>
          <Editor
            language="tsx"
            onChange={(value) => {
              log.global.debug('Editor change: ', { value })
            }}
          >
            {CodeToDisplay}
          </Editor>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default CodeEditorPage
