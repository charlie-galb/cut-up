import React from 'react'

import { Droppable } from "react-beautiful-dnd"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunk } from "../../types/chunk"

interface Props {
    poemChunks: chunk[]
}

export const WorkInProgress = (props: Props) => {

    const { poemChunks } = props

    return (
        <div className="wip-container">
            <Droppable droppableId="wip" direction="horizontal">
                {provided => (
                <div data-testid="wip-snippets" 
                className="wip-snippets"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                    {poemChunks?.map((chunk, i) => {
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
