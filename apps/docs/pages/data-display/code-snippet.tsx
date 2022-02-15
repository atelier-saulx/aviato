import { Page, Column, CodeSnippet } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const CodeToDisplay = `
import { CodeSnippet } from '@aviato/ui'

<CodeSnippet language="tsx">
  // Import component
  import { Button } from '@aviato/ui'

  <Button>Lorem</Button>
</CodeSnippet>
`

const CodeSnippetPage = () => {
  return (
    <Page>
      <NextTitle>Code Snippet</NextTitle>

      <NextText color="Secondary">
        Show, copy and paste in a inline editor.
      </NextText>

      <ShowcaseComponent codeBlock={CodeToDisplay}>
        <Column css={{ width: '100%' }}>
          <CodeSnippet language="tsx">{CodeToDisplay}</CodeSnippet>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default CodeSnippetPage
