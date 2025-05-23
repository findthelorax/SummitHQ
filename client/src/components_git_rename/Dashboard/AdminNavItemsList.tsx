import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdSpaceDashboard, MdPeople, MdSnowmobile, MdTerrain, MdArrowBack } from 'react-icons/md';

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

export const AdminNavItems: React.FC<NavListProps> = ({ open }) => {
    const location = useLocation();
    return (
        <>
            <Link to="/dashboard" className={navItemClass(false)}>
                <MdArrowBack />
                <span
                    className={`
                        inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                        ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                    `}
                >
                    Back to App
                </span>
            </Link>
            <Link to="/admin/mountains" className={navItemClass(location.pathname === '/admin/mountains')}>
                <MdTerrain />
                <span className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}>
                    Mountains
                </span>
            </Link>
            <Link to="/admin/employees" className={navItemClass(location.pathname === '/admin/employees')}>
                <MdPeople />
                <span className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}>
                    Employees
                </span>
            </Link>
            <Link to="/admin/equipment" className={navItemClass(location.pathname === '/admin/equipment')}>
                <MdSnowmobile />
                <span className={`
                    inline-block overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${open ? `${labelWidth} opacity-100 ml-2` : 'w-0 opacity-0 ml-0'}
                `}>
                    Equipment
                </span>
            </Link>
        </>
    );
};