import { DisplayComponent } from '../displayComponent'

import { Title, Icon } from '@aviato/ui'

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
        <Title fontWeight="bold">Icons</Title>
      </div>

      <DisplayComponent name="Icons">
        <Icon />
      </DisplayComponent>
    </div>
  )
}

export default MenuPage
