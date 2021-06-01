import React from 'react'

interface Props {
    handleCallback: (event: any) => void
    testId: string
    className: string
    children: string
}

export const Button = (props: Props) => {
    const { handleCallback, className, testId, children } = props
    return (
        <button className={className} data-testid={testId} onClick={handleCallback}>
            {children}
        </button>
    )
}
