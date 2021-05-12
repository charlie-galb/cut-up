import React from 'react'

import { Droppable } from "react-beautiful-dnd"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
}

export const Line = (props: Props) => {

    const { chunkContainer } = props
    const { id, title, nestedChunks } = chunkContainer

    return (
        <div>
            <Droppable droppableId={id} direction="horizontal">
                {provided => (
                <div className="line" data-testid={title} {...provided.droppableProps}
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
