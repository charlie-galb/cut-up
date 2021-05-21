import React from "react"
import { render } from "@testing-library/react"
import { DndContext } from '@dnd-kit/core'
 
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
            <DndContext onDragEnd={() => {}}>
                <PasteBoard activeId={""} wordChunks={mockChunks} chunkContainer={mockContainer}/>
            </DndContext>
        )
        expect(board).toMatchSnapshot()
    })
    test("It displays text chunks as draggable objects", () => {
        const { getAllByRole } = render(
            <DndContext onDragEnd={() => {}}>
                <PasteBoard activeId={""} wordChunks={mockChunks} chunkContainer={mockContainer}/>
            </DndContext>
        )
        expect(getAllByRole("button")).toHaveLength(2)
    })
})