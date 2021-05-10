import React from "react"
import { render } from "@testing-library/react"
 
import { TextSnippet } from "./TextSnippet"

const testChunk = "Test chunk"

describe("TextSnippet", () => {
    test("It renders correctly", () => {
        const snippet = render(<TextSnippet text={testChunk}/>)
        expect(snippet).toMatchSnapshot()
    })
})