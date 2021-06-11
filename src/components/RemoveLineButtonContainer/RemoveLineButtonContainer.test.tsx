import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { mockContainers, mockLineOrder} from "../../utils/mockData"
import { RemoveLineButtonContainer } from "../index"

const mockUpdateChunkContainers = jest.fn()
const mockUpdateLineOrder = jest.fn()

describe("RemoveLineButtonContainer", () => {
    test("Renders a button", () => {
        const { getAllByRole } = render(
            <RemoveLineButtonContainer 
            chunkContainers={mockContainers}
            lineOrder={mockLineOrder}
            setChunkContainers={mockUpdateChunkContainers} 
            setLineOrder={mockUpdateLineOrder}/>
        )
        expect(getAllByRole("button")).toHaveLength(1)
    })
    test("Executes updates chunkContainers and lineOrder when clicked", () => {
        const { getByTestId } = render(
            <RemoveLineButtonContainer 
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