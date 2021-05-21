import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { TextifyButton } from "./TextifyButton"

import { 
    mockChunks,  
    mockContainers, 
    mockLineOrder 
} from "../../utils/mockData"

const mockSetPoem = jest.fn()

describe("TextifyButton", () => {
    it("calls outputToText() when clicked", () => {
        const { getByTestId } = render(
            <TextifyButton 
            chunkContainers={mockContainers}
            wordChunks={mockChunks} 
            lineOrder={mockLineOrder} 
            setPoemAsText={mockSetPoem} />)
        fireEvent.click(getByTestId("textify-btn"))
        expect(mockSetPoem).toHaveBeenCalled()
    })
})