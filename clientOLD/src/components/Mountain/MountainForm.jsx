import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Card, CardContent, Stack } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import StateAutocomplete from '../AutoComplete/StatesAutocomplete';

const AddMountainForm = () => {
	const nameRef = useRef();
    const cityRef = useRef();
	const [state, setState] = useState(null);
	const { fetchMountains, api } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
        const name = nameRef.current.value;
        const city = cityRef.current.value;
		const mountain = {
			name,
			location: {
				city,
				state,
			},
		};
		try {
			await api.mountainApi.createMountain(mountain);
            nameRef.current.value = '';
            cityRef.current.value = '';
			setState(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage(`${mountain.name} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error(`Error creating ${mountain.name}`, error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating mountain');
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
                        <TextField label="Name" inputRef={nameRef} required />
                        <TextField label="City" inputRef={cityRef} required />
						<StateAutocomplete state={state} setState={setState} />
						<Button type="submit" variant="contained">
							Add Mountain
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddMountainForm;