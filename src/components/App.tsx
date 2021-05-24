import React, { useState } from "react"

import { DndContext, useSensor, useSensors, KeyboardSensor, MouseSensor, TouchSensor, } from '@dnd-kit/core'

import { CuttingBoard } from "./CuttingBoard/CuttingBoard"
import { CraftingBoard } from "./CraftingBoard/CraftingBoard"
import { Header } from "./Header/Header"
import { OutputBox } from "./OutputBox/OutputBox"
import { Intro } from "./Intro/Intro"

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

    return (
      <div className="app-container">
        <Header />
        <Intro />
        <CuttingBoard 
          chunkContainers={chunkContainers}
          setWordChunks={setWordChunks}
          setChunkContainers={setChunkContainers}/>
        <DndContext 
          sensors={sensors}
          onDragStart={onDragStart}  
          onDragOver={onDragOver} 
          onDragEnd={onDragEnd} >
          <CraftingBoard 
            activeId={activeId} 
            wordChunks={wordChunks} 
            chunkContainers={chunkContainers} 
            lineOrder={lineOrder} 
            setChunkContainers={setChunkContainers}
            setLineOrder={setLineOrder}
            setPoemAsText={setPoemAsText}/>
        </DndContext>
        <OutputBox poem={poemAsText} />
      </div>
    )

  }

export default App