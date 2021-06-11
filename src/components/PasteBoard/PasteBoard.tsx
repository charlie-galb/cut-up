import React from "react"

import { DroppableArea } from "../DroppableArea/DroppableArea"

import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
}

export const PasteBoard = (props: Props) => {
   
    const { chunkContainer } = props

    return (
        <div className="pasteboard-container"> 
            <DroppableArea 
                chunkContainer={chunkContainer}
                droppableClass='unused-snippets' />
        </div>
    )
}
