import React from 'react';
import patrolcross from '../../assets/patrolcross.jpg';
import { MainListItems, SecondaryListItems, SettingsListItems } from './NavItemsList';

export const PermanentDrawerLeft: React.FC<{ open: boolean }> = ({
    open,
}) => {
    return (
        <aside
            className={`bg-white dark:bg-gray-800 shadow-lg h-full transition-all duration-300 ${
                open ? 'w-60' : 'w-16'
            }`}
        >
            <div className="flex flex-col items-center py-4">
                <div className="flex items-center justify-center w-full gap-x-2 mb-4">
                    <img src={patrolcross} alt="patrolcross" className="w-16 h-16" />
                </div>
                <nav className="flex flex-col gap-2 w-full">
                    <MainListItems open={open} />
                    <SecondaryListItems open={open} />
                    <SettingsListItems open={open} />
                </nav>
            </div>
        </aside>
    );
};