import React, { useState } from 'react'

import { CutButton } from "../CutButton/CutButton"
import { shuffle } from "../../utils/array"
import { chunkContainer } from "../../types/chunkContainer"

interface Props {
    chunkContainers: {[key: string]: chunkContainer}
    setChunkContainers: (arg: {[key: string]: chunkContainer}) => void
    setWordChunks: (arg: { [key: string]: string }) => void
}

export const CuttingBoard = (props: Props) => {
    
    const { setChunkContainers, setWordChunks, chunkContainers } = props
    const [source1Text, setSource1Text] = useState("")
    const [source2Text, setSource2Text] = useState("")
    const [source3Text, setSource3Text] = useState("")

    const combineText = (textArr: string[]) => {
        textArr = textArr.filter(item => item)
        let combinedText: string = ""
        let endPoint = textArr.length
        for(let i = 0; i < endPoint; i++) {
            if (textArr[i] && i != endPoint -1) {
                combinedText += (textArr[i] + " ")
            } else if (textArr[i]) {
                combinedText += textArr[i]
            }
        }
        return combinedText
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
        newPasteBoard.nestedChunkIDs = shuffle(newPasteBoardIDs)
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
                <textarea data-testid="cutting-text-area1" className="cutting-text-area 1" cols={10} rows={4} placeholder="Paste your text sources here" value={source1Text} onChange={handleSource1TextChange}/>
                <textarea data-testid="cutting-text-area2" className="cutting-text-area 2" cols={10} rows={4} placeholder="Paste your text sources here" value={source2Text} onChange={handleSource2TextChange}/>
                <textarea data-testid="cutting-text-area3" className="cutting-text-area 3" cols={10} rows={4} placeholder="Paste your text sources here" value={source3Text} onChange={handleSource3TextChange}/>
            </div>
            <CutButton handleCallback={handleCutting} />
        </div>
    )
}
