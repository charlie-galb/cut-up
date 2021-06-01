import React from 'react'

export const DragDropInstructions = () => {
    return (
        <div className="drag-drop-instructions">
            <ol start={3}>
                <li>Drag and drop the snippets into the blank lines provided,
                creating whatever weird combinations you like.</li>
                <li>When you're happy with what you've made, hit the textify button. Your 
                work will appear as formatted text.</li>
                <li>And just like that, you're a poet.</li>
            </ol>
        </div>
    )
}
