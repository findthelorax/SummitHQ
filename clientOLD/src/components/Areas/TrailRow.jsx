import React, { useState, useContext } from 'react';
import { MountainContext } from '../../contexts/MountainContext';
import { Autocomplete, TableCell, TableRow, TextField, Box, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Conditions } from '../../helpers/constants';
import TimeUpdateDialog from '../DatePickers/TimeUpdateDialog';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';

function TrailRow({ trail, patrollers }) {
	const [openingTime, setOpeningTime] = useState('');
	const [condition, setCondition] = useState('Closed');
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const [closingPatroller, setClosingPatroller] = useState(null);
	const [proposedTime, setProposedTime] = useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const { handleTrailLogCreateOrUpdate } = useContext(MountainContext);

	const handleTimeClick = () => {
		const currentTime = new Date();
		const hours = currentTime.getHours().toString().padStart(2, '0');
		const minutes = currentTime.getMinutes().toString().padStart(2, '0');
		const newTime = `${hours}:${minutes}`;

		if (openingTime) {
			setProposedTime(newTime);
			setOpenDialog(true);
		} else {
			setOpeningTime(newTime);
		}
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	const handleDialogConfirm = () => {
		setOpeningTime(proposedTime);
		setOpenDialog(false);
	};

	const handleTimeChange = (event) => {
		setOpeningTime(event.target.value);
		handleTrailLogCreateOrUpdate(trail._id, { openingTime: event.target.value });
	};

	const handleConditionChange = (event, newValue) => {
		setCondition(newValue);
		handleTrailLogCreateOrUpdate(trail._id, { condition: newValue });
	};

	const handlePatrollerChange = (newValue) => {
		setSelectedPatroller(newValue ? newValue._id : null);
		handleTrailLogCreateOrUpdate(trail._id, { openingPatroller: newValue ? newValue._id : null });
	};

	const handleClosingPatrollerChange = (newValue) => {
		setClosingPatroller(newValue ? newValue._id : null);
		handleTrailLogCreateOrUpdate(trail._id, { closingPatroller: newValue ? newValue._id : null });
	};

	return (
		<>
			<TableRow key={trail._id}>
				<TableCell>{trail.name}</TableCell>
				<TableCell style={{ width: '100px' }}>
					<Box display="flex" alignItems="center">
						<IconButton onClick={handleTimeClick}>
							<AccessTimeIcon />
						</IconButton>
						<TextField type="time" value={openingTime} onChange={handleTimeChange} />
					</Box>
				</TableCell>
				<TableCell>
					<PatrollerAutocomplete
						selectedPatroller={patrollers.find((patroller) => patroller._id === selectedPatroller) || null}
						setSelectedPatroller={handlePatrollerChange}
					/>
				</TableCell>
				<TableCell>
					<Autocomplete
						value={condition}
						onChange={handleConditionChange}
						options={Object.values(Conditions)}
						renderInput={(params) => <TextField {...params} />}
						renderOption={(props, option, { selected }) => (
							<Box component="li" {...props}>
								{option === 'Powder' && '❆'}
								{option === 'Soft' && '🏂'}
								{option === 'Hard' && '🧊'}
								{option === 'Variable' && '⛇'}
								{option === 'Groomed' && '🚜'}
								{option === 'Moguls' && '⛷'}
								{option === 'Closed' && '❌'}
								{option}
							</Box>
						)}
					/>
				</TableCell>
				<TableCell>
					<PatrollerAutocomplete
						selectedPatroller={patrollers.find((patroller) => patroller._id === closingPatroller) || null}
						setSelectedPatroller={handleClosingPatrollerChange}
					/>
				</TableCell>
			</TableRow>
			<TimeUpdateDialog open={openDialog} onClose={handleDialogClose} onConfirm={handleDialogConfirm} />
		</>
	);
}

export default TrailRow;
