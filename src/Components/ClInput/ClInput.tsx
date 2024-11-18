import React from 'react'

import './ClInput.css'

type Props = {
    value: string | number
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    label: string
    disabled?: boolean
}

function ClInput({ label, name, onChange, value, disabled }: Props) {
    return (
        <label className="clInput">
            {label}
            <input
                className="clInput__input"
                name={name}
                aria-label={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </label>
    )
}
export default ClInput
