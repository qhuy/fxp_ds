import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('rend avec le rôle status et un label par défaut', () => {
    render(<Spinner />)
    const el = screen.getByRole('status')
    expect(el.getAttribute('aria-label')).toBe('Loading')
    expect(el.className).toContain('fxp-spinner--md')
  })

  it('applique la taille sm quand demandée', () => {
    render(<Spinner size="sm" />)
    expect(screen.getByRole('status').className).toContain('fxp-spinner--sm')
  })

  it('applique la taille lg quand demandée', () => {
    render(<Spinner size="lg" />)
    expect(screen.getByRole('status').className).toContain('fxp-spinner--lg')
  })

  it('utilise le label custom fourni', () => {
    render(<Spinner label="Chargement en cours" />)
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Chargement en cours')
  })

  it('passthrough la prop className', () => {
    render(<Spinner className="custom-spin" />)
    expect(screen.getByRole('status').className).toContain('custom-spin')
  })
})
