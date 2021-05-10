import React from "react"
import { render } from "@testing-library/react"
import { DragDropContext } from 'react-beautiful-dnd'
 
import { PasteBoard } from "./PasteBoard"

const wordChunks = ["chunk one", "chunk two"]

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
        expect(getAllByRole("snippet")).toHaveLength(2)
    })
})