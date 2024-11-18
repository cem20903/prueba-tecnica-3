import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

function Menu() {
    const [checked, setChecked] = useState<boolean>(false)

    function closeMenu() {
        setChecked(false)
    }

    return (
        <header className="header">
            <span className="header__logo">Cleverpy</span>
            <input
                className="header__side-menu"
                type="checkbox"
                id="side-menu"
                onChange={(event) => setChecked(event.target.checked)}
                checked={checked}
            />
            <label className="header__hamburguer-icon" htmlFor="side-menu">
                <span className="header__hamburguer-line"></span>
            </label>
            <nav className="header__menu">
                <ul className="header__submenu" onClick={closeMenu}>
                    <li>
                        <Link to={`login`}>Login</Link>
                    </li>
                    <li>
                        <Link to={`/`}>Posts</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Menu
