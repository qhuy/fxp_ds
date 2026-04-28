import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'destructive', 'ghost', 'link'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
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

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Discret' },
}

export const Link: Story = {
  args: { variant: 'link', children: 'En savoir plus' },
}

export const Large: Story = {
  args: { size: 'lg', children: 'Hero CTA' },
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
