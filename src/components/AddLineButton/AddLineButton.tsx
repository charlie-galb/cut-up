import React from 'react'

import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainers: {
      [key: string]: chunkContainer
    }
    lineOrder: string[]
    setChunkContainers: (arg: { [key: string]: chunkContainer}) => void
    setLineOrder: (arg: string[]) => void
}

export const AddLineButton = (props: Props) => {

    const { lineOrder, chunkContainers, setLineOrder, setChunkContainers } = props

    const addLine = () => {
        const lineNumber = lineOrder.length + 1
        const containerNumber = lineNumber + 2
        const Id = `chunk-container-${containerNumber}`
        const title = `line-${lineNumber}`
        const newLine: chunkContainer = {
          id: Id,
          title: title,
          nestedChunkIDs: []
        }
        const newLineOrder = [...lineOrder, Id]
        const newChunkContainers = {
            ...chunkContainers,
            [Id]: newLine
          }
        setChunkContainers(newChunkContainers)
        setLineOrder(newLineOrder)
      }

    return (
        <div>
            <button data-testid="add-line-btn" className="add-line-btn" onClick={addLine} >Add line</button>
        </div>
    )
}
