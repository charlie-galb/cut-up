import React from 'react';
import { render } from "@testing-library/react";

import { Header } from './Header';

test('renders without crashing', () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("header")).toMatchSnapshot();
});