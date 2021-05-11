import React from 'react'

import { Droppable } from "react-beautiful-dnd"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
}

export const WorkInProgress = (props: Props) => {

    const { chunkContainer } = props
    const { id, nestedChunks } = chunkContainer

    return (
        <div className="wip-container">
            <Droppable droppableId={id} direction="horizontal">
                {provided => (
                <div data-testid="wip-snippets" 
                className="wip-snippets"
                {...provided.droppableProps}
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
