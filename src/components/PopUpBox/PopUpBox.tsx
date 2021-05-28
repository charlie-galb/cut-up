import React from 'react'

interface Props {
    handleClose: () => void
    children: string
}

export const PopUpBox = (props: Props) => {
    const { handleClose, children } = props
    return (
        <div className="pop-up-container"> 
            <div className="pop-up-box">
                <div className="icon-bar">
                    <span className="close-icon" onClick={handleClose}>X</span>
                </div>
                <div className="text-container">
                    <p>{children}</p>
                </div>
            </div>
        </div>
    )
}
