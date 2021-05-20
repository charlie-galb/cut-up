import React from "react"
import { render } from "@testing-library/react"
import { DndContext } from '@dnd-kit/core'
 
import { WorkInProgress } from "./WorkInProgress"
import { chunk } from "../../types/chunk"
import { chunkContainer } from "../../types/chunkContainer"

const mockAddLine = jest.fn()

const mockChunks = {
    "1": "one",
    "2": "two"
}

const mockChunkIDs = ["1", "2"]

const mockContainer1: chunkContainer = {
    id: 'chunk-container-1',
    title: 'pasteboard',
    nestedChunkIDs: mockChunkIDs
  }

  const mockContainer2: chunkContainer = {
    id: 'chunk-container-2',
    title: 'Line-1',
    nestedChunkIDs: mockChunkIDs
  }

const mockContainers = {
    [mockContainer1.id]: mockContainer1,
    [mockContainer2.id]: mockContainer2,
}

const mockLineIds = [mockContainer1.id, mockContainer2.id]

describe("WorkInProgress", () => {
    it("iterates over the lines array and renders every element", () => {
        const { getAllByRole } = render(
        <DndContext onDragEnd={() => {}}>
            <WorkInProgress activeId={""} wordChunks={mockChunks} lineOrder={mockLineIds} chunkContainers={mockContainers} addLine={mockAddLine}/>
        </DndContext>
        )
        expect(getAllByRole("button")).toHaveLength(5)
    })
})