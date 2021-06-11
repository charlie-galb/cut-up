import React from "react"
import { render } from "@testing-library/react"
import { DragDropContext } from 'react-beautiful-dnd'
 

import { PasteBoard } from "./PasteBoard"

import { mockChunks, mockContainer1 } from "../../utils/mockData"

describe("PasteBoard", () => {
    test("It displays the correct number of text snippets", () => {
        const board = render(
            <DragDropContext onDragEnd={() => {}}>
                <PasteBoard 
                    chunkContainer={mockContainer1}/>
            </DragDropContext>
        )
        expect(board).toMatchSnapshot()
    })
})