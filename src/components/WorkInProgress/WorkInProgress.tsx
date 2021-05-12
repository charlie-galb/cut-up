import React from 'react'

import { Droppable } from "react-beautiful-dnd"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { Line } from "../Line/Line"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
}

export const WorkInProgress = (props: Props) => {

    const { chunkContainer } = props

    return (
        <div className="wip-container">
            <Line chunkContainer={chunkContainer}/>
        </div>
    )
}
