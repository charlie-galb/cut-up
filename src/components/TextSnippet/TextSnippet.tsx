import React from 'react'

interface Props {
    text: string
}

export const TextSnippet = (props: Props) => {
    return (
        <div role="snippet">{props.text}</div>
    )
}
