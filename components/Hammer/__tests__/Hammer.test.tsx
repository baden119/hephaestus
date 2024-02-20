import { render, screen } from '@testing-library/react';
import Hammer from '../Hammer';
describe('Hammer Component', () => {
  it('should have a div named hammer', () => {
    render(<Hammer />); // Arrange

    const hammer = screen.getByRole('hammer'); // ACT

    expect(hammer).toBeInTheDocument(); // ASSERT
  });
});
