import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { TextifyButton } from "./TextifyButton"

describe("TextifyButton", () => {
    it("calls outputToText() when clicked", () => {
        const mockTextify = jest.fn()
        const { getByTestId } = render(<TextifyButton outputToText={mockTextify} />)
        fireEvent.click(getByTestId("textify-btn"))
        expect(mockTextify).toHaveBeenCalled()
    })
})