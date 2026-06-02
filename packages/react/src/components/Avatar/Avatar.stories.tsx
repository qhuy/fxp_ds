import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>BD</AvatarFallback>
    </Avatar>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}
