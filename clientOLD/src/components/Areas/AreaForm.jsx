import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Card, CardContent, Stack, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddAreaForm = () => {
	const nameRef = useRef();
	const [localSelectedMountain, setLocalSelectedMountain] = useState(null);
	const { mountains, fetchMountains, apis, selectedMountain } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const mountainToUse = localSelectedMountain || selectedMountain;
		if (!mountainToUse) {
			setSnackbarSeverity('error');
			setSnackbarMessage(`Please select a mountain.`);
			setOpenSnackbar(true);
			return;
		}
		const name = nameRef.current.value;
		const area = { name };
		const mountainId = mountainToUse._id;
		try {
			await apis.mountainApi.createArea(mountainId, area);
			nameRef.current.value = '';
			setLocalSelectedMountain(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage(`Area ${name} created successfully!`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating area', error);
			setSnackbarSeverity('error');
			setSnackbarMessage(`Error creating ${name}`);
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<FormControl fullWidth required>
							<MountainAutocomplete
								options={mountains}
								selectedValue={localSelectedMountain}
								setSelectedValue={setLocalSelectedMountain}
								label="Mountain"
							/>
						</FormControl>
						<TextField label="Name" inputRef={nameRef} required />
						<Button type="submit" variant="contained">
							Add Area
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddAreaForm;