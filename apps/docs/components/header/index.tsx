import { useRouter } from 'next/router'
import {
  Group,
  Header,
  styled,
  ToggleMenuButton,
  ToggleThemeButton,
} from '@aviato/ui'
import { AviatoLogo } from '../logo'

const LogoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '8px',
  cursor: 'pointer',
  color: '$Primary',
})

const Container = styled('span', {
  display: 'inline-flex',
  alignSelf: 'center',
  flexShrink: 0,

  variants: {
    type: {
      start: {
        marginRight: 10,
      },
      end: {
        marginLeft: 'auto',
        paddingLeft: 10,
      },
    },
  },
})

const MainHeader = () => {
  const router = useRouter()

  function setRoute(targetRoute: string) {
    router.push({
      pathname: targetRoute,
    })
  }

  return (
    <Header>
      <Container type="start">
        <LogoContainer onClick={() => setRoute('/')}>
          <AviatoLogo />
        </LogoContainer>
      </Container>

      <Container type="end">
        <Group>
          <ToggleMenuButton />
          <ToggleThemeButton />
        </Group>
      </Container>
    </Header>
  )
}

export { MainHeader as Header }
