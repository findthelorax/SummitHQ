import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddHutForm = () => {
	const nameRef = useRef();
	const [selectedArea, setSelectedArea] = useState(null);
	const { fetchMountains, areas, handleCreateHut } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const name = nameRef.current.value;
		const hut = { name, area: selectedArea._id };
		try {
			await handleCreateHut(hut);
			setSelectedArea(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage(`${hut.name} created successfully`);
			setOpenSnackbar(true);
			nameRef.current.value = '';
		} catch (error) {
			console.error('Error creating hut', error);
			setSnackbarSeverity('error');
			setSnackbarMessage(`Error creating ${hut.name}`);
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
							Add Hut
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddHutForm;