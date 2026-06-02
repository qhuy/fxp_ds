import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertDescription, AlertTitle } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'destructive'] },
  },
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>Le composant Alert sert aux messages importants.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription>Une action requiert votre attention.</AlertDescription>
    </Alert>
  ),
}
