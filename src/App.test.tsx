import { render, screen } from '@testing-library/react';
import { FC, useState, useRef, useCallback } from "react";
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement =  App();
  expect(linkElement).toBeInTheDocument();
});
