import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" style={{ maxWidth: '24rem' }}>
      <TabsList>
        <TabsTrigger value="overview">Vue</TabsTrigger>
        <TabsTrigger value="settings">Réglages</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Contenu principal.</TabsContent>
      <TabsContent value="settings">Contenu des réglages.</TabsContent>
    </Tabs>
  ),
}
