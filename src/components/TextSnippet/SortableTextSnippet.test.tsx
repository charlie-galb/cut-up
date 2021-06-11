import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { mockContainers, mockLineOrder, mockChunks} from "../../utils/mockData"
import { SortableTextSnippet } from "./SortableTextSnippet"

const mockSetPoemAsText = jest.fn()
const mockDisplayPopUp = jest.fn()

describe("SortableTextSnippet", () => {
    test("Renders a button", () => {
        const { getByRole } = render(
            <SortableTextSnippet 
                text={"test string"}
                id={"one"} 
                index={0}/>
        )
        expect(getByRole("button")).toHaveTextContent("test string")
    })
})