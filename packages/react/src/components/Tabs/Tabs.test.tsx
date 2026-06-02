import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

describe('Tabs', () => {
  it('switches active content', async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Contenu A</TabsContent>
        <TabsContent value="b">Contenu B</TabsContent>
      </Tabs>,
    )

    await user.click(screen.getByRole('tab', { name: 'B' }))
    expect(screen.getByText('Contenu B').getAttribute('data-state')).toBe('active')
  })
})
