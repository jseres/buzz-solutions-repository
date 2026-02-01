import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import axios from 'axios'
import App from '../App'

vi.mock('axios')

describe('App fetchPhotos connectivity', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  test('initial load calls API and renders returned photos', async () => {
    const items = [
      { title: 'Item A', media: { m: 'https://example.com/a.jpg' }, author: 'A', link: '#' },
      { title: 'Item B', media: { m: 'https://example.com/b.jpg' }, author: 'B', link: '#' }
    ]

    // Ensure any number of calls return the same payload
    axios.get.mockResolvedValue({ data: { items } })

    const { container } = render(<App />)

    // Wait until the photo cards render the expected number of images
    await waitFor(() => {
      const imgs = container.querySelectorAll('.photo-card img')
      if (imgs.length !== items.length) throw new Error(`expected ${items.length} images, got ${imgs.length}`)
    })

    // Verify axios was called at least once and the URL targets our API
    expect(axios.get).toHaveBeenCalled()
    const calledUrl = axios.get.mock.calls[0][0]
    expect(calledUrl).toMatch(/\/api\/photos/) // should hit our proxy route
  })
})
