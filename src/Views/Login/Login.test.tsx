import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import App from '../../App'
import renderWithProviders from '../../test/renderWithProviders'

describe('Login', () => {
    it('should show the correct notification when the form is subbmited', async () => {
        renderWithProviders(<App />)

        const loginLink = screen.getByRole('link', { name: 'Login' })

        fireEvent.click(loginLink)

        await screen.findByRole('heading', { name: 'Login' })

        const emailInput = screen.getByRole('textbox', { name: 'email' })
        const passwordInput = screen.getByLabelText(/password/i)

        fireEvent.change(emailInput, { target: { value: 'prueba@email.com' } })
        fireEvent.change(passwordInput, { target: { value: '******' } })

        const submitButton = screen.getByRole('button', { name: 'Log In' })

        fireEvent.click(submitButton)

        const notificationText = screen.getByText(
            'Login con usuario prueba@email.com incorrecto',
        )

        expect(notificationText).toBeInTheDocument()
    })
})
