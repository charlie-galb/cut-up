import React from 'react';
import { render } from "@testing-library/react";

import App from './App';

test('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("test-header")).toHaveTextContent("Cut-up App");
});