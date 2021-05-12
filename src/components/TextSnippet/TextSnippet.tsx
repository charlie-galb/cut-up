import React from 'react'

import { Draggable } from "react-beautiful-dnd"

interface Props {
    text: string
    index: number
    id: number
}

export const TextSnippet = (props: Props) => {
    return (
        <Draggable draggableId={`snippet${props.id}`} index={props.index}>
            {provided => (
                <div 
                className="text-snippet"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                    {props.text}
                </div>
            )}
        </Draggable>
    )
}