import React from "react"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
}

export const PasteBoard = (props: Props) => {
   
    const { chunkContainer } = props
    const { id, nestedChunks } = chunkContainer
    const {isOver, setNodeRef } = useDroppable({
        id: id
    })
    const style = {
        color: isOver ? 'green' : undefined
    }
    const chunkIds = nestedChunks.map((chunk) => {
        return `${chunk.id}`
    })

    return (
        <SortableContext items={chunkIds} strategy={verticalListSortingStrategy}>
            <div className="unused-snippets" style={style} data-testid="unused-snippets" 
                ref={setNodeRef}>
                {nestedChunks?.map((chunk, i) => {
                    return (
                        <TextSnippet data-testid="snippet" key={chunk.id} id={chunk.id} index={i} text={chunk.text}/>
                    )
                })}
            </div>
        </SortableContext>
    )
}
