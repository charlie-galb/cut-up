import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { Button } from "./Button"

describe("Button", () => {
    test("Executes callback when clicked", () => {
        const mockCallback = jest.fn()
        const { getByTestId } = render(
            <Button testId="test-button" className="CSS class" handleCallback={mockCallback}>Button text here</Button>
        )
        expect(getByTestId("test-button")).toHaveTextContent('Button text here')
        fireEvent.click(getByTestId("test-button"))
        expect(mockCallback).toHaveBeenCalled()
    })
})