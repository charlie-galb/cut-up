import React from "react"
import { render } from "@testing-library/react"

import { TextSnippet } from "../index"

const mockSetPoemAsText = jest.fn()
const mockDisplayPopUp = jest.fn()

describe("TextSnippet", () => {
    test("Renders a button", () => {
        const { getByRole } = render(
            <TextSnippet 
                text={"test string"}
                id={"one"} 
                index={0}/>
        )
        expect(getByRole("button")).toHaveTextContent("test string")
    })
})