import React from 'react'
import { render } from '@testing-library/react'

import { CraftingBoard } from "./CraftingBoard"

import { mockContainers, mockLineOrder, mockChunks } from "../../utils/mockData"

describe("CraftingBoard", () => {
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