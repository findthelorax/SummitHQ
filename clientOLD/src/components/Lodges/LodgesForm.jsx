import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddLodgeForm = () => {
	const nameRef = useRef();
	const [selectedArea, setSelectedArea] = useState(null);
	const { fetchMountains, areas, handleCreateLodge } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const name = nameRef.current.value;
		const lodge = { name, area: selectedArea._id };
		try {
			await handleCreateLodge(lodge);
			setSelectedArea(null);
			fetchMountains();
			nameRef.current.value = '';
			setSnackbarSeverity('success');
			setSnackbarMessage(`${lodge.name} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating lodge', error);
			setSnackbarSeverity('error');
			setSnackbarMessage(`Error creating ${lodge.name}`);
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
							Add Lodge
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export { AddLodgeForm };
