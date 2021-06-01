import React, { useState } from 'react'

import { chunkContainer } from "../../types/chunkContainer"

import { PasteBoard } from "../PasteBoard/PasteBoard"
import { TextifyButtonContainer } from "../TextifyButtonContainer/TextifyButtonContainer"
import { WorkInProgress } from "../WorkInProgress/WorkInProgress"
import { PopUpBox } from "../PopUpBox/PopUpBox"

interface Props {
    chunkContainers: {
      [key: string]: chunkContainer
    }
    lineOrder: string[]
    wordChunks: {
        [key: string]: string
      }
    activeId: string
    poemAsText: string
    setChunkContainers: (arg: { [key: string]: chunkContainer}) => void
    setLineOrder: (arg: string[]) => void
    setPoemAsText: (arg: string) => void
}

export const CraftingBoard = (props: Props) => {
  const [isPopUpDisplayed, setIsPopUpDisplayed] = useState<boolean>(false)

    const { chunkContainers, 
      lineOrder, 
      wordChunks, 
      activeId, 
      setChunkContainers, 
      setLineOrder,
      setPoemAsText,
      poemAsText} = props

    const pasteboard = chunkContainers['chunk-container-1']

    const togglePopUp = () => {
      setIsPopUpDisplayed(!isPopUpDisplayed)
    }

    return (
        <div className="crafting-background">
          <div className="crafting-container">
              <PasteBoard 
              activeId={activeId} 
              wordChunks={wordChunks} 
              chunkContainer={pasteboard} />
              <WorkInProgress 
                  activeId={activeId} 
                  wordChunks={wordChunks} 
                  lineOrder={lineOrder} 
                  chunkContainers={chunkContainers} 
                  setChunkContainers={setChunkContainers}
                  setLineOrder={setLineOrder}/>
          </div>
          <TextifyButtonContainer 
          chunkContainers={chunkContainers}
          wordChunks={wordChunks} 
          lineOrder={lineOrder} 
          setPoemAsText={setPoemAsText} 
          displayPopUp={togglePopUp}/>
          {isPopUpDisplayed && <PopUpBox 
            handleClose={togglePopUp}>
            {poemAsText}
            </PopUpBox>
          }
        </div>
    )
}
