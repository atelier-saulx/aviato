import { styled } from '@aviato/ui'
import { SideMenu, Menu, MenuItem, Text } from '@aviato/ui'

import { Page, ShowcaseComponent, AviatoLogo } from '../../../components'

const HeaderDiv = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '8px',
  paddingBottom: '69px',
  cursor: 'pointer',
})

const Footer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginTop: '200px',
  padding: '8px',
})

const SideMenuPage = () => {
  return (
    <Page>
      <ShowcaseComponent title="Menu">
        <SideMenu>
          <HeaderDiv>
            <AviatoLogo />
          </HeaderDiv>

          <Menu>
            <MenuItem title="Content model" />
            <MenuItem title="Publications" />
            <MenuItem title="Media" />

            <MenuItem title="Settings">
              <MenuItem title="Profile" />
              <MenuItem title="User management" />
            </MenuItem>

            <MenuItem title="Statistics" startOpen={false}>
              <MenuItem title="Overview" />
              <MenuItem title="Details" />
            </MenuItem>

            <MenuItem title="Test-suite" startOpen={false}>
              <MenuItem title="Perform test" />
              <MenuItem title="How to get started" />
            </MenuItem>
          </Menu>

          <Footer>
            <Text>User button goes here</Text>
          </Footer>
        </SideMenu>
      </ShowcaseComponent>
    </Page>
  )
}

export default SideMenuPage
