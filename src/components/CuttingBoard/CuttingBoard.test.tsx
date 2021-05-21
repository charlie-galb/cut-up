import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { CuttingBoard } from "./CuttingBoard"

import { 
    mockContainers,
    mockContainer1, 
    mockContainer2
} from "../../utils/mockData"

const mockSetWordChunks = jest.fn()
const mockSetChunkContainers = jest.fn()

afterEach(() => {
    jest.clearAllMocks()
  });

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
    test("It combines the three texts, cuts them into chunks and saves as state", () => {
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
        expect(mockSetChunkContainers).toHaveBeenCalledTimes(1)
    })
    test("It combines the three texts and saves state", () => {
        const shuffledIDs = ['snippet1', 'snippet3', 'snipppet2']
        jest.spyOn(global.Math, 'random').mockReturnValue(0.6)
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
        expect(mockSetChunkContainers).toHaveBeenCalledTimes(1)
        expect(mockSetChunkContainers).toHaveBeenCalledWith({
            ['chunk-container-1']: {
                id: mockContainer1.id,
                title: mockContainer1.title,
                nestedChunkIDs: ['snippet1', 'snippet3', 'snippet2']
            },
            ['chunk-container-2']: mockContainer2
            })
        jest.spyOn(global.Math, 'random').mockRestore()
    })
})