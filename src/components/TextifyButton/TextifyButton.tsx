import React from 'react'

import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    setPoemAsText: (string: string) => void
    displayPopUp: () => void
    lineOrder: string[]
    wordChunks: { [key: string]: string }
    chunkContainers: { [key: string]: chunkContainer}
}

export const TextifyButton = (props: Props) => {
    const { setPoemAsText, displayPopUp, lineOrder, wordChunks, chunkContainers } = props

    const outputToText = () => {
        setPoemAsText(formatText())
        displayPopUp()
      }

    const formatText = () => {
        let combinedText = ""
        lineOrder.forEach((lineId) => {
          let lineText = ""
          chunkContainers[lineId].nestedChunkIDs.forEach((id) => {
            lineText += (wordChunks[id] + " ")
          })
          combinedText += (lineText + "\n")
        })
        return combinedText
    }
    return (
        <div data-testid="textify-container" className="textify-container">
            <button data-testid="textify-btn" className="btn textify-btn" onClick={outputToText}>textify</button>
        </div>
    )
}
