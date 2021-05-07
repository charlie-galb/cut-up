import React, {useEffect } from "react"

interface Props {
    wordChunks: string[]
}

export const PasteBoard = (props: Props) => {

    const { wordChunks } = props

    return (
        <div className="pasteboard-container" >
            <ul>
                {wordChunks.map((chunk, i) => {
                    return (
                        <li key={i}>{chunk}</li>
                    )
                })}
            </ul>
        </div>
    )
}
