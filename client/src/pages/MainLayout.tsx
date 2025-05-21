import React, { useState } from 'react';
import SearchAppBar from '../components/Dashboard/AppBar';
import { PermanentDrawerLeft } from '../components/Dashboard/Drawer';
import Footer from '../components/Dashboard/Footer';
import AppRoutes from './AppRoutes';

const drawerWidth = 240;

const MainLayout: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const handleDrawerToggle = () => setIsDrawerOpen((open) => !open);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <SearchAppBar open={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
            <div className="flex flex-1 min-h-0">
                <div
                    style={{ width: isDrawerOpen ? drawerWidth : 64 }}
                    className="transition-all duration-300"
                >
                    <PermanentDrawerLeft open={isDrawerOpen} />
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