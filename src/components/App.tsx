import React from "react"

import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { CuttingBoard } from "./CuttingBoard/CuttingBoard"
import { CraftingBoard } from "./CraftingBoard/CraftingBoard"
// import { OutputBox } from "./OutputBox/OutputBox"
// import { TextifyButton } from "./TextifyButton/TextifyButton"

import { initialState } from "../data/initialState"

import { chunkContainer } from "../types/chunkContainer"


export class App extends React.Component {
  state = initialState

  addLine = () => {
    const lineNumber = this.state.lineOrder.length + 1
    const containerNumber = lineNumber + 2
    const Id = `chunk-container-${containerNumber}`
    const title = `line-${lineNumber}`
    const newLine: chunkContainer = {
      id: Id,
      title: title,
      nestedChunkIDs: []
    }
    const newLineOrder = [...this.state.lineOrder, Id]
    const newState = {
      ...this.state,
      chunkContainers: {
        ...this.state.chunkContainers,
        [Id]: newLine
      },
      lineOrder: newLineOrder
    }
    this.setState(newState)
  }

  snipText = (text: string) => {
    const temp = text.split(" ")
    const newChunks: {[key: string]: string} = {}
    const newPasteBoardIDs: string[] = []
    let id_acc = 1
    for(let i = 0; i < temp.length; i = i + 2 ) {
      const id = `snippet${id_acc}`
      const text = temp.slice(i,i+2).join(' ')
      const unformattedText = this._removePunctuation(text.toLowerCase())
      newChunks[id] = unformattedText
      newPasteBoardIDs.push(id)
      id_acc++
    }

    const newPasteBoard = this.state.chunkContainers['chunk-container-1']
    newPasteBoard.nestedChunkIDs = newPasteBoardIDs

    const newState = {
      ...this.state, 
      chunkContainers: {
        ...this.state.chunkContainers,
        [newPasteBoard.id]: newPasteBoard
      },
      wordChunks: newChunks
    } 
    this.setState(newState)
  }

  _removePunctuation = (string: string) => {
    return string.replace(/[^\w\s]|_/g, "")
         .replace(/\s+/g, " ");
  }

  onDragEnd = (event: any) => {
    const {active, over} = event
  
    if (active.id !== over.id) {
      console.log("active")
      console.log(active)
      console.log("over")
      console.log(over)
      const oldContainer = this.state.chunkContainers["chunk-container-1"]
      const newChunks = oldContainer.nestedChunkIDs
      const oldIndex = newChunks.indexOf(active.id);
      const newIndex = newChunks.indexOf(over.id);
      const draggedItem = newChunks[oldIndex]
      console.log(newChunks)
      newChunks.splice(oldIndex, 1);
      newChunks.splice(newIndex, 0, draggedItem);
      console.log(newChunks)
      const newContainer = {
            ...oldContainer,
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
    // if (!destination) {
    //   return
    // } 
    
    // if (
    //   source.droppableId === destination.droppableId &&
    //   source.index === destination.index
    // ) {
    //   return; 
    // } 

    // const dragStart = this.state.chunkContainers[source.droppableId]
    // const dragEnd = this.state.chunkContainers[destination.droppableId]
    
    // if (dragStart === dragEnd) {
    //   const newChunks = Array.from(dragStart.nestedChunks)
    //   const draggedItem = dragStart.nestedChunks[source.index]
    //   newChunks.splice(source.index, 1);
    //   newChunks.splice(destination.index, 0, draggedItem);

    //   const newContainer = {
    //     ...dragStart,
    //     nestedChunks: newChunks
    //   }

    //   const newState = {
    //     ...this.state,
    //     chunkContainers: {
    //       ...this.state.chunkContainers,
    //       [newContainer.id]: newContainer
    //     }
    //   }

    //   this.setState(newState)
    //   return  
    // } 
    
    // const startChunks = Array.from(dragStart.nestedChunks)
    // const draggedItem = dragStart.nestedChunks[source.index]
    // startChunks.splice(source.index, 1)
    // const newStart = {
    //   ...dragStart,
    //   nestedChunks: startChunks
    // }

    // const endChunks = Array.from(dragEnd.nestedChunks)
    // endChunks.splice(destination.index, 0, draggedItem)
    // const newEnd = {
    //   ...dragEnd,
    //   nestedChunks: endChunks
    // }

    // const newState = {
    //   ...this.state,
    //   chunkContainers: {
    //     ...this.state.chunkContainers,
    //     [newStart.id]: newStart,
    //     [newEnd.id]: newEnd
    //   }
    // }
    // this.setState(newState)
  }

  onDragOver = (event: any) => {
    
  }

  outputToText = () => {
      let combinedText = ""
      const lines = this.state.lineOrder
      const dictionary = this.state.wordChunks
      lines.forEach((lineId) => {
        let lineText = ""
        this.state.chunkContainers[lineId].nestedChunkIDs.forEach((id) => {
          lineText += (dictionary[id] + " ")
        })
        combinedText += (lineText + "\n")
      })
      const newState = {
        ...this.state,
        poemAsText: combinedText
      }
      this.setState(newState)
  }

  render() {
    return (
      <div className="app-container">
        <div className="content-container">
          <h1 data-testid="test-header">Cut-up App</h1>
          <CuttingBoard snipText={this.snipText}/>
          <DndContext onDragEnd={this.onDragEnd} collisionDetection={closestCenter}>
            <CraftingBoard wordChunks={this.state.wordChunks} chunkContainers={this.state.chunkContainers} lineOrder={this.state.lineOrder} addLine={this.addLine} />
          </DndContext>
          {/* <TextifyButton outputToText={this.outputToText} />
          <OutputBox poem={this.state.poemAsText} /> */}
        </div>
      </div>
    )
  }
}

export default App