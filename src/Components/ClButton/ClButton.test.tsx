import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import ClButton from './ClButton'

describe('Button', () => {
    it('should render the correct text', () => {
        render(
            <ClButton type="button">
                <span>Texto del boton</span>
            </ClButton>,
        )

        const textButton = screen.queryByText(/Texto del boton/i)

        expect(textButton).toBeInTheDocument()
    })

    it('should trigger onClick function passed', () => {
        const clickFunction = jest.fn()

        render(
            <ClButton type="button" onClick={clickFunction}>
                <span>Texto del boton</span>
            </ClButton>,
        )

        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(clickFunction).toHaveBeenCalled()
    })
})
