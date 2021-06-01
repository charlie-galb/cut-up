import React from 'react'

import { Line } from "../Line/Line"
import { AddLineButtonContainer } from "../AddLineButtonContainer/AddLineButtonContainer"
import { RemoveLineButtonContainer } from "../RemoveLineButtonContainer/RemoveLineButtonContainer"

import { chunkContainer } from "../../types/chunkContainer"

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

export const WorkInProgress = (props: Props) => {

    const { chunkContainers, 
        lineOrder, 
        wordChunks, 
        activeId, 
        setChunkContainers, 
        setLineOrder } = props

    return (
        <div className="wip-container"> 
            <div className="lines-container">
                {lineOrder?.map((lineId, i) => {
                    return (
                        <Line key={i} activeId={activeId} wordChunks={wordChunks} chunkContainer={chunkContainers[lineId]}/>
                    )
                })}
            </div>
            <AddLineButtonContainer 
                lineOrder={lineOrder} 
                chunkContainers={chunkContainers} 
                setChunkContainers={setChunkContainers}
                setLineOrder={setLineOrder}/>
            <RemoveLineButtonContainer 
                lineOrder={lineOrder} 
                chunkContainers={chunkContainers} 
                setChunkContainers={setChunkContainers}
                setLineOrder={setLineOrder}/>
        </div>
    )
}
