import React from 'react'
import { DragDropContext } from "react-beautiful-dnd"
import { render } from '@testing-library/react'

import { mockContainer1 } from "../../utils/mockData"
import { DroppableArea } from "./DroppableArea"

describe("DroppableArea", () => {
    it('renders the correct number of text snippets', () => {
        const { getAllByRole } = render(
            <DragDropContext onDragEnd={jest.fn()}>
                <DroppableArea chunkContainer={mockContainer1} droppableClass={"test"}/>
            </DragDropContext>
        )
        expect(getAllByRole('button')).toHaveLength(2)
    })
    it('applies the CSS class to the droppable container', () => {
        const { getByTestId } = render(
            <DragDropContext onDragEnd={jest.fn()}>
                <DroppableArea chunkContainer={mockContainer1} droppableClass={"test"}/>
            </DragDropContext>
        )
        expect(getByTestId('pasteboard')).toHaveClass('test')
    })
})