import React from 'react'

import { DragOverlay, useDroppable } from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy} from "@dnd-kit/sortable"


import { TextSnippet } from "../TextSnippet/TextSnippet"
import { SortableTextSnippet } from "../TextSnippet/SortableTextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
    wordChunks: {
        [key: string]: string
      }
      activeId: string
}

export const Line = (props: Props) => {

    const { chunkContainer, wordChunks, activeId } = props
    const { id, title, nestedChunkIDs } = chunkContainer
    const {isOver, setNodeRef } = useDroppable({
        id: id
    })
    const style = {
        color: isOver ? 'green' : undefined
    }

    return (
        <div style={style}>
            <SortableContext id={id} items={nestedChunkIDs} strategy={horizontalListSortingStrategy}>
                <div className="line" data-testid={title} ref={setNodeRef}>
                    {nestedChunkIDs?.map((id, i) => {
                        return (
                            <SortableTextSnippet data-testid="snippet" key={id} id={id} index={i} text={wordChunks[id]}/>
                        )
                    })}
                </div>
            </SortableContext>
            <DragOverlay dropAnimation={null}>
            {activeId ? <TextSnippet text={wordChunks[activeId]}/> : null}
            </DragOverlay>
        </div>
    )
}
