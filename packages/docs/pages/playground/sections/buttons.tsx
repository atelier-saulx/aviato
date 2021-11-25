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

      <DisplayComponent name="Button">
        <Button>Button</Button>
      </DisplayComponent>
    </div>
  )
}

export default MenuPage
