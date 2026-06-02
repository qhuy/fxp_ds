import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../Button/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog'

const meta: Meta<typeof Dialog> = {
  title: 'Primitives/Dialog',
  component: Dialog,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ouvrir le dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer l'opération</DialogTitle>
          <DialogDescription>
            Cette action est immédiate et ne peut pas être annulée.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Annuler</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">Confirmer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Controlled: Story = {
  render: () => {
    function ControlledDialog() {
      const [open, setOpen] = useState(false)
      return (
        <>
          <Button onClick={() => setOpen(true)}>Piloter depuis l'extérieur</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog contrôlé</DialogTitle>
                <DialogDescription>
                  L'état d'ouverture est piloté par le state React parent.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>OK</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )
    }
    return <ControlledDialog />
  },
}

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Voir le contenu long</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conditions d'utilisation</DialogTitle>
          <DialogDescription>Faites défiler pour tout lire.</DialogDescription>
        </DialogHeader>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={`paragraph-${i.toString()}`}>
            Paragraphe {i + 1} — lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
        <DialogFooter>
          <DialogClose asChild>
            <Button>J'ai lu</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const CustomTrigger: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--fxp-color-fg-default)', textDecoration: 'underline', cursor: 'pointer' }}>
          Cliquer sur ce lien stylé
        </a>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trigger personnalisé</DialogTitle>
          <DialogDescription>
            Tout élément peut servir de trigger grâce à <code>asChild</code>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
