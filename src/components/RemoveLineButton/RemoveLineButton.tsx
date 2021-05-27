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

export const RemoveLineButton = (props: Props) => {

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
            <button data-testid="remove-line-btn" className="add-line-btn" onClick={removeLine} >Remove line</button>
        </div>
    )
}
