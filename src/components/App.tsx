import React from "react"

import { DndContext, closestCenter } from '@dnd-kit/core'

import { CuttingBoard } from "./CuttingBoard/CuttingBoard"
import { CraftingBoard } from "./CraftingBoard/CraftingBoard"
// import { OutputBox } from "./OutputBox/OutputBox"
// import { TextifyButton } from "./TextifyButton/TextifyButton"

import { initialState } from "../data/initialState"
import { removeAtIndex, insertAtIndex, arrayMove } from "../utils/array"

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
    const { active, over } = event
    console.log(active)
    console.log(over)
    const { id } = active
    const newState = {
      ...this.state,
      activeId: id
    }
    this.setState(newState)
  }

  onDragOver = (event: any) => {
    const { active, over } = event
    const overId = over?.id

    if (!overId) { return }

    const activeContainerId = active.data.current?.sortable.containerId
    const activeContainer = this.state.chunkContainers[activeContainerId]
    const overContainerId = over.data.current?.sortable.containerId || over.id
    const overContainer = this.state.chunkContainers[overContainerId]

    if (!overContainer) { return }

    if (activeContainerId !== overContainerId) {

      const activeChunks = activeContainer.nestedChunkIDs
      const overChunks = overContainer.nestedChunkIDs
      const activeIndex = activeChunks.indexOf(active.id)
      const overIndex = 
        over.id in this.state.chunkContainers ? overChunks.length + 1 : overChunks.indexOf(over.id)
      const draggedItem = active.id
      
      this.setState(this.moveBetweenContainers(
        activeChunks,
        activeContainer, 
        activeIndex, 
        overChunks, 
        overContainer, 
        overIndex,
        draggedItem
      ))
    }
  }

  onDragEnd = (event: any) => {
    const {active, over} = event

    if (!over || !active) { return }

    const activeContainerId = active.data.current?.sortable.containerId
    const activeContainer = this.state.chunkContainers[activeContainerId]
    const overContainerId = over.data.current?.sortable.containerId || over.id
    const overContainer = this.state.chunkContainers[overContainerId]
   
    if (active.id !== over.id && activeContainerId === overContainerId) {

      const items = activeContainer.nestedChunkIDs
      const activeIndex = items.indexOf(active.id);
      const overIndex = items.indexOf(over.id);
      const sortedItems = arrayMove(items, activeIndex, overIndex)
      const newState = {
        ...this.state,
        chunkContainers: {
          ...this.state.chunkContainers,
          [activeContainerId]: {
            ...activeContainer,
            nestedChunkIDs: sortedItems
          }
        },
        activeId: "",
        overId: ""
      }
      this.setState(newState)
      return  
    } 

    if (activeContainerId !== overContainerId) {
      console.log("Different box")
      const activeChunks = activeContainer.nestedChunkIDs
      const overChunks = overContainer.nestedChunkIDs
      const activeIndex = activeChunks.indexOf(active.id)
      const overIndex = 
        over.id in this.state.chunkContainers ? overChunks.length + 1 : overChunks.indexOf(over.id)
      const draggedItem = active.id
      
      this.setState(this.moveBetweenContainers(
        activeChunks,
        activeContainer, 
        activeIndex, 
        overChunks, 
        overContainer, 
        overIndex,
        draggedItem
      ))
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

  moveBetweenContainers = (
    activeChunks: string[],
    activeContainer: chunkContainer,
    activeIndex: number,
    overChunks: string[],
    overContainer: chunkContainer,
    overIndex: number,
    item: string
  ) => {
    return {
      ...this.state,
      chunkContainers: {
        ...this.state.chunkContainers,
        [activeContainer.id]: {
          ...activeContainer,
          nestedChunkIDs: removeAtIndex(activeChunks, activeIndex)
        },
        [overContainer.id]: {
          ...overContainer,
          nestedChunkIDs: insertAtIndex(overChunks, overIndex, item)
        }
      }
    }
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
          <DndContext onDragStart={this.onDragStart}  onDragOver={this.onDragOver} onDragEnd={this.onDragEnd} >
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