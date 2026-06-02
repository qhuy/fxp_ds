import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: '22rem' }}>
      <CardHeader>
        <CardTitle>Projet</CardTitle>
        <CardDescription>Résumé du composant Card.</CardDescription>
      </CardHeader>
      <CardContent>Contenu principal de la carte.</CardContent>
      <CardFooter>
        <Button size="sm">Continuer</Button>
      </CardFooter>
    </Card>
  ),
}
