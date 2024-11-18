import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import App from '../../App'
import renderWithProviders from '../../test/renderWithProviders'

const fetchMock = jest.fn()
global.fetch = fetchMock

const mockResponse = [
    {
        title: 'Prueba de Title',
        userId: 50,
        body: 'Prueba de Body',
        id: 5,
    },
    {
        title: 'Post que vamos a Editar',
        userId: 100,
        body: 'Body del Post que vamos a Editar',
        id: 10,
    },
]

describe('Edition Post User', () => {
    it('Should call edit endpoint with the correct parameters', async () => {
        const mockFetch = Promise.resolve({
            json: () => Promise.resolve(mockResponse),
        })

        fetchMock.mockImplementation(() => mockFetch)
        renderWithProviders(<App />)

        await screen.findByText(/Prueba de Title/i)

        const editButton = screen.getAllByRole('button', { name: 'Editar' })[1]

        fireEvent.click(editButton)

        await screen.findByRole('heading', { name: 'Editar Post' })

        const title = await screen.findByRole('textbox', { name: 'title' })
        const body = await screen.findByRole('textbox', { name: 'body' })

        const submmitButton = await screen.findByRole('button', {
            name: 'Guardar',
        })

        fireEvent.change(title, { target: { value: 'Nuevo Titulo' } })
        fireEvent.change(body, { target: { value: 'Nuevo Body' } })

        const newUserPost = {
            title: 'Nuevo Titulo',
            body: 'Nuevo Body',
            userId: 100,
            id: 10,
        }

        fireEvent.click(submmitButton)

        expect(fetch).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/edit',
            { method: 'UPDATE', body: JSON.stringify(newUserPost) },
        )
    })

    it('Should show a error notification when the call goes wrong', async () => {
        const mockFetch = Promise.resolve({
            json: () => Promise.resolve(mockResponse),
        })

        const mockFetchEdit = Promise.reject()

        fetchMock.mockImplementationOnce(() => mockFetch)
        fetchMock.mockImplementationOnce(() => mockFetchEdit)
        renderWithProviders(<App />)

        await screen.findByText(/Prueba de Title/i)

        const editButton = screen.getAllByRole('button', { name: 'Editar' })[1]

        fireEvent.click(editButton)

        await screen.findByRole('heading', { name: 'Editar Post' })

        const title = await screen.findByRole('textbox', { name: 'title' })
        const body = await screen.findByRole('textbox', { name: 'body' })

        const submmitButton = await screen.findByRole('button', {
            name: 'Guardar',
        })

        fireEvent.change(title, { target: { value: 'Nuevo Titulo' } })
        fireEvent.change(body, { target: { value: 'Nuevo Body' } })

        const newUserPost = {
            title: 'Nuevo Titulo',
            body: 'Nuevo Body',
            userId: 100,
            id: 10,
        }

        fireEvent.click(submmitButton)

        const notificationError = await screen.findByText(
            /Error al editar el Post, intentelo de nuevo/i,
        )

        expect(notificationError).toBeInTheDocument()

        expect(fetch).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/edit',
            { method: 'UPDATE', body: JSON.stringify(newUserPost) },
        )
    })
})
