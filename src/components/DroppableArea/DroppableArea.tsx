import React from "react"
import { Droppable } from "react-beautiful-dnd"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
    droppableClass: string
}

export const DroppableArea = (props: Props) => {
    const { chunkContainer, droppableClass } = props
    const { id, title, chunks } = chunkContainer
    
    return (
        <div>
            <Droppable droppableId={id} direction="horizontal">
            {(provided) => (
                <div 
                className={droppableClass} 
                data-testid={title}
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
                {chunks?.map((chunk, i) => {
                    const { text, id} = chunk
                    return (
                        <TextSnippet data-testid={id} key={id} id={id} index={i} text={text}/>
                    )
                })}
                {provided.placeholder}
            </div>
            )}
            </Droppable>
        </div>
    )
}