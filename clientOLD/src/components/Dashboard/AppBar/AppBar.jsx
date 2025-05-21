import React, { useContext } from 'react';
import { Toolbar, IconButton, Badge, Avatar, Divider, Box, AppBar } from '@mui/material';
import { Notifications as NotificationsIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MountainContext } from '../../../contexts/MountainContext';
import { DateContext } from '../../../contexts/DateContext';
import DarkModeButton from '../../LightDarkButton/LightDarkButton';
import AppBarMountainAutocomplete from '../../AutoComplete/AppBarMountainAutocomplete';
import DatePickerMobile from '../../DatePickers/DatePickerMobile';
import PatrolDispatcherAutocomplete from '../../AutoComplete/PatrolDispatcherAutocomplete';
import PatrolDispatcherDisplay from '../../Patrollers/PatrolDispatcherDisplay';

function SearchAppBar({ setOpenSnackbar, setSnackbarMessage }) {
	const { selectedMountain, setSelectedMountain } = useContext(MountainContext);
	const { openDatePicker, setOpenDatePicker } = useContext(DateContext);

	return (
		<AppBar
			sx={{
				width: `calc(102.1% - 240px)`,
			}}
		>
			<Toolbar sx={{ display: 'flex' }}>
				<Box sx={{ display: 'flex' }}>
					<DarkModeButton />
					<Box sx={{ marginLeft: 2 }}>
						<DatePickerMobile openDatePicker={openDatePicker} setOpenDatePicker={setOpenDatePicker} />
					</Box>
				</Box>
				<AppBarMountainAutocomplete
					selectedMountain={selectedMountain}
					setSelectedMountain={setSelectedMountain}
					setOpenSnackbar={setOpenSnackbar}
					setSnackbarMessage={setSnackbarMessage}
				/>
				{/* <Box sx={{ ml: 2 }}>
					<PatrolDispatcherDisplay />
				</Box> */}
				<Box sx={{ ml: 'auto' }}>
					<PatrolDispatcherAutocomplete />
				</Box>
				<Box sx={{ display: 'flex', ml: 'auto' }}>
					<IconButton color="inherit" component={Link} to="/notifications">
						<Badge badgeContent={4} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton color="inherit" component={Link} to="/profile">
						<Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
					</IconButton>
					<Divider orientation="vertical" flexItem />
					<IconButton color="inherit" component={Link} to="/settings">
						<SettingsIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default SearchAppBar;
