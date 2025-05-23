import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
// import Map from './Map';
import Areas from './Areas';
import AreaLocationPage from './AreaLocationPage';
import Trails from './Trails';
import Lifts from './Lifts';
import Lodges from './Lodges';
import Huts from './Huts';
import AidRooms from './AidRooms';
// import IncidentLogs from './IncidentLogs';
import Employees from './Employees';
import Equipment from './Equipment';
// import Logs from './Logs';
// import Settings from './Settings';

import AdminLayout from './admin/AdminLayout';

interface RouteConfig {
	path: string;
	Component: React.ComponentType;
}

const routes: RouteConfig[] = [
	{ path: '/dashboard', Component: Dashboard },
	// { path: '/map', Component: Map },
	{ path: '/areas', Component: Areas },
	{ path: '/areaLocations', Component: AreaLocationPage },
	{ path: '/trails', Component: Trails },
	{ path: '/lifts', Component: Lifts },
	{ path: '/lodges', Component: Lodges },
	{ path: '/huts', Component: Huts },
	{ path: '/aidRooms', Component: AidRooms },
	// { path: '/incidentLogs', Component: IncidentLogs },
	{ path: '/employees', Component: Employees },
	{ path: '/equipment', Component: Equipment },
	// { path: '/logs', Component: Logs },
	// { path: '/settings', Component: Settings },
	{ path: '/admin/*', Component: AdminLayout },
	{ path: '*', Component: Dashboard },
];

const AppRoutes: React.FC = () => (
	<Routes>
		{routes.map(({ path, Component }) => (
			<Route key={path} path={path} element={<Component />} />
		))}
	</Routes>
);

export default AppRoutes;