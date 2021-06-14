import React from "react"
import { render } from "@testing-library/react"
import { DragDropContext } from 'react-beautiful-dnd'
 
import { mockContainer1 } from "../../utils/mockData"
import { PasteBoard } from "../index"

describe("PasteBoard", () => {
    test("It displays the correct number of text snippets", () => {
        const board = render(
            <DragDropContext onDragEnd={jest.fn()}>
                <PasteBoard 
                    chunkContainer={mockContainer1}/>
            </DragDropContext>
        )
        expect(board).toMatchSnapshot()
    })
})