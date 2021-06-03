import React from 'react'

import { Button } from "../Button/Button"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainers: {
      [key: string]: chunkContainer
    }
    lineOrder: string[]
    setChunkContainers: (arg: { [key: string]: chunkContainer}) => void
    setLineOrder: (arg: string[]) => void
}

export const RemoveLineButtonContainer = (props: Props) => {

    const { lineOrder, chunkContainers, setLineOrder, setChunkContainers } = props

    const removeLine = () => {
        const lineId = lineOrder[lineOrder.length - 1]
        const chunkIDs = chunkContainers[lineId].nestedChunkIDs
        const newLineOrder = lineOrder
        newLineOrder.pop()
        const pasteboard = chunkContainers['chunk-container-1']
        const newChunkContainers = chunkContainers
        delete newChunkContainers[lineId]
        setChunkContainers({
            ...newChunkContainers,
        [pasteboard.id]: {
                ...pasteboard,
                nestedChunkIDs: [...pasteboard.nestedChunkIDs, ...chunkIDs]
            }
        })
        setLineOrder(newLineOrder)
      }

    return (
        <div>
            <Button testId="remove-line-btn" className="btn add-line-btn" handleCallback={removeLine} >-</Button>
        </div>
    )
}
