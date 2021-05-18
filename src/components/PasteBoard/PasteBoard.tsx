import React from "react"

import { SortableContext, rectSortingStrategy} from "@dnd-kit/sortable"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
    wordChunks: {
        [key: string]: string
      }
}

export const PasteBoard = (props: Props) => {
   
    const { chunkContainer, wordChunks } = props
    const { id, nestedChunkIDs } = chunkContainer

    return (
        <SortableContext id={id} items={nestedChunkIDs} strategy={rectSortingStrategy}>
            <div className="unused-snippets" data-testid="unused-snippets" >
                {nestedChunkIDs?.map((ID, i) => {
                    return (
                        <TextSnippet data-testid="snippet" key={ID} id={ID} index={i} text={wordChunks[ID]}/>
                    )
                })}
            </div>
        </SortableContext>
    )
}
