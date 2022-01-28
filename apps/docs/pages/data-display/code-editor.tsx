import { Page, Column, CodeEditor } from '@aviato/ui'
import { log } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const CodeToDisplay = `
import { CodeEditor } from '@aviato/ui'

<CodeEditor language="tsx">
  // Import component
  import { Button } from '@aviato/ui'

  <Button>Lorem</Button>
</CodeEditor>
`

const CodeEditorPage = () => {
  return (
    <Page>
      <NextTitle>Code Editor</NextTitle>

      <NextText color="Secondary">Edit code in an inline editor.</NextText>

      <ShowcaseComponent codeBlock={CodeToDisplay}>
        <Column css={{ width: '100%' }}>
          <CodeEditor
            language="tsx"
            onChange={(value) => {
              log.global.debug('Editor change: ', { value })
            }}
          >
            {CodeToDisplay}
          </CodeEditor>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default CodeEditorPage
