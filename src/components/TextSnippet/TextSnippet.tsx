import React, { forwardRef } from 'react'

type Props = { 
    style?: any
    className?: string
    text?: string
}

type Ref = HTMLButtonElement

export const TextSnippet = forwardRef<Ref, Props>(({...props}, ref) => {
    const { text, style } = props
    return (
            <button {...props} ref={ref} style={style} className="text-snippet" >
                {text}
            </button>      
    )
})
