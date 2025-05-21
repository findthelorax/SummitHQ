import React, { useContext, useState, useEffect } from 'react';
import { MountainContext } from '../../contexts/MountainContext';
import { DateContext } from '../../contexts/DateContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { Autocomplete, TextField, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import ConfirmationDialog from '../Dashboard/ConfirmationDialog';

const PatrolDispatcherAutocomplete = () => {
	const {
		selectedMountain,
		patrollers,
		fetchDispatcherForDate,
		currentDayDispatcher,
		setCurrentDayDispatcher,
		apis,
	} = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const { selectedDate } = useContext(DateContext);
	const [selectedDispatcher, setSelectedDispatcher] = useState(null);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

	const setDispatcher = async (dispatcher) => {
		console.log("🚀 ~ file: PatrolDispatcherAutocomplete.jsx:24 ~ setPatrolDispatcher ~ dispatcher:", dispatcher)
		try {
			if (selectedMountain) {
				let date = new Date(dispatcher.date);
				date.setHours(0, 0, 0, 0);

				const existingDispatcher = await fetchDispatcherForDate(date);
				if (existingDispatcher) {
					await apis.patrollerApi.updateDispatcherLog(selectedMountain._id, dispatcher._id, {
						date: date.toISOString(),
					});
				} else {
					await apis.patrollerApi.createDispatcherLog(selectedMountain._id, dispatcher._id, {
						date: date.toISOString(),
					});
				}

				setCurrentDayDispatcher(dispatcher);
				setSnackbarMessage('Patrol dispatcher set successfully');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} else {
				console.error('No mountain selected');
			}
		} catch (error) {
			console.error(`Error saving patrol dispatcher with id ${dispatcher._id}`, error);
			setSnackbarMessage('Failed to set patrol dispatcher');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	const handleSelectionChange = async (event, newValue) => {
		console.log('🚀 ~ file: PatrolDispatcherAutocomplete.jsx:14 ~ handleSelectionChange ~ newValue:', newValue);
		if (
			patrollers.some(
				(patroller) => patroller.firstName === newValue.firstName && patroller.lastName === newValue.lastName
			)
		) {
			setSelectedDispatcher(newValue);
			console.log(
				'🚀 ~ file: PatrolDispatcherAutocomplete.jsx:17 ~ handleSelectionChange ~ selectedDate:',
				selectedDate
			);
			const existingDispatcher = await fetchDispatcherForDate(selectedDate);
			console.log("🚀 ~ file: PatrolDispatcherAutocomplete.jsx:60 ~ handleSelectionChange ~ existingDispatcher:", existingDispatcher)
			if (existingDispatcher) {
				setOpenConfirmDialog(true);
			} else {
				setDispatcher({ ...newValue, date: selectedDate });
			}
		} else {
			setSelectedDispatcher(null);
		}
	};

	const handleConfirmChange = () => {
		setDispatcher({ ...selectedDispatcher, date: selectedDate });
		setOpenConfirmDialog(false);
	};

	const handleCancelChange = () => {
		setOpenConfirmDialog(false);
	};

	return (
		<>
			<Autocomplete
				id="patrol-dispatcher-autocomplete"
				options={patrollers || []}
				getOptionLabel={(option) =>
					option && option.firstName && option.lastName ? `${option.firstName} ${option.lastName}` : 'No name'
				}
				value={currentDayDispatcher}
				onChange={handleSelectionChange}
				clearIcon={false}
				isOptionEqualToValue={(option, value) => option._id === value._id}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Patrol Dispatcher"
						required
						fullWidth
						placeholder="Select Patrol Dispatcher"
						style={{ width: '200px' }}
					/>
				)}
			/>
			<ConfirmationDialog
				open={openConfirmDialog}
				handleClose={handleCancelChange}
				handleConfirm={handleConfirmChange}
				title="Confirm Dispatcher Change"
				message="A patrol dispatcher already exists for the selected day. Do you want to overwrite it?"
			/>
		</>
	);
};

export default PatrolDispatcherAutocomplete;
