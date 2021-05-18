import React from 'react'

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy} from "@dnd-kit/sortable"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
    wordChunks: {
        [key: string]: string
      }
}

export const Line = (props: Props) => {

    const { chunkContainer, wordChunks } = props
    const { id, title, nestedChunkIDs } = chunkContainer
    const {isOver, setNodeRef } = useDroppable({
        id: id
    })
    const style = {
        color: isOver ? 'green' : undefined
    }

    return (
        <SortableContext id={id} items={nestedChunkIDs} strategy={horizontalListSortingStrategy}>
            <div className="line" style={style} data-testid={title} ref={setNodeRef}>
                {nestedChunkIDs?.map((id, i) => {
                    return (
                        <TextSnippet data-testid="snippet" key={id} id={id} index={i} text={wordChunks[id]}/>
                    )
                })}
            </div>
        </SortableContext>
    )
}
