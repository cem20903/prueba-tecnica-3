import React from 'react'

import PostList from './Views/PostList/PostList'

import { Route, Routes } from 'react-router-dom'

import Login from './Views/Login/Login'
import PostEdit from './Views/PostEdit/PostEdit'
import Layout from './components/Layout/Layout'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<PostList />} />
                <Route path="login" element={<Login />} />
                <Route path="edit/:id" element={<PostEdit />} />
            </Route>
        </Routes>
    )
}

export default App
