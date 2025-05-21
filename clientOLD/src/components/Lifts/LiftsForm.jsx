import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';

const AddLiftForm = ({ coordinates }) => {
	const nameRef = useRef();
	const [selectedArea, setSelectedArea] = useState(null);
	const { fetchMountains, areas, handleCreateLift } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const name = nameRef.current.value;
			const lift = { name, area: selectedArea._id, coordinates };
			await handleCreateLift(lift);
			nameRef.current.value = '';
			setSelectedArea(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage('Lift created successfully');
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating lift', error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating lift');
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<TextField label="Name" inputRef={nameRef} required />
						<FormControl fullWidth required>
							<MountainAutocomplete
								options={areas}
								selectedValue={selectedArea}
								setSelectedValue={setSelectedArea}
								label="Area"
							/>
						</FormControl>
						<Button type="submit" variant="contained">
							Add Lift
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

const AddLineCheckForm = () => {
	const descriptionRef = useRef();
	const [selectedLift, setSelectedLift] = useState(null);
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, lifts, handleCreateLineCheck } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const description = descriptionRef.current.value;
			const lineCheck = { description };
			await handleCreateLineCheck(selectedMountain._id, selectedLift.id, lineCheck);
			descriptionRef.current.value = '';
			setSelectedLift(null);
			setSelectedPatroller(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage('Line check created successfully');
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating line check', error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating line check');
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<MountainAutocomplete
							options={lifts}
							selectedValue={selectedLift}
							setSelectedValue={setSelectedLift}
							label="Lift"
						/>
						<PatrollerAutocomplete
							selectedPatroller={selectedPatroller}
							setSelectedPatroller={setSelectedPatroller}
						/>
                        <TextField label="Description" inputRef={descriptionRef} required multiline />

						<Button type="submit" variant="contained">
							Add Line Check
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export { AddLiftForm, AddLineCheckForm };
