import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from '../components/dashboard/AppBar';
import Footer from '../components/dashboard/Footer';
import Sidebar from '../components/dashboard/Sidebar';
import { AdminNavItems } from '../components/dashboard/AdminNavItemsList';
import AdminMountain from '../components/admin/AdminMountain';
import AdminEquipment from '../components/admin/AdminEquipment';
import AdminEmployees from '../components/admin/AdminEmployees';
import AdminRoles from '../components/admin/AdminRoles';
import AdminAreas from '../components/admin/AdminAreas';
import AdminAidRooms from '../components/admin/AdminAidRooms';
import AdminHuts from '../components/admin/AdminHuts';
import AdminLifts from '../components/admin/AdminLifts';
import AdminLodges from '../components/admin/AdminLodges';
import AdminTrails from '../components/admin/AdminTrails';

const sidebarWidth = 240;

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    const handleSidebarToggle = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="main-layout flex flex-col h-screen">
            <AppBar open={isSidebarOpen} handleDrawerToggle={handleSidebarToggle} hideMountainSelect />
            
            <div className="flex flex-1 min-h-0 overflow-hidden">
                <div 
                    style={{ width: isSidebarOpen ? sidebarWidth : 64 }} 
                    className="transition-all duration-300 h-full overflow-y-auto"
                >
                    <Sidebar 
                        open={isSidebarOpen}
                        navItems={<AdminNavItems open={isSidebarOpen} />}
                    />
                </div>
                
                <div className="flex-1 flex flex-col h-full">
                    <main className="flex-1 p-6 overflow-auto">
                        <Routes>
                            <Route path="mountains" element={<AdminMountain />} />
                            <Route path="employees" element={<AdminEmployees />} />
                            <Route path="equipment" element={<AdminEquipment />} />
                            <Route path="roles" element={<AdminRoles />} />
                            <Route path="areas" element={<AdminAreas />} />
                            <Route path="aidrooms" element={<AdminAidRooms />} />
                            <Route path="huts" element={<AdminHuts />} />
                            <Route path="lifts" element={<AdminLifts/>} />
                            <Route path="lodges" element={<AdminLodges/>} />
                            <Route path="trails" element={<AdminTrails/>} />
                            <Route path="*" element={<div>Select an admin section.</div>} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;