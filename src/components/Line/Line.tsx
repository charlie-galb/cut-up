import React from 'react'

import { useDroppable } from "@dnd-kit/core"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainer: chunkContainer
}

export const Line = (props: Props) => {

    const { chunkContainer } = props
    const { id, title, nestedChunks } = chunkContainer
    const {isOver, setNodeRef } = useDroppable({
        id: id
    })
    const style = {
        color: isOver ? 'green' : undefined
    }

    return (
        <div className="line" style={style} data-testid={title} ref={setNodeRef}>
            {nestedChunks?.map((chunk, i) => {
                return (
                    <TextSnippet data-testid="snippet" key={chunk.id} id={chunk.id} index={i} text={chunk.text}/>
                )
            })}
        </div>
    )
}
