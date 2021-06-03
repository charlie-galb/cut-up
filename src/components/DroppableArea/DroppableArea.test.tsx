import React from 'react'
import { render } from '@testing-library/react'

import { DroppableArea } from "./DroppableArea"

import { mockContainer1, mockLineOrder, mockChunks } from "../../utils/mockData"

describe("DroppableArea", () => {
    it('renders the correct number of text snippets', () => {
        const { getAllByRole } = render(
            <DroppableArea
                chunkContainer={mockContainer1}
                wordChunks={mockChunks}
                activeId={""}
                droppableClass={"test"}
                />
        )
        expect(getAllByRole('button')).toHaveLength(2)
    })
    it('applies the CSS class to the droppable container', () => {
        const { getByTestId } = render(
            <DroppableArea
                chunkContainer={mockContainer1}
                wordChunks={mockChunks}
                activeId={""}
                droppableClass={"test"}
                />
        )
        expect(getByTestId('pasteboard')).toHaveClass('test')
    })
})