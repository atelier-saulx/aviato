import { styled } from '~/theme'

export const StyledSelect = styled('div', {
  justifyContent: 'space-between',
  borderRadius: 4,
  alignItems: 'center',
  border: '1px solid $OtherDivider',
  backgroundColor: '$Background1dp',
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 7,
  paddingBottom: 7,
  cursor: 'pointer',
  userSelect: 'none',
  height: 38,
  display: 'flex',
  width: '100%',
  '&:hover': {
    border: '1px solid $OtherInputBorderHover',
  },
})
