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
}

export const PasteBoard = (props: Props) => {
   
    const { chunkContainer, wordChunks, activeId } = props
    const { id, nestedChunkIDs } = chunkContainer
    const { setNodeRef } = useDroppable({ id });

    return (
        <div className="pasteboard-container"> 
            <SortableContext id={id} items={nestedChunkIDs} strategy={rectSortingStrategy}>
                <div className="unused-snippets" data-testid="unused-snippets" ref={setNodeRef}>
                    {nestedChunkIDs?.map((ID, i) => {
                        return (
                            <SortableTextSnippet data-testid="snippet" key={ID} id={ID} index={i} text={wordChunks[ID]}/>
                        )
                    })}
                </div>
            </SortableContext>
            <DragOverlay dropAnimation={null}>
                {activeId ? <TextSnippet/> : null}
            </DragOverlay>
        </div>
    )
}
