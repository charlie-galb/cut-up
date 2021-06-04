import React from "react"

import { DragOverlay, useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy} from "@dnd-kit/sortable"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { SortableTextSnippet } from "../TextSnippet/SortableTextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
    wordChunks: {
        [key: string]: string
      }
    activeId: string
    droppableClass: string
}

export const DroppableArea = (props: Props) => {
    const { chunkContainer, wordChunks, activeId, droppableClass } = props
    const { id, title, nestedChunkIDs } = chunkContainer
    const { setNodeRef } = useDroppable({ id });

    const uniqueIDs = Array.from(new Set(nestedChunkIDs)) ;
    
    return (
        <div>
            <SortableContext id={id} items={uniqueIDs} strategy={rectSortingStrategy}>
                <div className={droppableClass} data-testid={title} ref={setNodeRef}>
                    {uniqueIDs?.map((id, i) => {
                        return (
                            <SortableTextSnippet data-testid={id} key={id} id={id} text={wordChunks[id]}/>
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