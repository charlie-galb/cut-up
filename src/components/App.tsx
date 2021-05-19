import React from "react"

import { DndContext, closestCenter } from '@dnd-kit/core'

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

  onDragStart = (event: any) => {
    const { active } = event
    const { id } = active
    const newState = {
      ...this.state,
      activeId: id
    }
    this.setState(newState)
  }

  onDragEnd = (event: any) => {
    const {active, over} = event

    if (!over || !active) { 
      return 
    }

    const from = active.data.current?.sortable.containerId
    const fromContainer = this.state.chunkContainers[from]
    const to = over.data.current?.sortable.containerId || over.id
    const toContainer = this.state.chunkContainers[to]
   
    if (active.id !== over.id && from === to) {
      console.log("Same box")
      const newChunks = fromContainer.nestedChunkIDs
      const oldIndex = newChunks.indexOf(active.id);
      const newIndex = newChunks.indexOf(over.id);
      const draggedItem = newChunks[oldIndex]
      newChunks.splice(oldIndex, 1);
      newChunks.splice(newIndex, 0, draggedItem);
      const newContainer = {
            ...fromContainer,
            nestedChunks: newChunks
          }
      const newState = {
        ...this.state,
        chunkContainers: {
          ...this.state.chunkContainers,
          [newContainer.id]: newContainer
        },
        activeId: ""
      }
      this.setState(newState)
      this.resetActiveId()
      this.resetOverId()
      return  
    } 

    if (to !== from) {
      console.log("Different box")
      const fromChunks = fromContainer.nestedChunkIDs
      const toChunks = toContainer.nestedChunkIDs
      const fromIndex = fromChunks.indexOf(active.id)
      const toIndex = 
        over.id in this.state.chunkContainers ? toChunks.length + 1 : toChunks.indexOf(over.id)
      const draggedItem = fromChunks[fromIndex]
      fromChunks.splice(fromIndex, 1);
      toChunks.splice(toIndex, 0, draggedItem);

      const newFromContainer = {
        ...fromContainer,
        nestedChunkIDs: fromChunks
      }

      const newToContainer = {
        ...toContainer,
        nestedChunkIDs: toChunks
      }
      
      const newState = {
        ...this.state,
        chunkContainers: {
          ...this.state.chunkContainers,
          from: newFromContainer,
          over: newToContainer
        }
      }
      this.setState(newState)
      this.resetActiveId()
      this.resetOverId()
      return 
    }
    this.resetActiveId()
    this.resetOverId()
  }

  resetActiveId = () => {
    const newState = {
      ...this.state,
      activeId: ""
    }
    this.setState(newState)
  }

  resetOverId = () => {
    const newState = {
      ...this.state,
      activeId: ""
    }
    this.setState(newState)
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
          <DndContext onDragStart={this.onDragStart}  onDragEnd={this.onDragEnd} collisionDetection={closestCenter}>
            <CraftingBoard activeId={this.state.activeId} wordChunks={this.state.wordChunks} chunkContainers={this.state.chunkContainers} lineOrder={this.state.lineOrder} addLine={this.addLine} />
          </DndContext>
          {/* <TextifyButton outputToText={this.outputToText} />
          <OutputBox poem={this.state.poemAsText} /> */}
        </div>
      </div>
    )
  }
}

export default App