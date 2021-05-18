import React from 'react'

import { DragOverlay } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy} from "@dnd-kit/sortable"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { SortableTextSnippet } from "../TextSnippet/SortableTextSnippet"
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
    activeId: string
}

export const WorkInProgress = (props: Props) => {

    const { chunkContainers, lineOrder, addLine, wordChunks, activeId } = props
    const { id, title, nestedChunkIDs } = chunkContainers["chunk-container-2"]

    const handleLineAdding = () => {
        addLine()
    }

    return (
        // <SortableContext id={id} items={nestedChunkIDs} strategy={horizontalListSortingStrategy}>
        //     <div className="wip-container">
        //         <div className="line" data-testid={title} >
        //             {nestedChunkIDs?.map((id, i) => {
        //                 return (
        //                     <TextSnippet data-testid="snippet" key={id} id={id} index={i} text={wordChunks[id]}/>
        //                 )
        //             })}
        //         </div>
        //         <div className="lines-container">
        //             {lineOrder?.map((lineId, i) => {
        //                 return (
        //                     <Line key={i} wordChunks={wordChunks} chunkContainer={chunkContainers[lineId]}/>
        //                 )
        //             })}
        //         </div>
        //         <button data-testid="add-line-btn" className="add-line-btn" onClick={handleLineAdding} >Add line</button>
        //     </div>
        // </SortableContext>
        <div> 
            <SortableContext id={id} items={nestedChunkIDs} strategy={rectSortingStrategy}>
                <div className="wip-container" data-testid="unused-snippets" >
                    {nestedChunkIDs?.map((ID, i) => {
                        return (
                            <SortableTextSnippet data-testid="snippet" key={ID} id={ID} index={i} text={wordChunks[ID]}/>
                        )
                    })}
                </div>
            </SortableContext>
            <DragOverlay>
                {activeId ? <TextSnippet>{wordChunks[activeId]}</TextSnippet> : null}
            </DragOverlay>
        </div>
    )
}
