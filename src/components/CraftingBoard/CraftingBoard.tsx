import React from 'react'

import { chunkContainer } from "../../types/chunkContainer"

import { PasteBoard } from "../PasteBoard/PasteBoard"
import { WorkInProgress } from "../WorkInProgress/WorkInProgress"

interface Props {
    chunkContainers: {
      [key: string]: chunkContainer
    }
    lineOrder: string[]
    addLine: (arg: void) => void
    wordChunks: {
        [key: string]: string
      }
}

export const CraftingBoard = (props: Props) => {
    return (
        <div className="crafting-container">
            <PasteBoard wordChunks={props.wordChunks} chunkContainer={props.chunkContainers['chunk-container-1']} />
            <WorkInProgress wordChunks={props.wordChunks} lineOrder={props.lineOrder} chunkContainers={props.chunkContainers} addLine={props.addLine}/>
        </div>
    )
}
