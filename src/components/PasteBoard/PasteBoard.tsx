import React from "react"

import { DragOverlay, useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy} from "@dnd-kit/sortable"

import { DroppableArea } from "../DroppableArea/DroppableArea"
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

    return (
        <div className="pasteboard-container"> 
            <DroppableArea 
                activeId={activeId} 
                wordChunks={wordChunks} 
                chunkContainer={chunkContainer}
                droppableClass='unused-snippets' />
        </div>
    )
}
