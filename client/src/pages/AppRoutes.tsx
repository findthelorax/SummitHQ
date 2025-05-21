import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
// import Map from './Map';
// import Patrollers from './Patrollers';
// import IncidentLogs from './IncidentLogs';
// import Areas from './Areas';
import Lifts from './Lifts';
// import Trails from './Trails';
// import Equipment from './Equipment';
// import Lodges from './Lodges';
// import Huts from './Huts';
// import FirstAidRooms from './FirstAidRooms';
// import Logs from './Logs';
// import Settings from './Settings';

interface RouteConfig {
	path: string;
	Component: React.ComponentType;
}

const routes: RouteConfig[] = [
	{ path: '/dashboard', Component: Dashboard },
	// { path: '/map', Component: Map },
	// { path: '/incidentLogs', Component: IncidentLogs },
	// { path: '/areas', Component: Areas },
	// { path: '/patrollers', Component: Patrollers },
	// { path: '/firstAidRooms', Component: FirstAidRooms },
	// { path: '/huts', Component: Huts },
	{ path: '/lifts', Component: Lifts },
	// { path: '/trails', Component: Trails },
	// { path: '/lodges', Component: Lodges },
	// { path: '/equipment', Component: Equipment },
	// { path: '/logs', Component: Logs },
	// { path: '/settings', Component: Settings },
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