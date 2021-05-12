import React from 'react'

import { chunkContainer } from "../../types/chunkContainer"

import { PasteBoard } from "../PasteBoard/PasteBoard"
import { WorkInProgress } from "../WorkInProgress/WorkInProgress"

interface Props {
    chunkContainers: {
      [key: string]: chunkContainer
    }
  }

export const CraftingBoard = (props: Props) => {
    return (
        <div style={{display: "flex", flexDirection: "row", width: "80%", zIndex: -14 }}>
            <PasteBoard chunkContainer={props.chunkContainers['chunk-container-1']} />
            <WorkInProgress chunkContainer={props.chunkContainers['chunk-container-2']} />
        </div>
    )
}