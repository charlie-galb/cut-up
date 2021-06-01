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
    
    return (
        <div>
            <SortableContext id={id} items={nestedChunkIDs} strategy={rectSortingStrategy}>
                <div className={droppableClass} data-testid={title} ref={setNodeRef}>
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