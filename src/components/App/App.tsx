import React, { useState } from "react"

import { DragDropContext } from 'react-beautiful-dnd'

import { CuttingBoard } from "../CuttingBoard/CuttingBoard"
import { CraftingBoard } from "../CraftingBoard/CraftingBoard"
import { Header } from "../Header/Header"

import { initialChunkContainers, initialLineOrder } from "../../data/initialState"
import { text } from "../../data/text"

import { removeAtIndex, insertAtIndex } from "../../utils/array"

import { chunkContainer } from "../../types/chunkContainer"


export const App = () => {
  const [chunkContainers, setChunkContainers] = useState<{ [key: string]: chunkContainer}>(initialChunkContainers)
  const [lineOrder, setLineOrder] = useState<string[]>(initialLineOrder)
  const [poemAsText, setPoemAsText] = useState<string>("")

  const { para1, para2, para3 } = text

  const onDragEnd = (result: any) => {
    
    if (!result.destination) { 
      return 
    }

    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) {
      return; 
    }

    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index !== result.destination.index
    ) {
      const newChunkContainer = chunkContainers[result.source.droppableId]
      const newChunks = newChunkContainer.chunks
      const draggedItem = newChunks[result.source.index]
      console.log(draggedItem)
      console.log(newChunks)
      removeAtIndex(newChunks, result.source.index);
      console.log(newChunkContainer.chunks)
      insertAtIndex(newChunks, result.destination.index, draggedItem);
      console.log(newChunkContainer.chunks)
      newChunkContainer.chunks = newChunks
      setChunkContainers({
        ...chunkContainers,
        [newChunkContainer.id]: newChunkContainer
      }); 
    }

    const sourceContainer = chunkContainers[result.source.droppableId]
    const destContainer = chunkContainers[result.destination.droppableId]
    const draggedItem = sourceContainer.chunks[result.source.index]
    sourceContainer.chunks.splice(result.source.index, 1);
    destContainer.chunks.splice(result.destination.index, 0, draggedItem);
    setChunkContainers({
      ...chunkContainers,
      [result.source.droppableId]: sourceContainer,
      [result.destination.droppableId]: destContainer,
    }); 
  }

    return (
      <div className="app-container">
        <Header />
        <p data-testid='para-1'><b>{para1}</b></p>
        <p data-testid='para-2'>{para2}</p>
        <CuttingBoard 
          chunkContainers={chunkContainers}
          setChunkContainers={setChunkContainers}/>
        <p data-testid='para-3'>{para3}</p>
        <DragDropContext 
          onDragEnd={onDragEnd} >
          <CraftingBoard 
            chunkContainers={chunkContainers} 
            lineOrder={lineOrder} 
            setChunkContainers={setChunkContainers}
            setLineOrder={setLineOrder}
            setPoemAsText={setPoemAsText}
            poemAsText={poemAsText} />
        </DragDropContext>
      </div>
    )

  }

export default App