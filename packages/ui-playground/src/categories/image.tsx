import React from 'react'
import { Avatar } from '@based/ui'
import RenderComponents from '../RenderComponents'

export default {
  name: 'image',
  Render: ({ category }) => <RenderComponents grid category={category} />,
  components: [
    {
      name: 'Avatar',
      category: 'image',
      Component: Avatar,
      props: [
        {
          name: 'Tony Kovanen',
          label: 'avatar',
        },
        {
          name: 'Tony Kovanen',
          label: 'avatar',
          size: 64,
        },
        {
          name: 'Maarten de Winter',
          label: 'avatar',
        },
        {
          name: 'Joany Beer',
          src: 'https://whitleyaward-cdn.standfirst.com/content/uploads/2009/12/Angela-Maldonado-night-monkey.jpg',
        },
        {
          size: 50,
          name: 'Joany Beer',
          src: 'https://whitleyaward-cdn.standfirst.com/content/uploads/2009/12/Angela-Maldonado-night-monkey.jpg',
        },
        {
          size: 200,
          name: 'Joany Beer',
          src: 'https://whitleyaward-cdn.standfirst.com/content/uploads/2009/12/Angela-Maldonado-night-monkey.jpg',
        },
        {
          name: 'Nuno Frade',
          icon: 'tally',
        },
        {
          name: 'Nuno Frade',
          icon: 'tally',
          size: 50,
        },
        {
          name: 'Nuno Frade',
          icon: 'tally',
          size: 200,
        },
      ],
    },
  ],
}
