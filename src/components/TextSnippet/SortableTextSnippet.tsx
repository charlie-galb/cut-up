import React from 'react'
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable"

import { TextSnippet } from "./TextSnippet"

interface Props {
    text: string
    index: number
    id: string
}

export const SortableTextSnippet = (props: Props) => {

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
            <TextSnippet ref={setNodeRef} {...attributes} {...listeners}>
                { text }
            </TextSnippet>      
    )
}