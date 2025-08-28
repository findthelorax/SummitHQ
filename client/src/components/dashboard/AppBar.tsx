import * as React from 'react';
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
		({ mountains, selectedMountain, setSelectedMountain } = useMountain());
	} catch {}

	return (
		<header className="appbar">
			{/* Left: Drawer toggle and Mountain Autocomplete */}
			<div className="flex items-center gap-6">
				<button
					onClick={handleDrawerToggle}
					className="appbar-btn"
					aria-label={open ? 'Close drawer' : 'Open drawer'}
				>
					<MdMenu className="appbar-icon" />
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
					<MdNotifications className="appbar-icon" />
				</Link>
				<Link to="/profile">
					{/* <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" className="w-8 h-8" /> */}
				</Link>
				<Link to="/settings">
					<MdSettings className="appbar-icon" />
				</Link>
			</div>
		</header>
	);
};

export default AppBar;
