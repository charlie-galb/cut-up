import React from "react"
import { render } from "@testing-library/react"
import { DragDropContext } from 'react-beautiful-dnd'

import {  mockContainers, mockLineOrder } from "../../utils/mockData"
import { WorkInProgress } from "../index"

describe("WorkInProgress", () => {
    test("It displays the correct number of text snippets", () => {
        const wip = render(
            <DragDropContext onDragEnd={jest.fn()}>
                <WorkInProgress 
                    lineOrder={mockLineOrder}
                    chunkContainers={mockContainers}
                    setChunkContainers={jest.fn()}
                    setLineOrder={jest.fn()}/>
            </DragDropContext>
        )
        expect(wip).toMatchSnapshot()
    })
})