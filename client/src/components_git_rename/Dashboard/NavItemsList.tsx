import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdSpaceDashboard, MdFoodBank, MdSnowmobile, MdSettings, MdAdminPanelSettings  } from 'react-icons/md';
import { FaMap, FaSkiing } from 'react-icons/fa';
import { LiaMountainSolid } from 'react-icons/lia';
import { GiMushroomHouse, GiTrail, GiTreasureMap } from 'react-icons/gi';
import { PiFirstAidDuotone, PiReadCvLogoDuotone } from 'react-icons/pi';
import { TbBuildingHospital, TbAerialLift } from 'react-icons/tb';

const navItemClass = (selected: boolean) =>
	`flex items-center px-4 py-2 rounded transition-colors ${
		selected
			? 'bg-[#2b0845] text-white'
			: 'text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700'
	} [&>svg]:w-7 [&>svg]:h-7 [&>svg]:mr-2`;

interface NavListProps {
	open: boolean;
}

const labelWidth = 'w-40';

export const MainListItems: React.FC<NavListProps> = ({ open }) => {
	const location = useLocation();
	return (
		<>
			<Link to="/dashboard" className={navItemClass(location.pathname === '/dashboard')}>
				<MdSpaceDashboard />
				<span
					className={`
                        inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                        ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                    `}
				>
					Dashboard
				</span>
			</Link>
			<Link to="/map" className={navItemClass(location.pathname === '/map')}>
				<GiTreasureMap />
				<span
					className={`
                        inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                        ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                    `}
				>
					Map
				</span>
			</Link>
		</>
	);
};

export const SecondaryListItems: React.FC<NavListProps> = ({ open }) => {
	const location = useLocation();
	return (
		<>
			<div className="border-t border-gray-300 my-2" />
			<Link to="/incidentLogs" className={navItemClass(location.pathname === '/incidentLogs')}>
				<PiFirstAidDuotone />
				<span
					className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}
				>
					Incident Logs
				</span>
			</Link>
			<Link to="/areas" className={navItemClass(location.pathname === '/areas')}>
				<LiaMountainSolid />
				<span
					className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}
				>
					Areas
				</span>
			</Link>
			<Link to="/areaLocations" className={navItemClass(location.pathname === '/areaLocations')}>
				<LiaMountainSolid />
				<span
					className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}
				>
					Area Location
				</span>
			</Link>
			<div className="border-t border-gray-300 my-2" />
			<Link to="/trails" className={navItemClass(location.pathname === '/trails')}>
				<GiTrail />
				<span
					className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}
				>
					Trails
				</span>
			</Link>
			<Link to="/lifts" className={navItemClass(location.pathname === '/lifts')}>
				<TbAerialLift />
				<span
					className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}
				>
					Lifts
				</span>
			</Link>
			<Link to="/lodges" className={navItemClass(location.pathname === '/lodges')}>
				<MdFoodBank />
				<span
					className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}
				>
					Lodges
				</span>
			</Link>
			<Link to="/huts" className={navItemClass(location.pathname === '/huts')}>
				<GiMushroomHouse />
				<span
					className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}
				>
					Huts
				</span>
			</Link>
			<Link to="/aidRooms" className={navItemClass(location.pathname === '/aidRooms')}>
				<TbBuildingHospital />
				<span
					className={`
                        inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                        ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                    `}
				>
					Aid Rooms
				</span>
			</Link>
			<Link to="/equipment" className={navItemClass(location.pathname === '/equipment')}>
				<MdSnowmobile />
				<span
					className={`
                        inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                        ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                    `}
				>
					Equipment
				</span>
			</Link>
		</>
	);
};

export const SettingsListItems: React.FC<NavListProps> = ({ open }) => {
	const location = useLocation();
	return (
		<>
			<div className="border-t border-gray-300 my-2" />
			<Link to="/employees" className={navItemClass(location.pathname === '/employees')}>
				<FaSkiing />
				<span
					className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}
				>
					Employees
				</span>
			</Link>
			<Link to="/logs" className={navItemClass(location.pathname === '/logs')}>
				<PiReadCvLogoDuotone />
				<span
					className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}
				>
					Logs
				</span>
			</Link>
			<Link to="/settings" className={navItemClass(location.pathname === '/settings')}>
				<MdSettings />
				<span
					className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}
				>
					Settings
				</span>
			</Link>
			<Link to="/admin" className={navItemClass(location.pathname.startsWith('/admin'))}>
				<MdAdminPanelSettings />
				<span className={`...`}>Admin</span>
			</Link>
		</>
	);
};
