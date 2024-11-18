import React from 'react'

import './ClButton.css'

type Props = {
    children: string | JSX.Element | JSX.Element[]
    onClick?: () => void
    type: 'submit' | 'button'
}

function ClButton({ children, onClick, type }: Props) {
    return (
        <button onClick={onClick} type={type} className="button">
            {children}
        </button>
    )
}
export default ClButton
