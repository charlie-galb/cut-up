import React, { useState } from 'react'

import { shuffle } from "../../utils/array"
import { chunk } from "../../types/chunk"
import { chunkContainer } from "../../types/chunkContainer"
import { Button } from "../index"

interface Props {
    chunkContainers: {[key: string]: chunkContainer}
    setChunkContainers: (arg: {[key: string]: chunkContainer}) => void
}

export const CuttingBoard: React.FC<Props> = (props: Props) => {
    
    const { setChunkContainers, chunkContainers } = props
    const [source1Text, setSource1Text] = useState("")
    const [source2Text, setSource2Text] = useState("")
    const [source3Text, setSource3Text] = useState("")

    const combineText = (textArr: string[]) => {
        textArr = textArr.filter(item => item)
        let combinedText = ""
        for(let i = 0; i < textArr.length; i++) {
            if (textArr[i] && i != textArr.length -1) {
                combinedText += (textArr[i] + " ")
            } else if (textArr[i]) {
                combinedText += textArr[i]
            }
        }
        return combinedText
    }

    const snipText = (text: string) => {
        resetChunkContainers()
        const temp = text.split(" ")
        const newChunks: chunk[] = []
        let id_acc = 1
        for(let i = 0; i < temp.length; i = i + 2 ) {
          const id = `snippet${id_acc}`
          const text = temp.slice(i,i+2).join(' ')
          const unformattedText = removePunctuation(text.toLowerCase())
          const chunk = {
              id: id, 
              text: unformattedText
          }
          newChunks.push(chunk)
          id_acc++
        }
        const newPasteBoard = chunkContainers['chunk-container-1']
        newPasteBoard.chunks = shuffle(newChunks)
        setChunkContainers({
            ...chunkContainers,
              [newPasteBoard.id]: newPasteBoard
            })
      }

    const removePunctuation = (string: string) => {
    return string.replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, " ");
    }

    const resetChunkContainers = () => {
        const emptyContainers = chunkContainers
        for (const key in emptyContainers) {
            emptyContainers[key].chunks = []
        }
        setChunkContainers(emptyContainers)
    }
    
    const handleCutting = () => {
        const textArr = [source1Text, source2Text, source3Text]
        const combinedText = combineText(textArr)
        snipText(combinedText)
    }

    const handleSource1TextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target
        setSource1Text(value)
    }

    const handleSource2TextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target
        setSource2Text(value)
    }

    const handleSource3TextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target
        setSource3Text(value)
    }

    return (
        <div className="cutting-container">
            <div className='text-area-container'>
                <textarea data-testid="cutting-text-area1" className="cutting-text-area 1" cols={10} rows={4} placeholder="Paste some text here, e.g. a bible verse" value={source1Text} onChange={handleSource1TextChange}/>
                <textarea data-testid="cutting-text-area2" className="cutting-text-area 2" cols={10} rows={4} placeholder="Paste some wildly different text here, e.g. something from an intruction manual" value={source2Text} onChange={handleSource2TextChange}/>
                <textarea data-testid="cutting-text-area3" className="cutting-text-area 3" cols={10} rows={4} placeholder="Paste some other text here, e.g. a paragraph from a news article" value={source3Text} onChange={handleSource3TextChange}/>
            </div>
            <Button testId="cut-btn" className="btn primary-btn cut-btn" handleCallback={handleCutting} >Cut up</ Button>
        </div>
    )
}
