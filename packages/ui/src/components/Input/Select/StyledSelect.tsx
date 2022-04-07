import { styled } from '~/theme'

export const StyledSelect = styled('div', {
  justifyContent: 'space-between',
  borderRadius: 4,
  alignItems: 'center',
  border: '1px solid $OtherDivider',
  backgroundColor: '$Background1dp',
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 6,
  paddingBottom: 6,
  cursor: 'pointer',
  userSelect: 'none',
  display: 'flex',
  width: '100%',
  '&:hover': {
    backgroundColor: '$ActionLightHover',
  },
})
