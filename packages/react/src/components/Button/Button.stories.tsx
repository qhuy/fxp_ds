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

const ChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <title>Chevron gauche</title>
    <path d="m15 18-6-6 6-6" />
  </svg>
)
const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <title>Chevron droit</title>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const WithIconLeft: Story = {
  args: { iconLeft: <ChevronLeft />, children: 'Précédent' },
}

export const WithIconRight: Story = {
  args: { iconRight: <ChevronRight />, children: 'Suivant' },
}

export const Loading: Story = {
  args: { loading: true, children: 'Chargement…' },
}

export const LoadingDestructive: Story = {
  args: { loading: true, variant: 'destructive', children: 'Suppression…' },
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
