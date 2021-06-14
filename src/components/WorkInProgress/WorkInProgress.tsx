import React from 'react'

import { chunkContainer } from "../../types/chunkContainer"
import { DroppableArea, 
    AddLineButtonContainer, 
    RemoveLineButtonContainer } from "../index"

interface Props {
    chunkContainers: {
      [key: string]: chunkContainer
    }
    lineOrder: string[]
    setChunkContainers: (arg: { [key: string]: chunkContainer}) => void
    setLineOrder: (arg: string[]) => void
}

export const WorkInProgress: React.FC<Props> = (props: Props) => {

    const { chunkContainers, 
        lineOrder, 
        setChunkContainers, 
        setLineOrder } = props

    return (
        <div className="wip-container"> 
            <div className="lines-container">
                {lineOrder?.map((lineId, i) => {
                    return (
                        <DroppableArea 
                            key={i} 
                            chunkContainer={chunkContainers[lineId]}
                            droppableClass='line'/>
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
