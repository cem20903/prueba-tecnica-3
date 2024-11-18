import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import App from '../../App'
import renderWithProviders from '../../test/renderWithProviders'

const fetchMock = jest.fn()
global.fetch = fetchMock

describe('List post users', () => {
    it('Should show the user post info when the app render', async () => {
        const mockFetch = Promise.resolve({
            json: () =>
                Promise.resolve([
                    {
                        title: 'Prueba de Title',
                        userId: 1,
                        body: 'Prueba de Body',
                        id: 5,
                    },
                ]),
        })

        fetchMock.mockImplementation(() => mockFetch)
        renderWithProviders(<App />)
        expect(fetch).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/posts',
        )

        expect(await screen.findByText(/Prueba de Title/i)).toBeInTheDocument()
        expect(await screen.findByText(/1/i)).toBeInTheDocument()
        expect(await screen.findByText(/Prueba de Body/i)).toBeInTheDocument()
    })

    it('Should delete the user post info when user clicks on X button', async () => {
        const mockFetch = Promise.resolve({
            json: () =>
                Promise.resolve([
                    {
                        title: 'Prueba de Title',
                        userId: 1,
                        body: 'Prueba de Body',
                        id: 5,
                    },
                    {
                        title: 'Post que vamos a Borrar',
                        userId: 2,
                        body: 'Body del Post que vamos a borrar',
                        id: 10,
                    },
                ]),
        })

        fetchMock.mockImplementation(() => mockFetch)
        renderWithProviders(<App />)

        await screen.findByText(/Prueba de Title/i)

        const deleteButton = screen.getAllByRole('button', {
            name: 'Borrar',
        })[1]

        fireEvent.click(deleteButton)

        const notificationSuccess = await screen.findByText(
            /Post borrado con exito/i,
        )

        expect(notificationSuccess).toBeInTheDocument()

        expect(
            screen.queryByText(/Post que vamos a Borrar/i),
        ).not.toBeInTheDocument()
    })
})
