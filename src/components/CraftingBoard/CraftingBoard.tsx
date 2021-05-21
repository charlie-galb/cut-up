import React from 'react'

import { chunkContainer } from "../../types/chunkContainer"

import { PasteBoard } from "../PasteBoard/PasteBoard"
import { WorkInProgress } from "../WorkInProgress/WorkInProgress"

interface Props {
    chunkContainers: {
      [key: string]: chunkContainer
    }
    lineOrder: string[]
    wordChunks: {
        [key: string]: string
      }
    activeId: string
    setChunkContainers: (arg: { [key: string]: chunkContainer}) => void
    setLineOrder: (arg: string[]) => void
}

export const CraftingBoard = (props: Props) => {

    const { chunkContainers, 
        lineOrder, 
        wordChunks, 
        activeId, 
        setChunkContainers, 
        setLineOrder} = props

        const pasteboard = chunkContainers['chunk-container-1']

    return (
        <div className="crafting-container">
            <PasteBoard 
            activeId={activeId} 
            wordChunks={wordChunks} 
            chunkContainer={pasteboard} />
            <WorkInProgress 
                activeId={activeId} 
                wordChunks={wordChunks} 
                lineOrder={lineOrder} 
                chunkContainers={chunkContainers} 
                setChunkContainers={setChunkContainers}
                setLineOrder={setLineOrder}/>
        </div>
    )
}
