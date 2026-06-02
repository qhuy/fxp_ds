import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Alert, AlertDescription, AlertTitle } from './Alert'

describe('Alert', () => {
  it('renders alert composition', () => {
    render(
      <Alert>
        <AlertTitle>Titre</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>,
    )

    expect(screen.getByRole('alert').className).toContain('fxp-alert')
    expect(screen.getByText('Titre').getAttribute('data-slot')).toBe('alert-title')
  })
})
