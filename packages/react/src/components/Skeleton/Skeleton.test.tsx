import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders native div props', () => {
    render(<Skeleton data-testid="loader" aria-label="Chargement" />)
    expect(screen.getByTestId('loader').className).toContain('fxp-skeleton')
  })
})
