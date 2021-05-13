import React from "react"
import { render } from "@testing-library/react"
import { DragDropContext } from 'react-beautiful-dnd'
 
import { WorkInProgress } from "./WorkInProgress"
import { chunk } from "../../types/chunk"
import { chunkContainer } from "../../types/chunkContainer"

const mockAddLine = jest.fn()

const chunkOne: chunk = {
    id: 1,
    text: "one"
}

const chunkTwo: chunk = {
    id: 2,
    text: "two"
}

const wordChunks = [chunkOne, chunkTwo]

const mockContainer1: chunkContainer = {
    id: 'mockLineOne',
    title: 'mockLineOne',
    nestedChunks: wordChunks
  }

const mockContainer2: chunkContainer = {
    id: 'mockLineTwo',
    title: 'mockLineTwo',
    nestedChunks: wordChunks
}

const mockContainers = {
    [mockContainer1.id]: mockContainer1,
    [mockContainer2.id]: mockContainer2,
}

const mockLineIds = [mockContainer1.id, mockContainer2.id]

describe("WorkInProgress", () => {
    it("iterates over the lines array and renders every element", () => {
        const { getAllByRole } = render(
        <DragDropContext onDragEnd={() => {}}>
            <WorkInProgress lineOrder={mockLineIds} chunkContainers={mockContainers} addLine={mockAddLine}/>
        </DragDropContext>
        )
        expect(getAllByRole("button")).toHaveLength(5)
    })
})