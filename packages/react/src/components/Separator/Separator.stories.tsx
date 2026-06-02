import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './Separator'

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
}

export default meta

type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem', width: '18rem' }}>
      <span>Section A</span>
      <Separator />
      <span>Section B</span>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', height: '2rem', alignItems: 'center' }}>
      <span>A</span>
      <Separator orientation="vertical" />
      <span>B</span>
    </div>
  ),
}
