import React from 'react';
import { Link } from 'react-router-dom';
import { MdNotifications, MdSettings, MdMenu } from 'react-icons/md';
import { useMountain } from '../../contexts/MountainContext';
import MountainAutocomplete from '../mountain/MountainAutoComplete';

interface AppBarProps {
    open: boolean;
    handleDrawerToggle: () => void;
    hideMountainSelect?: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ open, handleDrawerToggle, hideMountainSelect }) => {
    let mountains, selectedMountain, setSelectedMountain;
    try {
        // Try to use context, but allow fallback for admin
        ({ mountains, selectedMountain, setSelectedMountain } = useMountain());
    } catch {
        // Not in provider, skip mountain select
    }

    return (
        <header className="flex items-center h-16 px-4 bg-white dark:bg-gray-800 shadow">
            {/* Left: Drawer toggle and Mountain Autocomplete */}
            <div className="flex items-center gap-6">
                <button
                    onClick={handleDrawerToggle}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label={open ? "Close drawer" : "Open drawer"}
                >
                    <MdMenu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </button>
                {!hideMountainSelect && mountains && selectedMountain !== undefined && setSelectedMountain ? (
                    <MountainAutocomplete
                        options={mountains}
                        selectedValue={selectedMountain}
                        setSelectedValue={setSelectedMountain}
                        label="Select a mountain"
                        className="w-72"
                    />
                ) : null}
            </div>
            {/* Right: Icons and Avatar */}
            <div className="flex items-center gap-2 ml-auto">
                <Link to="/notifications" className="relative">
                    <MdNotifications className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </Link>
                <Link to="/profile">
                    {/* <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" className="w-8 h-8" /> */}
                </Link>
                <Link to="/settings">
                    <MdSettings className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </Link>
            </div>
        </header>
    );
};

export default AppBar;