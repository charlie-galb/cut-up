import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { CuttingBoard } from "./CuttingBoard"

const snipMock = jest.fn()

describe("CuttingBoard", () => {
    test("it renders correctly", () => {
        const board = render(<CuttingBoard snipText ={snipMock}/>)
        expect(board).toMatchSnapshot()
    })
    test("It converts the text to an array of word chunks", () => {
        const { getByTestId } = render(<CuttingBoard snipText ={snipMock} />)
        fireEvent.change(getByTestId("cutting-text-area"), {target: {value: "This is a moderate chunk of text" } } )
        fireEvent.click(getByTestId("cut-btn"))
        expect(snipMock).toHaveBeenCalledWith("This is a moderate chunk of text")
    })
})