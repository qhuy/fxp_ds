import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '../Input'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Label>

export const WithInput: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.5rem', width: '18rem' }}>
      <Label htmlFor="name">Nom</Label>
      <Input id="name" placeholder="Bobun" />
    </div>
  ),
}
