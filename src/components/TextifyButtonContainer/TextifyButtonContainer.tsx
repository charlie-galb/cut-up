import React from 'react'

import { Button } from "../Button/Button"

import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    setPoemAsText: (string: string) => void
    displayPopUp: () => void
    lineOrder: string[]
    chunkContainers: { [key: string]: chunkContainer}
}

export const TextifyButtonContainer = (props: Props) => {
    const { setPoemAsText, 
            displayPopUp, 
            lineOrder, 
            chunkContainers } = props

    const outputToText = () => {
        setPoemAsText(formatText())
        displayPopUp()
      }

    const formatText = () => {
        let combinedText = ""
        lineOrder.forEach((lineId) => {
          let lineText = ""
          chunkContainers[lineId].chunks.forEach((chunk) => {
            lineText += (chunk.text + " ")
          })
          combinedText += (lineText + "\n")
        })
        return combinedText
    }
    return (
        <div data-testid="textify-button-container" className="textify-button-container">
            <Button testId="textify-btn" className="btn textify-btn" handleCallback={outputToText}>Textify</Button>
        </div>
    )
}
