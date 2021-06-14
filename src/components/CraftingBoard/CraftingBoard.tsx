import React, { useState } from 'react'

import { chunkContainer } from "../../types/chunkContainer"

import { PasteBoard, TextifyButtonContainer, WorkInProgress, PopUpBox } from "../index"

interface Props {
    chunkContainers: {
      [key: string]: chunkContainer
    }
    lineOrder: string[]
    poemAsText: string
    setChunkContainers: (arg: { [key: string]: chunkContainer}) => void
    setLineOrder: (arg: string[]) => void
    setPoemAsText: (arg: string) => void
}

export const CraftingBoard: React.FC<Props> = (props: Props) => {
  const [isPopUpDisplayed, setIsPopUpDisplayed] = useState<boolean>(false)

    const { chunkContainers, 
      lineOrder, 
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
              chunkContainer={pasteboard} />
              <WorkInProgress 
                  lineOrder={lineOrder} 
                  chunkContainers={chunkContainers} 
                  setChunkContainers={setChunkContainers}
                  setLineOrder={setLineOrder}/>
          </div>
          <TextifyButtonContainer 
          chunkContainers={chunkContainers}
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
