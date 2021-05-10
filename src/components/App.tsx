import React, { useState } from "react"
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { CuttingBoard } from "./CuttingBoard/CuttingBoard"
import { PasteBoard } from "./PasteBoard/PasteBoard"

export const App = () => {

  const [snippedText, setSnippedText] = useState<string[]>([""])

  const snipText = (text: string) => {
    const temp = text.split(" ")
    const result: Array<string> = []
    for(let i = 0; i < temp.length; i = i + 2 ) {
      result.push(temp.slice(i,i+2).join(' '))
    }
    setSnippedText(result)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) {
      return; 
    }
    const newChunks = snippedText;
    const draggedItem = newChunks[result.source.index]
    newChunks.splice(result.source.index, 1);
    newChunks.splice(result.destination.index, 0, draggedItem);
    setSnippedText(newChunks);
  }

  return (
    <div>
      <h1 data-testid="test-header">Cut-up App</h1>
      <CuttingBoard snipText={snipText}/>
      <DragDropContext onDragEnd={onDragEnd}>
        <PasteBoard wordChunks={snippedText} />
      </DragDropContext>
    </div>
    
  )
}
