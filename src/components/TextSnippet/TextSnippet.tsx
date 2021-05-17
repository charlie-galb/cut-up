import React from 'react'
import {CSS} from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable"

interface Props {
    text: string
    index: number
    id: number
}

export const TextSnippet = (props: Props) => {

    const { id, index, text } = props
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: `snippet${id}`
    })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
      }
    return (
            <button className="text-snippet" ref={setNodeRef} style={style} >

            </button>      
    )
}
