import React from 'react'
import { Outlet } from 'react-router-dom'

import Notifications from '../Notifications/Notifications'
import Menu from '../Menu/Menu'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.css'

function Layout() {
    return (
        <>
            <Menu />
            <div className="content">
                <Sidebar />
                <Outlet />
            </div>
            <Notifications />
        </>
    )
}

export default Layout
