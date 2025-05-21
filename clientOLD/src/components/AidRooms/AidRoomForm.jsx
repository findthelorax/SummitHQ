import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddAidRoomForm = () => {
	const nameRef = useRef();
	const [selectedArea, setSelectedArea] = useState(null);
	const { fetchMountains, areas, handleCreateAidRoom } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const name = nameRef.current.value;
		const aidRoom = { name, area: selectedArea._id };
		try {
			await handleCreateAidRoom(aidRoom);
			nameRef.current.value = '';
			setSelectedArea(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage(`${aidRoom.name} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error(`Error creating ${aidRoom.name}`, error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating aid room');
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
							Add First Aid Room
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddAidRoomForm;