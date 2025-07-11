import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const layout = () => {
    return (
        <div>
            <AdminNavbar />
            <div className='flex'>
                <AdminSidebar />
                <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px )] overflow-y-hidden text-5xl'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default layout