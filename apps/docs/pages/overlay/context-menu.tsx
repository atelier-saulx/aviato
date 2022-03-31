import {
  useContextMenu,
  ContextItem,
  Page,
  Button,
  IconMore,
  IconSchedule,
  ContextDivider,
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

const DoubleOverlayMenu = () => {
  return (
    <>
      <ContextItem>Keep it 💯</ContextItem>
      <ContextItem>yes</ContextItem>
      <ContextItem>yolo</ContextItem>
      <ContextDivider />
      <ContextItem>Keep it 💯</ContextItem>
      <ContextItem>yes</ContextItem>
      <ContextItem>yolo</ContextItem>
      <ContextDivider />
      <ContextItem>Keep it 💯</ContextItem>
      <ContextItem>yes</ContextItem>
      <ContextItem>yolo</ContextItem>
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
            onClick={useContextMenu(SimpleMenu, {}, { placement: 'center' })}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (position: center)
          </Button>

          <Button
            onClick={useContextMenu(SimpleMenu, {}, { placement: 'left' })}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (position: left)
          </Button>

          <Button
            onClick={useContextMenu(SimpleMenu, {}, { placement: 'right' })}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (position: right)
          </Button>

          <Button
            css={{
              marginBottom: 24,
            }}
            onClick={useContextMenu(LargeMenu)}
          >
            Menu (large menu)
          </Button>
          <Button
            onClick={useContextMenu(DoubleOverlayMenu, { props: { flap: 1 } })}
          >
            Menu (double overlays)
          </Button>
        </div>
      </ShowcaseComponent>
    </Page>
  )
}

export default ContextMenuPage
