import React from "react"
import { render } from "@testing-library/react"
import { DndContext } from '@dnd-kit/core'
 
import { WorkInProgress } from "./WorkInProgress"
import { mockChunks, 
    mockLineOrder, 
    mockContainers} from "../../utils/mockData"

const mockSetLineOrder = jest.fn()
const mockSetChunkContainers = jest.fn()

describe("WorkInProgress", () => {
    it("iterates over the lines array and renders every element", () => {
        const { getAllByRole } = render(
        <DndContext onDragEnd={() => {}}>
            <WorkInProgress 
                activeId={""} 
                wordChunks={mockChunks} 
                lineOrder={mockLineOrder} 
                chunkContainers={mockContainers} 
                setLineOrder={mockSetLineOrder} 
                setChunkContainers={mockSetChunkContainers}/>
        </DndContext>
        )
        expect(getAllByRole("button")).toHaveLength(6)
    })
})