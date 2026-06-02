import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './Dialog'

function Harness({ closeLabel = 'Fermer' }: { closeLabel?: string }) {
  return (
    <Dialog>
      <DialogTrigger>Ouvrir</DialogTrigger>
      <DialogContent>
        <DialogTitle>Titre</DialogTitle>
        <DialogDescription>Description du dialog.</DialogDescription>
        <p>Contenu interne.</p>
        <DialogClose aria-label={closeLabel}>X</DialogClose>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  it('ouvre le contenu via le trigger', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    expect(screen.queryByRole('dialog')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Ouvrir' }))
    expect(screen.getByRole('dialog')).not.toBeNull()
    expect(screen.getByText('Titre')).not.toBeNull()
  })

  it('ferme le dialog via Escape', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(screen.getByRole('button', { name: 'Ouvrir' }))
    expect(screen.getByRole('dialog')).not.toBeNull()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('ferme le dialog via le bouton Close', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(screen.getByRole('button', { name: 'Ouvrir' }))
    await user.click(screen.getByRole('button', { name: 'Fermer' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('câble title et description sur le dialog (a11y)', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(screen.getByRole('button', { name: 'Ouvrir' }))
    const dialog = screen.getByRole('dialog')
    const titleId = dialog.getAttribute('aria-labelledby')
    const descId = dialog.getAttribute('aria-describedby')
    expect(titleId).toBeTruthy()
    expect(descId).toBeTruthy()
    expect(document.getElementById(titleId!)?.textContent).toBe('Titre')
    expect(document.getElementById(descId!)?.textContent).toBe('Description du dialog.')
  })
})
