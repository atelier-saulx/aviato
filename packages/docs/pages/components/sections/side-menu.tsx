import { styled } from '@aviato/ui'
import { SideMenu, Menu, MenuItem, ProfileMenuItem } from '@aviato/ui'

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

const SmallSpacer = styled('div', {
  width: '100%',
  height: 10,
})

const Spacer = styled('div', {
  width: '100%',
  height: 20,
})

const SideMenuPage = () => {
  return (
    <Page>
      <ShowcaseComponent
        title="Sidebar Menu"
        description="A navigational list of primary sections combined into a single interactive area."
      >
        <SideMenu>
          <HeaderDiv>
            <AviatoLogo />
          </HeaderDiv>

          <Menu>
            <MenuItem title="Content model" icon="box" />
            <MenuItem title="Publications" icon="paper" />
            <MenuItem title="Media" icon="circle" />

            <Spacer />

            <MenuItem title="Settings">
              <MenuItem title="Profile" />
              <MenuItem title="User management" />
            </MenuItem>

            <SmallSpacer />

            <MenuItem title="Statistics" startOpen={false}>
              <MenuItem title="Overview" />
              <MenuItem title="Details" />
            </MenuItem>

            <SmallSpacer />

            <MenuItem title="Test-suite" startOpen={false}>
              <MenuItem title="Perform test" />
              <MenuItem title="How to get started" />
            </MenuItem>
          </Menu>

          <Footer>
            <ProfileMenuItem username="Maarten de Winter" />
          </Footer>
        </SideMenu>
      </ShowcaseComponent>
    </Page>
  )
}

export default SideMenuPage
