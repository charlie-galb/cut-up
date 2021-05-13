import React from 'react'

import { Line } from "../Line/Line"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainers: {
        [key: string]: chunkContainer
      }
    lineOrder: string[]
    addLine: (arg: void) => void
}

export const WorkInProgress = (props: Props) => {

    const { chunkContainers, lineOrder, addLine } = props

    const handleLineAdding = () => {
        addLine()
    }

    return (
        <div className="wip-container">
            <div className="lines-container">
                {lineOrder?.map((lineId, i) => {
                    return (
                        <Line key={i} chunkContainer={chunkContainers[lineId]}/>
                    )
                })}
            </div>
            <button data-testid="add-line-btn" className="add-line-btn" onClick={handleLineAdding} >Add line</button>
        </div>
    )
}
