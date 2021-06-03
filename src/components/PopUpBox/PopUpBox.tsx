import React from 'react'

interface Props {
    handleClose: () => void
    children: string
}

export const PopUpBox = (props: Props) => {
    const { handleClose, children } = props
    return (
        <div className="pop-up-container"> 
            <div data-testid="pop-up-box" className="pop-up-box">
                <div className="icon-bar">
                    <span data-testid="close-icon" className="close-icon" onClick={handleClose}>X</span>
                </div>
                <div className="text-container">
                    <p data-testid="pop-up-text">{children}</p>
                </div>
            </div>
        </div>
    )
}
