import React from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { render } from "@testing-library/react"

import { TextSnippet } from "../index"

describe("TextSnippet", () => {
    test("Renders a button", () => {
        const { getByRole } = render(
            <DragDropContext onDragEnd={jest.fn()}>
                <Droppable droppableId="test droppable" direction="horizontal">
                    {(provided) => (
                        <div ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            <TextSnippet text={"test string"} id={"one"} index={0}/>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
        expect(getByRole("button")).toHaveTextContent("test string")
    })
})