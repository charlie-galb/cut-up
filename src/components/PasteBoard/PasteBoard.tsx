import React, {useEffect } from "react"

import { Droppable } from "react-beautiful-dnd"

import { TextSnippet } from "../TextSnippet/TextSnippet"
import { chunk } from "../../types/chunk"

interface Props {
    wordChunks: chunk[]
}

export const PasteBoard = (props: Props) => {

    const { wordChunks } = props

    return (
        <div className="pasteboard-container" >
            <Droppable droppableId="snippet-bank" direction="horizontal">
                {provided => (
                <div className="unused-snippets" data-testid="unused-snippets" {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {wordChunks?.map((chunk, i) => {
                        return (
                            <TextSnippet data-testid="snippet" key={chunk.id} id={chunk.id} index={i} text={chunk.text}/>
                        )
                    })}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </div>
    )
}
