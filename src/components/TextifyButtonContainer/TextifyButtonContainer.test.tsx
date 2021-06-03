import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { mockContainers, mockLineOrder, mockChunks} from "../../utils/mockData"
import { TextifyButtonContainer } from "./TextifyButtonContainer"

const mockSetPoemAsText = jest.fn()
const mockDisplayPopUp = jest.fn()

describe("TextifyButtonContainer", () => {
    test("Renders a button", () => {
        const { getAllByRole } = render(
            <TextifyButtonContainer 
                wordChunks={mockChunks}
                chunkContainers={mockContainers}
                lineOrder={mockLineOrder}
                setPoemAsText={mockSetPoemAsText} 
                displayPopUp={mockDisplayPopUp}/>
        )
        expect(getAllByRole("button")).toHaveLength(1)
    })
    test("Executes updates chunkContainers and lineOrder when clicked", () => {
        const { getByTestId } = render(
            <TextifyButtonContainer 
                wordChunks={mockChunks}
                chunkContainers={mockContainers}
                lineOrder={mockLineOrder}
                setPoemAsText={mockSetPoemAsText} 
                displayPopUp={mockDisplayPopUp}/>
        )
        fireEvent.click(getByTestId("textify-btn"))
        expect(mockSetPoemAsText).toHaveBeenCalled()
        expect(mockDisplayPopUp).toHaveBeenCalled()
    })
})