import * as React from 'react';
import patrolcross from '../../assets/patrolcross.jpg';

interface SidebarProps {
    open: boolean;
    navItems: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ open, navItems }) => {
    return (
        <aside
            className={`sidebar ${open ? 'sidebar-open' : 'sidebar-closed'} h-full overflow-y-auto`}
        >
            <div className="flex flex-col items-center py-4">
                <div className="flex items-center justify-center w-full gap-x-2 mb-4">
                    <img src={patrolcross} alt="patrolcross" className="w-16 h-16" />
                </div>
                <nav className="flex flex-col gap-2 w-full">{navItems}</nav>
            </div>
        </aside>
    );
};

export default Sidebar;