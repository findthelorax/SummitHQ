import React, { useState, useEffect } from 'react';
import AppBar from '../components/dashboard/AppBar';
import Sidebar from '../components/dashboard/Sidebar';
import { MainListItems } from '../components/dashboard/NavItemsList';
import Dashboard from '../components/dashboard/Dashboard';
import { useMountain } from '../contexts/MountainContext';

const sidebarWidth = 240;

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { selectedMountain, setSelectedMountain, mountains } = useMountain();

    useEffect(() => {
        if (!selectedMountain && mountains.length > 0) {
            const storedId = localStorage.getItem('selectedMountainId');
            if (storedId) {
                const found = mountains.find((m) => m.id === storedId);
                if (found) setSelectedMountain(found);
            }
        }
    }, [selectedMountain, mountains, setSelectedMountain]);

    const handleSidebarToggle = () => setIsSidebarOpen((open) => !open);

    return (
        <div className="flex flex-col h-screen">
            <AppBar open={isSidebarOpen} handleDrawerToggle={handleSidebarToggle} />
            
            <div className="flex flex-1 overflow-hidden">
                <div className="h-full" style={{ width: isSidebarOpen ? sidebarWidth : 64 }}>
                    <Sidebar 
                        open={isSidebarOpen}
                        navItems={<MainListItems open={isSidebarOpen} />}
                    />
                </div>
                                <div className="flex-1 h-full">
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;