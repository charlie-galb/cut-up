import React from 'react'
import { Draggable } from "react-beautiful-dnd"

interface Props {
    text: string
    id: string
    index: number
}

export const TextSnippet: React.FC<Props> = (props: Props) => {

    const { id, text, index } = props

    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided) => {
                return (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="text-snippet"
                >
                    {text}
                </div>
                );
            }}
        </Draggable>
    )
}