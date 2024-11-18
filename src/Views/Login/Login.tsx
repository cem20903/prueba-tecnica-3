import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

import './Login.css'
import { addNotification } from '../../store/postSlice'

function Login() {
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()

    function onSendLogin(event: React.FormEvent) {
        event.preventDefault()

        dispatch(
            addNotification({
                message: `Login con usuario ${email.current?.value} incorrecto`,
                type: 'error',
            }),
        )
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <div>
                <form onSubmit={onSendLogin} className="login--form">
                    <label htmlFor="email-field">Correo</label>
                    <input
                        id="email-field"
                        type="text"
                        name="email"
                        aria-label="email"
                        className="login--input"
                        ref={email}
                        placeholder="Introduzca su correo"
                        required
                    />
                    <label htmlFor="password-field">Password</label>
                    <input
                        id="password-field"
                        type="password"
                        name="password"
                        aria-label="password"
                        className="login--input"
                        placeholder="Introduzca su contraseña"
                        ref={password}
                        required
                    />
                    <button className="login--button" type="submit">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
