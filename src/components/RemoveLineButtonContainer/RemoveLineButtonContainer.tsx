import React from 'react'
import { FaMinus } from 'react-icons/fa'

import { chunkContainer } from "../../types/chunkContainer"
import { Button } from "../index"

interface Props {
    chunkContainers: {
      [key: string]: chunkContainer
    }
    lineOrder: string[]
    setChunkContainers: (arg: { [key: string]: chunkContainer}) => void
    setLineOrder: (arg: string[]) => void
}

export const RemoveLineButtonContainer: React.FC<Props> = (props: Props) => {

    const { lineOrder, chunkContainers, setLineOrder, setChunkContainers } = props

    const removeLine = () => {
        const lineId = lineOrder[lineOrder.length - 1]
        const chunks = chunkContainers[lineId].chunks
        const newLineOrder = lineOrder
        newLineOrder.pop()
        const pasteboard = chunkContainers['chunk-container-1']
        const newChunkContainers = chunkContainers
        delete newChunkContainers[lineId]
        setChunkContainers({
            ...newChunkContainers,
        [pasteboard.id]: {
                ...pasteboard,
                chunks: [...pasteboard.chunks, ...chunks]
            }
        })
        setLineOrder(newLineOrder)
      }

    return (
        <div>
            <Button testId="remove-line-btn" className="btn secondary-btn remove-line-btn" handleCallback={removeLine} ><FaMinus /></Button>
        </div>
    )
}
