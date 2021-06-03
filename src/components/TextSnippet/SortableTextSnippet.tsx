import React from 'react'
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable"

import { TextSnippet } from "./TextSnippet"

interface Props {
    text: string
    id: string
}

export const SortableTextSnippet = (props: Props) => {

    const { id, text } = props
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: id
    })
    const returnTransition = () => {
        if (transition) { return transition }
        return undefined
    }
    const style = {
        transform: CSS.Translate.toString(transform),
        transition: returnTransition()
      }
    return (
        <div >
            <TextSnippet ref={setNodeRef} text={text} style={style} {...attributes} {...listeners} />
        </div>
    )
}