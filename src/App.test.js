import { render, screen } from '@testing-library/react';
import App from './components/App';

test('renders navigation bar', () => {
  render(<App />);
  const logoElements = screen.getAllByAltText(/A Viva Voz Logo/i);
  expect(logoElements.length).toBeGreaterThan(0);
  expect(logoElements[0]).toBeInTheDocument();
});
