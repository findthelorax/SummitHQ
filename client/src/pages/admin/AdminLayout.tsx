import React, { useState } from 'react';
import AppBar from '../../components/dashboard/AppBar';
import { PermanentDrawerLeft } from '../../components/dashboard/Drawer';
import { AdminNavItems } from '../../components/dashboard/AdminNavItemsList';
import Footer from '../../components/dashboard/Footer';
import { Routes, Route } from 'react-router-dom';
import AdminMountains from './AdminMountains';
import AdminEmployees from './AdminEmployees';
import AdminEquipment from './AdminEquipment';

const drawerWidth = 240;

const AdminLayout: React.FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);

        const handleDrawerToggle = () => {
        setIsDrawerOpen((prev) => !prev);
    };
    
	return (
		<div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
			<AppBar open={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} hideMountainSelect />
			<div className="flex flex-1 min-h-0">
				<div style={{ width: isDrawerOpen ? drawerWidth : 64 }} className="transition-all duration-300">
					<PermanentDrawerLeft open={isDrawerOpen} drawerItems={<AdminNavItems open={isDrawerOpen} />} />
				</div>
				<main className="flex-1 p-6 overflow-auto">
					<Routes>
						<Route path="mountains" element={<AdminMountains />} />
						<Route path="employees" element={<AdminEmployees />} />
						<Route path="equipment" element={<AdminEquipment />} />
						<Route path="*" element={<div>Select an admin section.</div>} />
					</Routes>
				</main>
			</div>
			<Footer />
		</div>
	);
};

export default AdminLayout;
