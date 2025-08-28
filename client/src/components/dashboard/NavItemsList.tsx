import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdSpaceDashboard, MdFoodBank, MdSnowmobile, MdSettings, MdAdminPanelSettings } from 'react-icons/md';
import { FaMap, FaSkiing } from 'react-icons/fa';
import { LiaMountainSolid } from 'react-icons/lia';
import { GiMushroomHouse, GiTrail, GiTreasureMap } from 'react-icons/gi';
import { PiFirstAidDuotone, PiReadCvLogoDuotone } from 'react-icons/pi';
import { TbBuildingHospital, TbAerialLift } from 'react-icons/tb';

const navItemClass = (selected: boolean) => `nav-item${selected ? ' nav-item-selected' : ''}`;
const iconClass = 'nav-icon';

interface NavListProps {
    open: boolean;
}

type NavItemConfig = {
    to: string;
    label: string;
    icon: React.ReactNode;
    match?: (pathname: string) => boolean;
    section?: string; // New property for section title
};

// Group items by section
const navItems: { section: string; items: NavItemConfig[] }[] = [
    {
        section: 'Main',
        items: [
            { to: '/dashboard', label: 'Dashboard', icon: <MdSpaceDashboard className={iconClass} /> },
            { to: '/map', label: 'Map', icon: <GiTreasureMap className={iconClass} /> },
        ]
    },
    {
        section: 'Operations',
        items: [
            { to: '/incidents', label: 'Incidents', icon: <PiFirstAidDuotone className={iconClass} /> },
            { to: '/areas', label: 'Areas', icon: <LiaMountainSolid className={iconClass} /> },
        ]
    },
    {
        section: 'Locations',
        items: [
            { to: '/aidRooms', label: 'Aid Rooms', icon: <TbBuildingHospital className={iconClass} /> },
            { to: '/huts', label: 'Huts', icon: <GiMushroomHouse className={iconClass} /> },
            { to: '/lifts', label: 'Lifts', icon: <TbAerialLift className={iconClass} /> },
            { to: '/lodges', label: 'Lodges', icon: <MdFoodBank className={iconClass} /> },
            { to: '/trails', label: 'Trails', icon: <GiTrail className={iconClass} /> },
            { to: '/equipment', label: 'Equipment', icon: <MdSnowmobile className={iconClass} /> },
        ]
    },
    {
        section: 'Management',
        items: [
            { to: '/employees', label: 'Employees', icon: <FaSkiing className={iconClass} /> },
            { to: '/logs', label: 'Logs', icon: <PiReadCvLogoDuotone className={iconClass} /> },
            { to: '/aidRoomChecks', label: 'Aid Room Checks', icon: <PiFirstAidDuotone className={iconClass} /> },
            { to: '/hutChecks', label: 'Hut Checks', icon: <GiMushroomHouse className={iconClass} /> },
            { to: '/liftChecks', label: 'Lift Checks', icon: <TbAerialLift className={iconClass} /> },
            { to: '/trailChecks', label: 'Trail Checks', icon: <GiTrail className={iconClass} /> },
        ]
    },
    {
        section: 'System',
        items: [
            { to: '/settings', label: 'Settings', icon: <MdSettings className={iconClass} /> },
            {
                to: '/admin',
                label: 'Admin',
                icon: <MdAdminPanelSettings className={iconClass} />,
                match: (pathname) => pathname.startsWith('/admin'),
            },
        ]
    }
];

// Section title component
const SectionTitle: React.FC<{ title: string; open: boolean }> = ({ title, open }) => (
    <div className={`nav-section-title ${open ? '' : 'nav-section-title-closed'}`}>
        {open ? title : ''}
    </div>
);

const NavItem: React.FC<{ item: NavItemConfig; open: boolean; selected: boolean }> = ({ item, open, selected }) => (
    <Link to={item.to} className={navItemClass(selected)}>
        {item.icon}
        <span className={`nav-label ${open ? 'nav-label-open' : 'closed'}`}>{item.label}</span>
    </Link>
);

export const MainListItems: React.FC<NavListProps> = ({ open }) => {
    const location = useLocation();
    
    return (
        <>
            {navItems.map((section, sectionIdx) => (
                <React.Fragment key={section.section}>
                    <SectionTitle title={section.section} open={open} />
                    {section.items.map((item) => {
                        const selected = item.match 
                            ? item.match(location.pathname) 
                            : location.pathname === item.to;
                        
                        return (
                            <NavItem 
                                key={item.to} 
                                item={item} 
                                open={open} 
                                selected={selected} 
                            />
                        );
                    })}
                </React.Fragment>
            ))}
        </>
    );
};