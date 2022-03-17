import { Page, Column, CodeSnippet } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

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
      <ShowcaseHeader
        title="Code Snippet"
        description={`
          Show, copy and paste in a inline editor.
        `}
      />

      <ShowcaseComponent codeBlock={CodeToDisplay}>
        <Column css={{ width: '100%' }}>
          <CodeSnippet language="tsx">{CodeToDisplay}</CodeSnippet>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default CodeSnippetPage
