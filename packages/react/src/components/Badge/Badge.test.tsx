import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children and default variant', () => {
    render(<Badge>Publié</Badge>)
    expect(screen.getByText('Publié').className).toContain('fxp-badge--default')
  })

  it('passes native span props', () => {
    render(
      <Badge data-testid="badge" title="Statut">
        Actif
      </Badge>,
    )
    expect(screen.getByTestId('badge').getAttribute('title')).toBe('Statut')
  })
})
