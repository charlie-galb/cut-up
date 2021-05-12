import React from 'react'

import { Droppable } from "react-beautiful-dnd"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { Line } from "../Line/Line"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainers: {
        [key: string]: chunkContainer
      }
    lineOrder: string[]
}

export const WorkInProgress = (props: Props) => {

    const { chunkContainers, lineOrder } = props

    return (
        <div className="wip-container">
            {lineOrder?.map((lineId, i) => {
                return (
                    <Line key={i} chunkContainer={chunkContainers[lineId]}/>
                )
            })}
        </div>
    )
}
