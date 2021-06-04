import React, { useState } from "react"

import { DndContext, useSensor, useSensors, KeyboardSensor, MouseSensor, TouchSensor, } from '@dnd-kit/core'

import { CuttingBoard } from "../CuttingBoard/CuttingBoard"
import { CraftingBoard } from "../CraftingBoard/CraftingBoard"
import { Header } from "../Header/Header"

import { initialChunkContainers, initialLineOrder } from "../../data/initialState"
import { text } from "../../data/text"

import { removeAtIndex, insertAtIndex, arrayMove } from "../../utils/array"

import { chunkContainer } from "../../types/chunkContainer"


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

  const { para1, para2, para3 } = text

  const onDragStart = (event: any) => {
    const { active } = event
    const { id } = active
    setActiveId(id)
  }

  const onDragCancel = (event: any) => {
    setActiveId("")
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
    
    if (!over || !active) { 
      setActiveId("")
      return 
    }

    const activeContainerId = active.data.current.sortable.containerId
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
    } 

    if (activeContainerId !== overContainerId) {

      const activeChunks = activeContainer.nestedChunkIDs
      const overChunks = overContainer.nestedChunkIDs
      const activeIndex = activeChunks.indexOf(active.id)
      const overIndex = overChunks.indexOf(over.id)
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
        <p data-testid='para-1'><b>{para1}</b></p>
        <p data-testid='para-2'>{para2}</p>
        <CuttingBoard 
          chunkContainers={chunkContainers}
          setWordChunks={setWordChunks}
          setChunkContainers={setChunkContainers}/>
        <p data-testid='para-3'>{para3}</p>
        <DndContext 
          sensors={sensors}
          onDragStart={onDragStart}  
          onDragCancel={onDragCancel}
          onDragOver={onDragOver} 
          onDragEnd={onDragEnd} >
          <CraftingBoard 
            activeId={activeId} 
            wordChunks={wordChunks} 
            chunkContainers={chunkContainers} 
            lineOrder={lineOrder} 
            setChunkContainers={setChunkContainers}
            setLineOrder={setLineOrder}
            setPoemAsText={setPoemAsText}
            poemAsText={poemAsText} />
        </DndContext>
      </div>
    )

  }

export default App