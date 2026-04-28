import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('rend avec le variant primary par défaut', () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole('button', { name: 'Click me' })
    expect(btn.className).toContain('fxp-button--primary')
    expect(btn.className).toContain('fxp-button--md')
  })

  it('applique le variant secondary quand demandé', () => {
    render(<Button variant="secondary">Annuler</Button>)
    expect(screen.getByRole('button').className).toContain('fxp-button--secondary')
  })

  it('applique le variant destructive quand demandé', () => {
    render(<Button variant="destructive">Supprimer</Button>)
    expect(screen.getByRole('button').className).toContain('fxp-button--destructive')
  })

  it('applique le variant ghost quand demandé', () => {
    render(<Button variant="ghost">Discret</Button>)
    expect(screen.getByRole('button').className).toContain('fxp-button--ghost')
  })

  it('applique le variant link quand demandé', () => {
    render(<Button variant="link">En savoir plus</Button>)
    expect(screen.getByRole('button').className).toContain('fxp-button--link')
  })

  it('applique la taille lg quand demandée', () => {
    render(<Button size="lg">Hero CTA</Button>)
    expect(screen.getByRole('button').className).toContain('fxp-button--lg')
  })

  it('passthrough la prop className', () => {
    render(<Button className="custom-class">x</Button>)
    expect(screen.getByRole('button').className).toContain('custom-class')
  })

  it("asChild rend l'élément enfant à la place du button", () => {
    render(
      <Button asChild>
        <a href="/test">lien</a>
      </Button>,
    )
    expect(screen.getByRole('link', { name: 'lien' })).toBeDefined()
    expect(screen.queryByRole('button')).toBeNull()
  })

  it("respecte l'attribut disabled", () => {
    render(<Button disabled>x</Button>)
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(true)
  })

  it('rend iconLeft avant le label', () => {
    render(<Button iconLeft={<svg data-testid="left-icon" aria-hidden="true" />}>Précédent</Button>)
    const btn = screen.getByRole('button', { name: 'Précédent' })
    const icon = screen.getByTestId('left-icon')
    expect(btn.contains(icon)).toBe(true)
    expect(btn.firstElementChild?.contains(icon)).toBe(true)
  })

  it('rend iconRight après le label', () => {
    render(<Button iconRight={<svg data-testid="right-icon" aria-hidden="true" />}>Suivant</Button>)
    const btn = screen.getByRole('button', { name: 'Suivant' })
    const icon = screen.getByTestId('right-icon')
    expect(btn.lastElementChild?.contains(icon)).toBe(true)
  })

  it('rend un Spinner et désactive le bouton quand loading=true', () => {
    render(<Button loading>Soumettre</Button>)
    const btn = screen.getByRole('button', { name: 'Soumettre' })
    expect(btn.hasAttribute('disabled')).toBe(true)
    expect(btn.getAttribute('aria-busy')).toBe('true')
    // Le Spinner a role="status" — il est imbriqué dans le button
    expect(screen.getByRole('status', { hidden: true })).toBeDefined()
  })

  it('loading remplace iconLeft mais garde le label visible', () => {
    render(
      <Button loading iconLeft={<svg data-testid="left-icon" aria-hidden="true" />}>
        Sauver
      </Button>,
    )
    expect(screen.queryByTestId('left-icon')).toBeNull()
    expect(screen.getByRole('button', { name: 'Sauver' })).toBeDefined()
    expect(screen.getByRole('status', { hidden: true })).toBeDefined()
  })

  it('ignore iconLeft/iconRight quand asChild=true', () => {
    render(
      <Button asChild iconLeft={<svg data-testid="ignored-icon" aria-hidden="true" />}>
        <a href="/test">lien</a>
      </Button>,
    )
    expect(screen.queryByTestId('ignored-icon')).toBeNull()
  })

  // ── Audit a11y / clavier (étape 7 roadmap) ──

  it('est focusable au clavier (Tab)', async () => {
    const user = userEvent.setup()
    render(<Button>Cible</Button>)
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('button'))
  })

  it('déclenche onClick au clavier (Enter)', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Valider</Button>)
    await user.tab()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('déclenche onClick au clavier (Espace)', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Valider</Button>)
    await user.tab()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('ne déclenche pas onClick quand disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Button onClick={onClick} disabled>
        Inactif
      </Button>,
    )
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('ne déclenche pas onClick quand loading', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Button onClick={onClick} loading>
        En cours
      </Button>,
    )
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
