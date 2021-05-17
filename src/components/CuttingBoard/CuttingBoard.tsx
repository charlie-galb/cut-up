import React, { useState } from 'react'

interface Props {
    snipText: (arg: string) => void
}

export const CuttingBoard = (props: Props) => {
    
    const { snipText } = props
    const [source1Text, setSource1Text] = useState("")
    const [source2Text, setSource2Text] = useState("")
    const [source3Text, setSource3Text] = useState("")
    
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

    return (
        <div className="cutting-container">
            <div className='text-area-container'>
                <textarea data-testid="cutting-text-area1" className="cutting-text-area 1" cols={10} rows={4} placeholder="Paste your text sources here" value={source1Text} onChange={handleSource1TextChange}/>
                <textarea data-testid="cutting-text-area2" className="cutting-text-area 2" cols={10} rows={4} placeholder="Paste your text sources here" value={source2Text} onChange={handleSource2TextChange}/>
                <textarea data-testid="cutting-text-area3" className="cutting-text-area 3" cols={10} rows={4} placeholder="Paste your text sources here" value={source3Text} onChange={handleSource3TextChange}/>
            </div>
            <button data-testid="cut-btn" className="cut-btn" onClick={handleCutting} >Cut up</button>
        </div>
    )
}
