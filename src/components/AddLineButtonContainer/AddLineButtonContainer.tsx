import React from 'react'
import { FaPlus } from 'react-icons/fa'

import { Button } from "../index"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainers: {
      [key: string]: chunkContainer
    }
    lineOrder: string[]
    setChunkContainers: (arg: { [key: string]: chunkContainer}) => void
    setLineOrder: (arg: string[]) => void
}

export const AddLineButtonContainer: React.FC<Props> = (props: Props) => {

    const { lineOrder, chunkContainers, setLineOrder, setChunkContainers } = props

    const addLine = () => {
        const lineNumber = lineOrder.length + 1
        const containerNumber = lineNumber + 2
        const Id = `chunk-container-${containerNumber}`
        const title = `line-${lineNumber}`
        const newLine: chunkContainer = {
          id: Id,
          title: title,
          chunks: []
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
            <Button testId="add-line-btn" className="btn secondary-btn add-line-btn" handleCallback={addLine} ><FaPlus /></Button>
        </div>
    )
}
