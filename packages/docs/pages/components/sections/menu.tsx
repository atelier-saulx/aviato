import { log } from '@aviato/utils'
import { styled } from '@aviato/ui'
import { Title, Menu, MenuItem } from '@aviato/ui'

import DisplayComponent from '../displayComponent'

const StyledDiv = styled('div', {
  width: '250px',
  padding: '10px',
  background: '#F7F7F8',
  borderRadius: '4px',
})

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
        <Title weight="Bold">Menu</Title>
      </div>

      <DisplayComponent name="Menu">
        <StyledDiv>
          <Menu>
            <MenuItem
              title="Item Header"
              onClick={() => log.global.info('Accordion')}
              isHeader={true}
            >
              <MenuItem
                title="Item Inner"
                onClick={() => log.global.info('Item Inner')}
              />
              <MenuItem
                title="Item Inner"
                onClick={() => log.global.info('Item Inner')}
              />
            </MenuItem>
            <MenuItem title="Item Accordion">
              <MenuItem
                title="Item Inner"
                onClick={() => log.global.info('Item Inner')}
              />
            </MenuItem>
          </Menu>
        </StyledDiv>
      </DisplayComponent>

      <DisplayComponent name="Header, Not collapsible.">
        <StyledDiv>
          <Menu>
            <MenuItem
              title="Item Header"
              onClick={() => log.global.info('Accordion')}
              isHeader={true}
            >
              <MenuItem
                title="Content 1"
                onClick={() => log.global.info('Content 1')}
              />
              <MenuItem
                title="Content 2"
                onClick={() => log.global.info('Content 2')}
              />
            </MenuItem>
          </Menu>
        </StyledDiv>
      </DisplayComponent>
    </div>
  )
}

export default MenuPage
