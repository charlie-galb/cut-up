import React from 'react';
import { render } from "@testing-library/react";

import { Header } from '../index';

test('renders without crashing', () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("header")).toHaveTextContent("Cut-up Creator");
    expect(getByTestId("header")).toMatchSnapshot();
});