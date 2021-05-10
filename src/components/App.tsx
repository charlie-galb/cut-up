import React, { useState } from "react"

import { CuttingBoard } from "./CuttingBoard/CuttingBoard"
import { PasteBoard } from "./PasteBoard/PasteBoard"

export const App = () => {

  const [snippedText, setSnippedText] = useState<string[]>([""])

  const snipText = (text: string) => {
    const temp = text.split(" ")
    const result: Array<string> = []
    for(let i = 0; i < temp.length; i = i + 2 ) {
      result.push(temp.slice(i,i+2).join(' '))
    }
    setSnippedText(result)
  }

  return (
    <div>
      <h1 data-testid="test-header">Cut-up App</h1>
      <CuttingBoard snipText={snipText}/>
      <PasteBoard wordChunks={snippedText} />
    </div>
    
  )
}
