import { Page, Button, useSelect } from '@aviato/ui'
import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const ContextMenuPage = () => {
  const [value, open] = useSelect(
    [{ label: <div>Hello (X)</div>, value: 'x' }, 'y', 'z'],
    'x',
    {
      position: 'left',
    }
  )

  return (
    <Page>
      <ShowcaseHeader
        title="Dropdown"
        description={`
          A dropdown for you!
        `}
      />
      <ShowcaseComponent background="transparent">
        <div>
          <Button css={{ marginBottom: 24 }} onClick={open}>
            Select ({value})
          </Button>
        </div>
      </ShowcaseComponent>
    </Page>
  )
}

export default ContextMenuPage
