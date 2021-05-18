import React from "react"
import { render } from "@testing-library/react"
import { DragDropContext } from 'react-beautiful-dnd'
 
import { PasteBoard } from "./PasteBoard"
import { chunkContainer } from "../../types/chunkContainer"

const mockChunks = {
    "1": "one",
    "2": "two"
}

const mockChunkIDs = ["1", "2"]

const mockContainer: chunkContainer = {
    id: 'chunk-container-1',
    title: 'pasteboard',
    nestedChunkIDs: mockChunkIDs
  }

describe("PasteBoard", () => {
    test("It renders correctly", () => {
        const board = render(
            <DragDropContext onDragEnd={() => {}}>
                <PasteBoard wordChunks={mockChunks} chunkContainer={mockContainer}/>
            </DragDropContext>
        )
        expect(board).toMatchSnapshot()
    })
    test("It displays text chunks as draggable objects", () => {
        const { getAllByRole } = render(
            <DragDropContext onDragEnd={() => {}}>
                <PasteBoard wordChunks={mockChunks} chunkContainer={mockContainer}/>
            </DragDropContext>
        )
        expect(getAllByRole("button")).toHaveLength(2)
    })
})