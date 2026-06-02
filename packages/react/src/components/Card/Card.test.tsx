import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card'

describe('Card', () => {
  it('renders compound slots', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Titre</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Corps</CardContent>
      </Card>,
    )

    expect(screen.getByText('Titre').getAttribute('data-slot')).toBe('card-title')
    expect(screen.getByText('Description').getAttribute('data-slot')).toBe('card-description')
    expect(screen.getByText('Corps').getAttribute('data-slot')).toBe('card-content')
  })
})
