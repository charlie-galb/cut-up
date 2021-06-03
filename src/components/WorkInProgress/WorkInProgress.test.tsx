import React from "react"
import { render } from "@testing-library/react"
import { DndContext } from '@dnd-kit/core'
 

import { WorkInProgress } from "./WorkInProgress"

import { mockChunks, 
        mockContainers,
        mockLineOrder } from "../../utils/mockData"

describe("WorkInProgress", () => {
    test("It displays the correct number of text snippets", () => {
        const wip = render(
            <DndContext onDragEnd={() => {}}>
                <WorkInProgress 
                    activeId={""} 
                    lineOrder={mockLineOrder}
                    wordChunks={mockChunks} 
                    chunkContainers={mockContainers}
                    setChunkContainers={jest.fn()}
                    setLineOrder={jest.fn()}/>
            </DndContext>
        )
        expect(wip).toMatchSnapshot()
    })
})