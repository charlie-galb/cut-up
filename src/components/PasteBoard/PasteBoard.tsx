import React from "react"

import { chunkContainer } from "../../types/chunkContainer"
import { DroppableArea } from "../index"

interface Props {
    chunkContainer: chunkContainer
}

export const PasteBoard: React.FC<Props> = (props: Props) => {
   
    const { chunkContainer } = props

    return (
        <div className="pasteboard-container"> 
            <DroppableArea 
                chunkContainer={chunkContainer}
                droppableClass='unused-snippets' />
        </div>
    )
}
