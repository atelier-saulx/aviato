import { loginHandler } from '@storyofams/next-password-protect'

export default loginHandler(process.env.PASSWORD ?? '', {
  cookieName: 'authorization',
})
