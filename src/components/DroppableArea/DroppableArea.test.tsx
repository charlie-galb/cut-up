import React from 'react'
import { render } from '@testing-library/react'

import { mockContainer1 } from "../../utils/mockData"
import { DroppableArea } from "./DroppableArea"

describe("DroppableArea", () => {
    it('renders the correct number of text snippets', () => {
        const { getAllByRole } = render(
            <DroppableArea
                chunkContainer={mockContainer1}
                droppableClass={"test"}
                />
        )
        expect(getAllByRole('button')).toHaveLength(2)
    })
    it('applies the CSS class to the droppable container', () => {
        const { getByTestId } = render(
            <DroppableArea
                chunkContainer={mockContainer1}
                droppableClass={"test"}
                />
        )
        expect(getByTestId('pasteboard')).toHaveClass('test')
    })
})