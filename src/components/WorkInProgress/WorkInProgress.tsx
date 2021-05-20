import React from 'react'

import { DragOverlay, useDroppable } from "@dnd-kit/core"
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
    const { setNodeRef } = useDroppable({ id });
    const handleLineAdding = () => {
        addLine()
    }

    return (
        // <SortableContext id={id} items={nestedChunkIDs} strategy={horizontalListSortingStrategy}>
        //     <div className="wip-container">
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
        <div className="wip-container"> 
            <SortableContext id={id} items={nestedChunkIDs} strategy={rectSortingStrategy}>
                <div className="wip-snippets" data-testid="unused-snippets" ref={setNodeRef}>
                    {nestedChunkIDs?.map((ID, i) => {
                        return (
                            <SortableTextSnippet data-testid="snippet" key={ID} id={ID} index={i} text={wordChunks[ID]}/>
                        )
                    })}
                </div>
            </SortableContext>
            <DragOverlay dropAnimation={null}>
                {activeId ? <TextSnippet text={wordChunks[activeId]}/> : null}
            </DragOverlay>
        </div>
    )
}
