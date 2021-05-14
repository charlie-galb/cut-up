import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { CuttingBoard } from "./CuttingBoard"

const snipMock = jest.fn()

describe("CuttingBoard", () => {
    test("it renders correctly", () => {
        const board = render(<CuttingBoard snipText ={snipMock}/>)
        expect(board).toMatchSnapshot()
    })
    test("there are three text areas", () => {
        const { getAllByRole } = render(<CuttingBoard snipText ={snipMock}/>)
        expect(getAllByRole("textbox")).toHaveLength(3)
    })
    test("It combines the three texts and calls snipText", () => {
        const { getByTestId } = render(<CuttingBoard snipText ={snipMock} />)
        fireEvent.change(getByTestId("cutting-text-area1"), {target: {value: "One and" } } )
        fireEvent.change(getByTestId("cutting-text-area2"), {target: {value: "Two and" } } )
        fireEvent.change(getByTestId("cutting-text-area3"), {target: {value: "Three and" } } )
        fireEvent.click(getByTestId("cut-btn"))
        expect(snipMock).toHaveBeenCalledWith("One and Two and Three and")
    })
})