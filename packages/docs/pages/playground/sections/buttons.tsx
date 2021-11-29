import { DisplayComponent } from '../displayComponent'

import { Title, Button } from '@aviato/ui'

const MenuPage = () => {
  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <div
        style={{
          paddingLeft: 20,
        }}
      >
        <Title fontWeight="bold">Buttons</Title>
      </div>

      <DisplayComponent name="Buttons">
        <Button variant="filled">Button</Button>
        <Button variant="outlined">Button</Button>
        <Button variant="transparent">Button</Button>
      </DisplayComponent>

      <DisplayComponent name="Disabled Buttons">
        <Button disabled={true}>Button</Button>
        <Button variant="outlined" disabled={true}>
          Button
        </Button>
        <Button variant="transparent" disabled={true}>
          Button
        </Button>
      </DisplayComponent>
    </div>
  )
}

export default MenuPage
