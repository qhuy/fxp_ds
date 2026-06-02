import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem', width: '18rem' }}>
      <Skeleton style={{ height: '2rem' }} />
      <Skeleton style={{ height: '1rem', width: '70%' }} />
      <Skeleton style={{ height: '1rem', width: '45%' }} />
    </div>
  ),
}
