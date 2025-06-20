import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdSpaceDashboard, MdPeople, MdSnowmobile, MdTerrain, MdArrowBack, MdFoodBank } from 'react-icons/md';
import { GiMushroomHouse, GiTrail } from 'react-icons/gi';
import { TbBuildingHospital, TbAerialLift } from 'react-icons/tb';

const navItemClass = (selected: boolean) => `nav-item${selected ? ' nav-item-selected' : ''}`;
const iconClass = 'nav-icon';

interface NavListProps {
    open: boolean;
}

type AdminNavItemConfig = {
    to: string;
    label: string;
    icon: React.ReactNode;
    match?: (pathname: string) => boolean;
    dividerBefore?: boolean;
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
    {
        to: '/admin/areas',
        label: 'Areas',
        icon: <MdTerrain className={iconClass} />,
    },
    {
        dividerBefore: true,
        to: '/admin/aidrooms',
        label: 'Aid Rooms',
        icon: <TbBuildingHospital className={iconClass} />,
    },
    {
        to: '/admin/huts',
        label: 'Huts',
        icon: <GiMushroomHouse className={iconClass} />,
    },
    {
        to: '/admin/lifts',
        label: 'Lifts',
        icon: <TbAerialLift className={iconClass} />,
    },
    {
        to: '/admin/lodges',
        label: 'Lodges',
        icon: <MdFoodBank className={iconClass} />,
    },
    {
        to: '/admin/trails',
        label: 'Trails',
        icon: <GiTrail className={iconClass} />,
    },
];

const NavItem: React.FC<{ item: AdminNavItemConfig; open: boolean; selected: boolean }> = ({ item, open, selected }) => (
    <Link to={item.to} className={navItemClass(selected)}>
        {item.icon}
        <span className={`nav-label ${open ? 'nav-label-open' : 'nav-label-closed'}`}>{item.label}</span>
    </Link>
);

export const AdminNavItems: React.FC<NavListProps> = ({ open }) => {
    const location = useLocation();
    let lastDivider = false;
    return (
        <>
            {adminNavItems.map((item) => {
                const selected = item.match ? item.match(location.pathname) : location.pathname === item.to;
                const divider = item.dividerBefore && !lastDivider;
                lastDivider = !!item.dividerBefore;
                return (
                    <React.Fragment key={item.to}>
                        {divider && <div className="nav-divider" />}
                        <NavItem item={item} open={open} selected={selected} />
                    </React.Fragment>
                );
            })}
        </>
    );
};