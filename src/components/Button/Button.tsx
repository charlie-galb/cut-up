import React from 'react'

interface Props {
    handleCallback: (event: React.MouseEvent<HTMLButtonElement>) => void
    testId: string
    className: string
    children: string | SVGAElement
}

export const Button: React.FC<Props> = (props: Props) => {
    const { handleCallback, className, testId, children } = props
    return (
        <button className={className} data-testid={testId} onClick={handleCallback}>
            {children}
        </button>
    )
}
