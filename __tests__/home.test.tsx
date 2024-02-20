import { render, screen } from '@testing-library/react';
import Home from '@/pages/home';

describe('Hephaestus Home Testing Suite', () => {
  it('should have a div named blacksmith', () => {
    render(<Home />); // Arrange

    const blacksmith = screen.getByRole('blacksmith'); // ACT

    expect(blacksmith).toBeInTheDocument(); // ASSERT
  });
});
