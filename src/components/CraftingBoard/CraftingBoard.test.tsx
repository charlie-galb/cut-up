import React from 'react'
import { render, fireEvent, waitFor, screen, queryByText } from '@testing-library/react'

import { CraftingBoard } from "./CraftingBoard"

import { mockContainers, mockLineOrder, mockChunks } from "../../utils/mockData"

describe("CraftingBoard", () => {
    it('renders PopUpBox when the textify button is clicked', async () => {
        const mockPoem = "Eeny, meeny, miney, mo"
        const { getByText, getByTestId } = render(
            <CraftingBoard
                chunkContainers={mockContainers}
                lineOrder={mockLineOrder}
                wordChunks={mockChunks}
                activeId={""}
                poemAsText={mockPoem}
                setChunkContainers={jest.fn()}
                setLineOrder={jest.fn()}
                setPoemAsText={jest.fn()}
                />
        )
        const poem = screen.queryByText(mockPoem)
        expect(poem).not.toBeInTheDocument()
        fireEvent.click(getByTestId('textify-btn'))
        await waitFor(() => {
            expect(getByText(mockPoem)).toBeInTheDocument()
          })
    })
    it('renders correctly', () => {
        const board = render(
            <CraftingBoard
                chunkContainers={mockContainers}
                lineOrder={mockLineOrder}
                wordChunks={mockChunks}
                activeId={""}
                poemAsText={""}
                setChunkContainers={jest.fn()}
                setLineOrder={jest.fn()}
                setPoemAsText={jest.fn()}
                />
        )
        expect(board).toMatchSnapshot()
    })
})