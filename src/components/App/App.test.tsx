import React from 'react';
import { render } from "@testing-library/react";

import { text } from '../../data/text'
import { App } from './App';

const { para1, para2, para3 } = text

describe('App', () => {
    test('renders without crashing', () => {
        const app = render(<App />);
        expect(app.getByTestId('para-1')).toHaveTextContent(para1) 
        expect(app.getByTestId('para-2')).toHaveTextContent(para2) 
        expect(app.getByTestId('para-3')).toHaveTextContent(para3) 
        expect(app).toMatchSnapshot();
    });
})
    