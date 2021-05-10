import React, { useState } from "react"
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { CuttingBoard } from "./CuttingBoard/CuttingBoard"
import { PasteBoard } from "./PasteBoard/PasteBoard"
import { WorkInProgress } from "./WorkInProgress/WorkInProgress"
import { chunk } from "../types/chunk"

export const App = () => {

  const [chosenText, setChosenText] = useState<chunk[]>([])
  const [snippedText, setSnippedText] = useState<chunk[]>([])

  const snipText = (text: string) => {
    const temp = text.split(" ")
    const result: Array<chunk> = []
    let id_acc = 1
    for(let i = 0; i < temp.length; i = i + 2 ) {
      const chunk: chunk = { id: id_acc, text: temp.slice(i,i+2).join(' ')}
      result.push(chunk)
      id_acc++
    }
    setSnippedText(result)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    } else if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) {
      return; 
    } else if (
      result.source.droppableId === result.destination.droppableId && 
      result.destination.droppableId === "snippet-bank"
    ) {
      const newChunks = snippedText;
      const draggedItem = newChunks[result.source.index]
      newChunks.splice(result.source.index, 1);
      newChunks.splice(result.destination.index, 0, draggedItem);
      setSnippedText(newChunks);
    } else if (
      result.source.droppableId === result.destination.droppableId && 
      result.destination.droppableId === "wip"
    ) {
      const newChosen = chosenText;
      const draggedItem = newChosen[result.source.index]
      newChosen.splice(result.source.index, 1);
      newChosen.splice(result.destination.index, 0, draggedItem);
      setChosenText(newChosen);
    } else {
      const newChunks = snippedText;
      const updatedPoem = chosenText
      const draggedItem = newChunks[result.source.index]
      newChunks.splice(result.source.index, 1);
      updatedPoem.splice(result.destination.index, 0, draggedItem);
      setSnippedText(newChunks);
      setChosenText(updatedPoem);
    }
  }

  return (
    <div>
      <h1 data-testid="test-header">Cut-up App</h1>
      <CuttingBoard snipText={snipText}/>
      <DragDropContext onDragEnd={onDragEnd}>
        <PasteBoard wordChunks={snippedText} />
        <WorkInProgress poemChunks={chosenText} />
      </DragDropContext>
    </div>
    
  )
}
