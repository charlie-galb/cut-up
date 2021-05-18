import React from 'react'

import { SortableContext, horizontalListSortingStrategy} from "@dnd-kit/sortable"

import { Line } from "../Line/Line"
import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

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

export const WorkInProgress = (props: Props) => {

    const { chunkContainers, lineOrder, addLine, wordChunks } = props
    const { id, title, nestedChunkIDs } = chunkContainers["chunk-container-2"]

    const handleLineAdding = () => {
        addLine()
    }

    return (
        <SortableContext id={id} items={nestedChunkIDs} strategy={horizontalListSortingStrategy}>
            <div className="wip-container">
                <div className="line" data-testid={title} >
                    {nestedChunkIDs?.map((id, i) => {
                        return (
                            <TextSnippet data-testid="snippet" key={id} id={id} index={i} text={wordChunks[id]}/>
                        )
                    })}
                </div>
                {/* <div className="lines-container">
                    {lineOrder?.map((lineId, i) => {
                        return (
                            <Line key={i} wordChunks={wordChunks} chunkContainer={chunkContainers[lineId]}/>
                        )
                    })}
                </div> */}
                <button data-testid="add-line-btn" className="add-line-btn" onClick={handleLineAdding} >Add line</button>
            </div>
        </SortableContext>
    )
}
