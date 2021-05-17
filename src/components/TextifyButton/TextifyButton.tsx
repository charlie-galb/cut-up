import React from 'react'

interface Props {
    outputToText: () => void
}

export const TextifyButton = (props: Props) => {
    const { outputToText } = props
    return (
        <div data-testid="textify-container" className="textify-container">
            <button data-testid="textify-btn" className="textify-btn" onClick={outputToText}>textify</button>
        </div>
    )
}
