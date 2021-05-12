import React from "react"
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { CuttingBoard } from "./CuttingBoard/CuttingBoard"
import { CraftingBoard } from "./CraftingBoard/CraftingBoard"
import { chunk } from "../types/chunk"
import { initialState } from "./initialState"

export class App extends React.Component {
  state = initialState

  snipText = (text: string) => {
    const temp = text.split(" ")
    const result: Array<chunk> = []
    let id_acc = 1
    for(let i = 0; i < temp.length; i = i + 2 ) {
      const chunk: chunk = { id: id_acc, text: temp.slice(i,i+2).join(' ')}
      result.push(chunk)
      id_acc++
    }

    const newPasteBoard = this.state.chunkContainers['chunk-container-1']
    newPasteBoard.nestedChunks = result

    const newState = {
      ...this.state, 
      chunkContainers: {
        ...this.state.chunkContainers,
        [newPasteBoard.id]: newPasteBoard
      }
    } 
    this.setState(newState)
  }

  onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    } 
    
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; 
    } 

    const dragStart = this.state.chunkContainers[source.droppableId]
    const dragEnd = this.state.chunkContainers[destination.droppableId]
    
    if (dragStart === dragEnd) {
      const newChunks = Array.from(dragStart.nestedChunks)
      const draggedItem = dragStart.nestedChunks[source.index]
      newChunks.splice(source.index, 1);
      newChunks.splice(destination.index, 0, draggedItem);

      const newContainer = {
        ...dragStart,
        nestedChunks: newChunks
      }

      const newState = {
        ...this.state,
        chunkContainers: {
          ...this.state.chunkContainers,
          [newContainer.id]: newContainer
        }
      }

      this.setState(newState)
      return  
    } 
    
    const startChunks = Array.from(dragStart.nestedChunks)
    const draggedItem = dragStart.nestedChunks[source.index]
    startChunks.splice(source.index, 1)
    const newStart = {
      ...dragStart,
      nestedChunks: startChunks
    }

    const endChunks = Array.from(dragEnd.nestedChunks)
    endChunks.splice(destination.index, 0, draggedItem)
    const newEnd = {
      ...dragEnd,
      nestedChunks: endChunks
    }

    const newState = {
      ...this.state,
      chunkContainers: {
        ...this.state.chunkContainers,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <div>
        <h1 data-testid="test-header">Cut-up App</h1>
        <CuttingBoard snipText={this.snipText}/>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <CraftingBoard chunkContainers={this.state.chunkContainers}/>
        </DragDropContext>
      </div>
    )
  }
}

export default App