import { ShowcaseComponent, ShowcaseComponentProps } from './showcaseComponent'

import {
  Title,
  Button,
  Text,
  Avatar,
  BasicCard,
  ResultCard,
} from '@based/ui-next'

const Playground = () => {
  const components: ShowcaseComponentProps[] = [
    {
      component: <Button>Button</Button>,
      code: '<Button>Button</Button>',
    },
    {
      component: <Title>Title</Title>,
      code: '<Title>Title</Title>',
    },
    {
      component: <Avatar>Avatar</Avatar>,
      code: '<Avatar>Avatar</Avatar>',
    },
    {
      component: (
        <BasicCard imageUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFuZHNjYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60">
          <Title fontWeight={'medium'}>Bonjour Senior</Title>
          <Text>Hello Amigo</Text>
        </BasicCard>
      ),
      code: `
<BasicCard imageUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFuZHNjYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60">
  <Title fontWeight={'medium'}>Bonjour Senior</Title>
  <Text>Hello Amigo</Text>
</BasicCard>
      `.trim(),
    },
    {
      component: (
        <ResultCard>
          <Text>Answers</Text>
          <Title fontWeight={'bold'}>1k</Title>
        </ResultCard>
      ),
      code: `
<ResultCard>
  <Text>Answers</Text>
  <Title fontWeight={'bold'}>1k</Title>
</ResultCard>
      `.trim(),
    },
  ]

  return (
    <div
      style={{
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
      <Title
        fontWeight="bold"
        style={{
          marginBottom: '20px',
        }}
      >
        Examples
      </Title>

      <div>
        {components.map((component, index) => (
          <ShowcaseComponent
            key={`ShowcaseComponent-${index}`}
            {...component}
          />
        ))}
      </div>
    </div>
  )
}

export default Playground
