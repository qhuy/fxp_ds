import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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

  it('ignore iconLeft/iconRight quand asChild=true', () => {
    render(
      <Button asChild iconLeft={<svg data-testid="ignored-icon" aria-hidden="true" />}>
        <a href="/test">lien</a>
      </Button>,
    )
    expect(screen.queryByTestId('ignored-icon')).toBeNull()
  })
})
