import React from 'react'

interface Props {
    handleCallback: (event: any) => void
}

export const CutButton = (props: Props) => {
    const { handleCallback } = props
    return (
        <button data-testid="cut-btn" className="cut-btn" onClick={handleCallback}>
            Cut up
        </button>
    )
}
