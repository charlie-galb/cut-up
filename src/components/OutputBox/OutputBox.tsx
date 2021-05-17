import React from 'react'

interface Props {
    poem: string
}

export const OutputBox = (props: Props) => {
    const { poem } = props
    return (
        <div data-testid="output-box" className="output-box">
            <p>{poem}</p>
        </div>
    )
}
