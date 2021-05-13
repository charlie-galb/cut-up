import React, { useState } from 'react'

interface Props {
    snipText: (arg: string) => void
}

export const CuttingBoard = (props: Props) => {
    
    const { snipText } = props
    const [sourceText, setSourceText] = useState("")
    
    const handleCutting = () => {
        snipText(sourceText)
    }

    const handleSourceTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target
        setSourceText(value)
    }

    return (
        <div className="cutting-container">
            <textarea data-testid="cutting-text-area" className="cutting-text-area" cols={10} rows={4} placeholder="Paste your text sources here" value={sourceText} onChange={handleSourceTextChange}/>
            <button data-testid="cut-btn" className="cut-btn" onClick={handleCutting} >Cut up</button>
        </div>
    )
}
