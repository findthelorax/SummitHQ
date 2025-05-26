import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdSpaceDashboard, MdPeople, MdSnowmobile, MdTerrain, MdArrowBack } from 'react-icons/md';

const navItemClass = (selected: boolean) =>
	`flex items-center mx-4 my-1 px-4 py-2 rounded-lg transition-colors
    ${
		selected
			? 'bg-[#2b0845] text-white'
			: 'text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700'
	}`;

const iconClass = 'w-7 h-7 flex-shrink-0';
const labelWidth = 'w-40';

interface NavListProps {
	open: boolean;
}

type AdminNavItemConfig = {
	to: string;
	label: string;
	icon: React.ReactNode;
	match?: (pathname: string) => boolean;
};

const adminNavItems: AdminNavItemConfig[] = [
	{
		to: '/dashboard',
		label: 'Back to App',
		icon: <MdArrowBack className={iconClass} />,
		match: (pathname) => pathname === '/dashboard',
	},
	{
		to: '/admin/mountains',
		label: 'Mountains',
		icon: <MdTerrain className={iconClass} />,
	},
	{
		to: '/admin/employees',
		label: 'Employees',
		icon: <MdPeople className={iconClass} />,
	},
	{
		to: '/admin/equipment',
		label: 'Equipment',
		icon: <MdSnowmobile className={iconClass} />,
	},
	{
		to: '/admin/roles',
		label: 'Roles',
		icon: <MdSpaceDashboard className={iconClass} />,
	},
];

export const AdminNavItems: React.FC<NavListProps> = ({ open }) => {
	const location = useLocation();

	return (
		<>
			{adminNavItems.map((item) => {
				const selected = item.match ? item.match(location.pathname) : location.pathname === item.to;
				return (
					<Link key={item.to} to={item.to} className={navItemClass(selected)}>
						{item.icon}
						<span
							className={`
                                inline-block overflow-hidden transition-all duration-300 whitespace-nowrap text-lg -mt-1
                                ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                            `}
						>
							{item.label}
						</span>
					</Link>
				);
			})}
		</>
	);
};
