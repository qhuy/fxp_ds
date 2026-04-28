import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline', 'destructive', 'ghost', 'link'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
    onMouseEnter: { action: 'mouseEnter' },
    onMouseLeave: { action: 'mouseLeave' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
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

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
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

export const ExtraSmall: Story = {
  args: { size: 'xs', children: 'XS' },
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

const Plus = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <title>Plus</title>
    <path d="M12 5v14M5 12h14" />
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

export const Icon: Story = {
  args: {
    size: 'icon',
    'aria-label': 'Ajouter',
    children: <Plus />,
  },
}

export const IconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Button size="icon-xs" aria-label="Ajouter petit">
        <Plus />
      </Button>
      <Button size="icon-sm" aria-label="Ajouter compact">
        <Plus />
      </Button>
      <Button size="icon" aria-label="Ajouter">
        <Plus />
      </Button>
      <Button size="icon-lg" aria-label="Ajouter large">
        <Plus />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
}

export const Invalid: Story = {
  args: { 'aria-invalid': true, children: 'Invalid' },
}

export const Expanded: Story = {
  args: { variant: 'outline', 'aria-expanded': true, children: 'Expanded' },
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
