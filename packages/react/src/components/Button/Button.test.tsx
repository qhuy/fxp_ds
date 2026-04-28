import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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

  it('passthrough la prop className', () => {
    render(<Button className="custom-class">x</Button>)
    expect(screen.getByRole('button').className).toContain('custom-class')
  })

  it('asChild rend l\'élément enfant à la place du button', () => {
    render(
      <Button asChild>
        <a href="/test">lien</a>
      </Button>
    )
    expect(screen.getByRole('link', { name: 'lien' })).toBeDefined()
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('respecte l\'attribut disabled', () => {
    render(<Button disabled>x</Button>)
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(true)
  })
})
