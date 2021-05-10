import React, {useEffect } from "react"

import { Droppable } from "react-beautiful-dnd"

import { TextSnippet } from "../TextSnippet/TextSnippet"

interface Props {
    wordChunks: string[]
}

export const PasteBoard = (props: Props) => {

    const { wordChunks } = props

    return (
        <div className="pasteboard-container" >
            <Droppable droppableId="1">
                {provided => (
                <div data-testid="unused-snippets" {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {wordChunks.map((chunk, i) => {
                        return (
                            <TextSnippet data-testid="snippet" key={i} text={chunk}/>
                        )
                    })}
                    {provided.placeholder}
                </div>

                )}
            </Droppable>
        </div>
    )
}
