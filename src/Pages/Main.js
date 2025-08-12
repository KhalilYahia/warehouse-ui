import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import './Main.css'
import { Outlet } from 'react-router-dom';

const Main = () => {
     const [sidebarOpen, setSidebarOpen] = useState(false);

     const toggleSidebar = () => setSidebarOpen(prev => !prev);
    return (
        <div className="layout">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

export default Main;
