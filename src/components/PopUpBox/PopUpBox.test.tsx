import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { PopUpBox } from "../index"

const mockHandleClose = jest.fn()

const sampleText= "Sample text"

describe("PopUpBox", () => {
    test("Renders text properly", () => {
        const { getByTestId } = render(
            <PopUpBox handleClose={mockHandleClose}>
                {sampleText}
            </PopUpBox>
        )
        expect(getByTestId('pop-up-text')).toHaveTextContent(sampleText)
    })
    test("Executes updates chunkContainers and lineOrder when clicked", () => {
        const { getByTestId } = render(
            <PopUpBox handleClose={mockHandleClose}>
                {sampleText}
            </PopUpBox>
        )
        fireEvent.click(getByTestId("close-icon"))
        expect(mockHandleClose).toHaveBeenCalled()
    })
})