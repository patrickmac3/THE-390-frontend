import React from 'react'
import { render, screen } from '@testing-library/react'
import CarouselHomeScreen from './CarouselHomeScreen'
import '@testing-library/jest-dom' // For better assertions

describe('CarouselFadeExample', () => {
  it('renders the carousel and checks for images and captions', () => {
    render(<CarouselHomeScreen />)

    // Check if the carousel items are present
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3) // Expect three images
    expect(images[0]).toHaveAttribute(
      'src',
      expect.stringContaining('property.jpeg'),
    )
    expect(images[1]).toHaveAttribute(
      'src',
      expect.stringContaining('property1.png'),
    )
    expect(images[2]).toHaveAttribute(
      'src',
      expect.stringContaining('property2.jpeg'),
    )

    // Check for captions
    expect(screen.getByText('First slide label')).toBeInTheDocument()
    expect(screen.getByText('Second slide label')).toBeInTheDocument()
    expect(screen.getByText('Third slide label')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
      ),
    ).toBeInTheDocument()
  })

  // Additional tests can be written to simulate user interaction if needed
})
