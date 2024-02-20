import { render, screen } from '@testing-library/react';
import Revenge from '../Revenge';
describe('Revenge Component', () => {
  it('should have a div named revenge', () => {
    render(<Revenge />); // Arrange

    const revenge = screen.getByRole('revenge'); // ACT

    expect(revenge).toBeInTheDocument(); // ASSERT
  });
});
