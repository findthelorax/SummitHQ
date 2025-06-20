import React, { useState, useEffect } from 'react';
import AppBar from '../components/dashboard/AppBar';
import { PermanentDrawerLeft } from '../components/dashboard/Drawer';
import { MainListItems } from '../components/dashboard/NavItemsList';
import Footer from '../components/dashboard/Footer';
import AppRoutes from './AppRoutes';
import { useMountain } from '../contexts/MountainContext';

const drawerWidth = 240;

interface MainLayoutProps {
    drawerItems?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ drawerItems }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
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

    const handleDrawerToggle = () => setIsDrawerOpen((open) => !open);

    return (
        <div className="main-layout">
            <AppBar open={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
            <div className="flex flex-1 min-h-0">
                <div style={{ width: isDrawerOpen ? drawerWidth : 64 }} className="transition-all duration-300">
                    <PermanentDrawerLeft open={isDrawerOpen} drawerItems={<MainListItems open={isDrawerOpen} />} />
                </div>
                <main className="flex-1 min-h-0">
                    <AppRoutes />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;