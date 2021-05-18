import React, { forwardRef } from 'react'

type Props = { children?: React.ReactNode}
type Ref = HTMLDivElement

export const TextSnippet = forwardRef<Ref, Props>(({children, ...props}, ref) => {
    return (
            <div {...props} ref={ref} className="text-snippet">
                {children}
            </div>      
    )
})
