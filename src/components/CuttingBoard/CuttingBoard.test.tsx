import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { CuttingBoard } from "./CuttingBoard"

import { 
    mockContainers, 
} from "../../utils/mockData"

const mockSetWordChunks = jest.fn()
const mockSetChunkContainers = jest.fn()

describe("CuttingBoard", () => {
    test("it renders correctly", () => {
        const board = render(
            <CuttingBoard 
                chunkContainers={mockContainers}
                setWordChunks={mockSetWordChunks}
                setChunkContainers={mockSetChunkContainers}/>
            )
    })
    test("there are three text areas", () => {
        const { getAllByRole } = render(
            <CuttingBoard 
                chunkContainers={mockContainers}
                setWordChunks={mockSetWordChunks}
                setChunkContainers={mockSetChunkContainers}/>
            )
        expect(getAllByRole("textbox")).toHaveLength(3)
    })
    test("It combines the three texts and saves state", () => {
        const { getByTestId } = render(
            <CuttingBoard 
                chunkContainers={mockContainers}
                setWordChunks={mockSetWordChunks}
                setChunkContainers={mockSetChunkContainers}/>
            )
        fireEvent.change(getByTestId("cutting-text-area1"), {target: {value: "One and" } } )
        fireEvent.change(getByTestId("cutting-text-area2"), {target: {value: "Two and" } } )
        fireEvent.change(getByTestId("cutting-text-area3"), {target: {value: "Three and" } } )
        fireEvent.click(getByTestId("cut-btn"))
        expect(mockSetWordChunks).toHaveBeenCalledWith({"snippet1": "one and", "snippet2": "two and", "snippet3": "three and"})
        expect(mockSetWordChunks).toHaveBeenCalledTimes(1)
    })
})