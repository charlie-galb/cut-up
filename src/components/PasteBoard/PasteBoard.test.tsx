import React from "react"
import { render } from "@testing-library/react"
import { DndContext } from '@dnd-kit/core'
 

import { PasteBoard } from "./PasteBoard"

import { mockChunks, mockContainer1 } from "../../utils/mockData"

describe("PasteBoard", () => {
    test("It displays the correct number of text snippets", () => {
        const board = render(
            <DndContext onDragEnd={() => {}}>
                <PasteBoard 
                    activeId={""} 
                    wordChunks={mockChunks} 
                    chunkContainer={mockContainer1}/>
            </DndContext>
        )
        expect(board).toMatchSnapshot()
    })
})