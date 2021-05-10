import React from "react"
import { render } from "@testing-library/react"
import { DragDropContext } from 'react-beautiful-dnd'
 
import { PasteBoard } from "./PasteBoard"
import { chunk } from "../../types/chunk"

const chunkOne: chunk = {
    id: 1,
    text: "one"
}

const chunkTwo: chunk = {
    id: 2,
    text: "two"
}

const wordChunks = [chunkOne, chunkTwo]

describe("PasteBoard", () => {
    test("It renders correctly", () => {
        const board = render(
            <DragDropContext onDragEnd={() => {}}>
                <PasteBoard wordChunks={wordChunks}/>
            </DragDropContext>
        )
        expect(board).toMatchSnapshot()
    })
    test("It displays text chunks as draggable objects", () => {
        const { getAllByRole } = render(
            <DragDropContext onDragEnd={() => {}}>
                <PasteBoard wordChunks={wordChunks}/>
            </DragDropContext>
        )
        expect(getAllByRole("button")).toHaveLength(2)
    })
})