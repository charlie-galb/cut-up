import React, { useState } from "react"

import { DndContext, useSensor, useSensors, KeyboardSensor, MouseSensor, TouchSensor, } from '@dnd-kit/core'

import { CuttingBoard } from "./CuttingBoard/CuttingBoard"
import { CraftingBoard } from "./CraftingBoard/CraftingBoard"
import { OutputBox } from "./OutputBox/OutputBox"
import { TextifyButton } from "./TextifyButton/TextifyButton"

import { initialChunkContainers, initialLineOrder } from "../data/initialState"
import { removeAtIndex, insertAtIndex, arrayMove } from "../utils/array"

import { chunkContainer } from "../types/chunkContainer"


export const App = () => {
  const [activeId, setActiveId] = useState<string>("")
  const [wordChunks, setWordChunks] = useState< { [key: string]: string } >({})
  const [chunkContainers, setChunkContainers] = useState<{ [key: string]: chunkContainer}>(initialChunkContainers)
  const [lineOrder, setLineOrder] = useState<string[]>(initialLineOrder)
  const [poemAsText, setPoemAsText] = useState<string>("")

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const addLine = () => {
    const lineNumber = lineOrder.length + 1
    const containerNumber = lineNumber + 2
    const Id = `chunk-container-${containerNumber}`
    const title = `line-${lineNumber}`
    const newLine: chunkContainer = {
      id: Id,
      title: title,
      nestedChunkIDs: []
    }
    const newLineOrder = [...lineOrder, Id]
    const newChunkContainers = {
        ...chunkContainers,
        [Id]: newLine
      }
    setChunkContainers(newChunkContainers)
    setLineOrder(newLineOrder)
  }

  const snipText = (text: string) => {
    const temp = text.split(" ")
    const newWordChunks: {[key: string]: string} = {}
    const newPasteBoardIDs: string[] = []
    let id_acc = 1
    for(let i = 0; i < temp.length; i = i + 2 ) {
      const id = `snippet${id_acc}`
      const text = temp.slice(i,i+2).join(' ')
      const unformattedText = removePunctuation(text.toLowerCase())
      newWordChunks[id] = unformattedText
      newPasteBoardIDs.push(id)
      id_acc++
    }
    const newPasteBoard = chunkContainers['chunk-container-1']
    newPasteBoard.nestedChunkIDs = newPasteBoardIDs
    const newChunkContainers = {
      ...chunkContainers,
        [newPasteBoard.id]: newPasteBoard
      }
    setChunkContainers(newChunkContainers)
    setWordChunks(newWordChunks)
  }

  const removePunctuation = (string: string) => {
    return string.replace(/[^\w\s]|_/g, "")
         .replace(/\s+/g, " ");
  }

  const onDragStart = (event: any) => {
    const { active } = event
    const { id } = active
    setActiveId(id)
  }

  const onDragOver = (event: any) => {
    const { active, over } = event
    const overId = over?.id

    if (!overId) { return }

    const activeContainerId: string = active.data.current.sortable.containerId
    const activeContainer: chunkContainer = chunkContainers[activeContainerId]
    const overContainerId: string = over.data.current?.sortable.containerId || over.id
    const overContainer: chunkContainer = chunkContainers[overContainerId]

    if (!overContainer) { return }

    if (activeContainerId !== overContainerId) {

      const activeChunks = activeContainer.nestedChunkIDs
      const overChunks = overContainer.nestedChunkIDs
      const activeIndex = activeChunks.indexOf(active.id)
      const overIndex = 
        over.id in chunkContainers ? overChunks.length + 1 : overChunks.indexOf(over.id)
      const draggedItem = active.id
      
      setChunkContainers(moveBetweenContainers(
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

  const onDragEnd = (event: any) => {
    const {active, over} = event

    if (!over || !active) { return }

    const activeContainerId = active.data.current?.sortable.containerId
    const activeContainer = chunkContainers[activeContainerId]
    const overContainerId = over.data.current?.sortable.containerId || over.id
    const overContainer = chunkContainers[overContainerId]
   
    if (active.id !== over.id && activeContainerId === overContainerId) {

      const items = activeContainer.nestedChunkIDs
      const activeIndex = items.indexOf(active.id);
      const overIndex = items.indexOf(over.id);
      const sortedItems = arrayMove(items, activeIndex, overIndex)
      setChunkContainers({
        ...chunkContainers,
          [activeContainerId]: {
            ...activeContainer,
            nestedChunkIDs: sortedItems
          }
        })
      setActiveId("")
      return  
    } 

    if (activeContainerId !== overContainerId) {
      console.log("Different box")
      const activeChunks = activeContainer.nestedChunkIDs
      const overChunks = overContainer.nestedChunkIDs
      const activeIndex = activeChunks.indexOf(active.id)
      const overIndex = 
        over.id in chunkContainers ? overChunks.length + 1 : overChunks.indexOf(over.id)
      const draggedItem = active.id
      
      setChunkContainers(moveBetweenContainers(
        activeChunks,
        activeContainer, 
        activeIndex, 
        overChunks, 
        overContainer, 
        overIndex,
        draggedItem
      ))
      setActiveId("")
      return 
    }
    setActiveId("")
  }

  const moveBetweenContainers = (
    activeChunks: string[],
    activeContainer: chunkContainer,
    activeIndex: number,
    overChunks: string[],
    overContainer: chunkContainer,
    overIndex: number,
    item: string
  ) => {
    return {
      ...chunkContainers,
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

    const outputToText = () => {
      let combinedText = ""
      const lines = lineOrder
      lines.forEach((lineId) => {
        let lineText = ""
        chunkContainers[lineId].nestedChunkIDs.forEach((id) => {
          lineText += (wordChunks[id] + " ")
        })
        combinedText += (lineText + "\n")
      })
      setPoemAsText(combinedText)
    }

    return (
      <div className="app-container">
        <div className="content-container">
          <h1 data-testid="test-header">Cut-up App</h1>
          <CuttingBoard snipText={snipText}/>
          <DndContext 
            sensors={sensors}
            onDragStart={onDragStart}  
            onDragOver={onDragOver} 
            onDragEnd={onDragEnd} >
            <CraftingBoard activeId={activeId} wordChunks={wordChunks} chunkContainers={chunkContainers} lineOrder={lineOrder} addLine={addLine} />
          </DndContext>
          <TextifyButton outputToText={outputToText} />
          <OutputBox poem={poemAsText} />
        </div>
      </div>
    )

  }

export default App