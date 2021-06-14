import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { 
    mockChunk1,
    mockChunk2,
    mockChunk3,
    mockContainers,
    mockContainer1, 
    mockContainer2
} from "../../utils/mockData"
import { CuttingBoard } from "./CuttingBoard"

const mockSetChunkContainers = jest.fn()

afterEach(() => {
    jest.clearAllMocks()
  });

describe("CuttingBoard", () => {
    test("it renders correctly", () => {
        const board = render(
            <CuttingBoard 
                chunkContainers={mockContainers}
                setChunkContainers={mockSetChunkContainers}/>
            )
        expect(board).toMatchSnapshot()
    })
    test("there are three text areas", () => {
        const { getAllByRole } = render(
            <CuttingBoard 
                chunkContainers={mockContainers}
                setChunkContainers={mockSetChunkContainers}/>
            )
        expect(getAllByRole("textbox")).toHaveLength(3)
    })
    test("It combines the three texts, cuts them into chunks and saves as state", () => {
        const { getByTestId } = render(
            <CuttingBoard 
                chunkContainers={mockContainers}
                setChunkContainers={mockSetChunkContainers}/>
            )
        fireEvent.change(getByTestId("cutting-text-area1"), {target: {value: "One and" } } )
        fireEvent.change(getByTestId("cutting-text-area2"), {target: {value: "Two and" } } )
        fireEvent.change(getByTestId("cutting-text-area3"), {target: {value: "Three and" } } )
        fireEvent.click(getByTestId("cut-btn"))
        expect(mockSetChunkContainers).toHaveBeenCalledTimes(2)
    })
    test("It shuffles the chunks before saving state", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.6)
        const { getByTestId } = render(
            <CuttingBoard 
                chunkContainers={mockContainers}
                setChunkContainers={mockSetChunkContainers}/>
            )
        fireEvent.change(getByTestId("cutting-text-area1"), {target: {value: mockChunk1.text } } )
        fireEvent.change(getByTestId("cutting-text-area2"), {target: {value: mockChunk2.text } } )
        fireEvent.change(getByTestId("cutting-text-area3"), {target: {value: mockChunk3.text } } )
        fireEvent.click(getByTestId("cut-btn"))
        expect(mockSetChunkContainers).toHaveBeenCalledWith({
            ['chunk-container-1']: {
                id: mockContainer1.id,
                title: mockContainer1.title,
                chunks: [mockChunk1, mockChunk3, mockChunk2]
            },
            ['chunk-container-2']: mockContainer2
            })
        jest.spyOn(global.Math, 'random').mockRestore()
    })
})