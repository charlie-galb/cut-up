import React, { forwardRef } from 'react'

type Props = { 
    style?: any
    className?: string
    text?: string
}

type Ref = HTMLDivElement

export const TextSnippet = forwardRef<Ref, Props>(({...props}, ref) => {
    const { text, style } = props
    return (
            <div {...props} ref={ref} style={style} className={"text-snippet"} >
                {text}
            </div>      
    )
})
