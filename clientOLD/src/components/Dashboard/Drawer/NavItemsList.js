import * as React from 'react';
import { ListItemText, ListItemIcon, ListItemButton, Divider } from '@mui/material';
import { GiMushroomHouse, GiTrail } from 'react-icons/gi';
import { MdSpaceDashboard, MdFoodBank, MdOutlineSledding, MdSnowmobile } from 'react-icons/md';
import { FaMap, FaSkiing } from 'react-icons/fa';
import { PiFirstAidDuotone, PiReadCvLogoDuotone } from 'react-icons/pi';
import { TbBuildingHospital, TbAerialLift } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

export const MainListItems = () => {
	const location = useLocation();

	return (
		<>
			<ListItemButton component={Link} to="/dashboard" selected={location.pathname === "/dashboard"}>
				<ListItemIcon>
					<MdSpaceDashboard />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItemButton>
			<ListItemButton component={Link} to="/map" selected={location.pathname === "/map"}>
				<ListItemIcon>
					<FaMap />
				</ListItemIcon>
				<ListItemText primary="Map" />
			</ListItemButton>
		</>
	);
};

export const SecondaryListItems = () => {
	const location = useLocation();

	return (
		<>
			<Divider />
			<ListItemButton component={Link} to="/incidentLogs" selected={location.pathname === "/incidentLogs"}>
				<ListItemIcon>
					<PiFirstAidDuotone />
				</ListItemIcon>
				<ListItemText primary="Incident Logs" />
			</ListItemButton>
			<ListItemButton component={Link} to="/areas" selected={location.pathname === "/areas"}>
				<ListItemIcon>
					<MdOutlineSledding />
				</ListItemIcon>
				<ListItemText primary="Areas" />
			</ListItemButton>
			<ListItemButton component={Link} to="/patrollers" selected={location.pathname === "/patrollers"}>
				<ListItemIcon>
					<FaSkiing />
				</ListItemIcon>
				<ListItemText primary="Patrollers" />
			</ListItemButton>
		</>
	);
};

export const SettingsListItems = () => {
	const location = useLocation();

	return (
		<>
			<Divider />
			<ListItemButton component={Link} to="/firstAidRooms" selected={location.pathname === "/firstAidRooms"}>
				<ListItemIcon>
					<TbBuildingHospital />
				</ListItemIcon>
				<ListItemText primary="First Aid Rooms" />
			</ListItemButton>
			<ListItemButton component={Link} to="/huts" selected={location.pathname === "/huts"}>
				<ListItemIcon>
					<GiMushroomHouse />
				</ListItemIcon>
				<ListItemText primary="Huts" />
			</ListItemButton>
			<ListItemButton component={Link} to="/lifts" selected={location.pathname === "/lifts"}>
				<ListItemIcon>
					<TbAerialLift />
				</ListItemIcon>
				<ListItemText primary="Lifts" />
			</ListItemButton>
			<ListItemButton component={Link} to="/trails" selected={location.pathname === "/trails"}>
				<ListItemIcon>
					<GiTrail />
				</ListItemIcon>
				<ListItemText primary="Trails" />
			</ListItemButton>
			<ListItemButton component={Link} to="/lodges" selected={location.pathname === "/lodges"}>
				<ListItemIcon>
					<MdFoodBank />
				</ListItemIcon>
				<ListItemText primary="Lodges" />
			</ListItemButton>
			<ListItemButton component={Link} to="/equipment" selected={location.pathname === "/equipment"}>
				<ListItemIcon>
					<MdSnowmobile />
				</ListItemIcon>
				<ListItemText primary="Equipment" />
			</ListItemButton>
			<ListItemButton component={Link} to="/logs" selected={location.pathname === "/logs"}>
				<ListItemIcon>
					<PiReadCvLogoDuotone />
				</ListItemIcon>
				<ListItemText primary="Logs" />
			</ListItemButton>
			<ListItemButton component={Link} to="/settings" selected={location.pathname === "/settings"}>
				<ListItemIcon>
					<PiReadCvLogoDuotone />
				</ListItemIcon>
				<ListItemText primary="Settings" />
			</ListItemButton>
		</>
	);
};