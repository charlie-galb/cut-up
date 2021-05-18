import React from 'react'
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable"

interface Props {
    text: string
    index: number
    id: string
}

export const TextSnippet = (props: Props) => {

    const { id, index, text } = props
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: id
    })
    const returnTransition = () => {
        if (transition) { return transition }
        return undefined
    }
    const style = {
        transform: CSS.Transform.toString(transform),
        transition: returnTransition(),
      }
    return (
            <button className="text-snippet" ref={setNodeRef} style={style} {...attributes} {...listeners}>
                { text }
            </button>      
    )
}
