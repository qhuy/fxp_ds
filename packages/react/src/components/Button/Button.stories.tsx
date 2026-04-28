import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'destructive'] },
    size: { control: 'radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Supprimer' },
}

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
}

export const AsChildLink: Story = {
  render: () => (
    <Button asChild>
      <a href="https://example.com" target="_blank" rel="noreferrer">
        Lien stylé en bouton
      </a>
    </Button>
  ),
}
