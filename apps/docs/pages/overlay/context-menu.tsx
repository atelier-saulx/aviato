import {
  useContextMenu,
  ContextItem,
  Page,
  Button,
  IconMore,
  IconSchedule,
} from '@aviato/ui'
import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const SimpleMenu = () => {
  return (
    <>
      <ContextItem>Do something</ContextItem>
      <ContextItem inset>Do something else</ContextItem>
      <ContextItem
        onClick={() => {
          alert('close it')
        }}
        leftIcon={<IconSchedule color="$PrimaryMain" />}
        // right icon only show on hover
        // rightOnHover
        rightIcon={
          <IconMore
            onClick={() => {
              alert('snapje')
            }}
          />
        }
      >
        Flap
      </ContextItem>
    </>
  )
}

const LargeMenu = () => {
  const a = []
  for (let i = 0; i < 100; i++) {
    a.push(i)
  }
  console.info(a)
  return (
    <>
      {a.map((v, i) => {
        return (
          <ContextItem inset key={i}>
            {i} Do something
          </ContextItem>
        )
      })}
    </>
  )
}

const ContextMenuPage = () => {
  return (
    <Page>
      <ShowcaseHeader
        title="Context Menu"
        description={`
          This component can be used anywhere to prompt a menu near the area where
          you click a select or button component.
        `}
      />
      <ShowcaseComponent background="transparent">
        <div>
          <Button
            onClick={useContextMenu(SimpleMenu)}
            css={{
              marginBottom: 24,
            }}
          >
            Menu
          </Button>
          <Button onClick={useContextMenu(LargeMenu)}>
            Menu withe xtra overlay variation
          </Button>
        </div>
      </ShowcaseComponent>
    </Page>
  )
}

export default ContextMenuPage
