import React from 'react';
import { render } from "@testing-library/react";

import { Intro } from './Intro';

test('renders without crashing', () => {
    const intro = render(<Intro />);
    expect(intro).toMatchSnapshot()
});