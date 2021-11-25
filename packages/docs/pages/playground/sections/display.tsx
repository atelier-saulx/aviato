import { DisplayComponent } from '../displayComponent'

import { Title, Avatar } from '@aviato/ui'

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
        <Title fontWeight="bold">Display</Title>
      </div>

      <DisplayComponent name="Avatar">
        <Avatar>Bob</Avatar>
      </DisplayComponent>

      <DisplayComponent name="Avatar with image">
        <Avatar imageUrl="https://images.unsplash.com/photo-1637599973708-6d41b75ec348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" />
      </DisplayComponent>
    </div>
  )
}

export default MenuPage
