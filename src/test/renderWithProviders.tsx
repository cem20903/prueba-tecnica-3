import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import postReducer from '../store/postSlice'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'

function renderWithProviders(
    ui: React.ReactElement,
    {
        store = configureStore({
            reducer: { post: postReducer },
        }),
        ...renderOptions
    } = {},
) {
    function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
        return (
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
            </Provider>
        )
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export default renderWithProviders
