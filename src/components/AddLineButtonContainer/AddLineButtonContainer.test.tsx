import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { mockContainers, mockLineOrder} from "../../utils/mockData"
import { AddLineButtonContainer } from "./AddLineButtonContainer"

const mockUpdateChunkContainers = jest.fn()
const mockUpdateLineOrder = jest.fn()

describe("AddLineButtonContainer", () => {
    test("Renders a button", () => {
        const { getAllByRole } = render(
            <AddLineButtonContainer 
            chunkContainers={mockContainers}
            lineOrder={mockLineOrder}
            setChunkContainers={mockUpdateChunkContainers} 
            setLineOrder={mockUpdateLineOrder}/>
        )
        expect(getAllByRole("button")).toHaveLength(1)
    })
    test("Executes updates chunkContainers and lineOrder when clicked", () => {
        const { getByTestId } = render(
            <AddLineButtonContainer 
            chunkContainers={mockContainers}
            lineOrder={mockLineOrder}
            setChunkContainers={mockUpdateChunkContainers} 
            setLineOrder={mockUpdateLineOrder}/>
        )
        fireEvent.click(getByTestId("add-line-btn"))
        expect(mockUpdateChunkContainers).toHaveBeenCalled()
        expect(mockUpdateLineOrder).toHaveBeenCalled()
    })
})