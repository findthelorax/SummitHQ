import React, { useState } from 'react';
import AppBar from '../components/dashboard/AppBar';
import { PermanentDrawerLeft } from '../components/dashboard/Drawer';
import { MainListItems, SecondaryListItems, SettingsListItems } from '../components/dashboard/NavItemsList';
import Footer from '../components/dashboard/Footer';
import AppRoutes from './AppRoutes';

const drawerWidth = 240;

interface MainLayoutProps {
	drawerItems?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ drawerItems }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);

	const handleDrawerToggle = () => setIsDrawerOpen((open) => !open);

	return (
		<div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
			<AppBar open={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
			<div className="flex flex-1 min-h-0">
				<div style={{ width: isDrawerOpen ? drawerWidth : 64 }} className="transition-all duration-300">
					<PermanentDrawerLeft
						open={isDrawerOpen}
						drawerItems={
							<>
								<MainListItems open={isDrawerOpen} />
								<SecondaryListItems open={isDrawerOpen} />
								<SettingsListItems open={isDrawerOpen} />
							</>
						}
					/>
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
