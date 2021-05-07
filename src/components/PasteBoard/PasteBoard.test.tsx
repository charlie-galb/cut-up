import React from "react"
import { render } from "@testing-library/react"
 
import { PasteBoard } from "./PasteBoard"

const wordChunks = ["chunk one", "chunk two"]

describe("PasteBoard", () => {
    test("It renders correctly", () => {
        const board = render(<PasteBoard wordChunks={wordChunks}/>)
        expect(board).toMatchSnapshot()
    })
    test("It displays text chunks as draggable objects", () => {
        const { getAllByRole } = render(<PasteBoard wordChunks={wordChunks}/>)
        const listItems = getAllByRole('listitem')
        expect(listItems).toHaveLength(2)
    })
})