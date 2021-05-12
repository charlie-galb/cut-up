import React from "react"

import { Droppable } from "react-beautiful-dnd"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
}

export const PasteBoard = (props: Props) => {

    const { chunkContainer } = props
    const { id, nestedChunks } = chunkContainer

    return (
        <div className="pasteboard-container" >
            <Droppable droppableId={id} direction="horizontal">
                {provided => (
                <div className="unused-snippets" data-testid="unused-snippets" {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {nestedChunks?.map((chunk, i) => {
                        return (
                            <TextSnippet data-testid="snippet" key={chunk.id} id={chunk.id} index={i} text={chunk.text}/>
                        )
                    })}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </div>
    )
}
