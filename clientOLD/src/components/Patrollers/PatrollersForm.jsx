import React, { useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, Container } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';

const AddPatrollerForm = () => {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const positionRef = useRef();
	// eslint-disable-next-line
	const { fetchPatrollers, handleCreatePatroller } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const firstName = firstNameRef.current.value;
		const lastName = lastNameRef.current.value;
		const position = positionRef.current.value;
		const patroller = { firstName, lastName, position };
		try {
			await handleCreatePatroller(patroller);
			firstNameRef.current.value = '';
			lastNameRef.current.value = '';
			positionRef.current.value = '';
			fetchPatrollers();
			setSnackbarSeverity('success');
			setSnackbarMessage(`${firstName} ${lastName} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating patroller', error);
			setOpenSnackbar(true);
			setSnackbarMessage(`Error creating ${firstName} ${lastName}`);
		}
	};

	return (
		<Card>
			<CardContent>
				<Container maxWidth="sm">
					<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
						<Stack spacing={2}>
							<TextField label="First Name" inputRef={firstNameRef} required />
							<TextField label="Last Name" inputRef={lastNameRef} required />
							<TextField label="Position" inputRef={positionRef} required />
							<Box mt={2}>
								<Button type="submit" variant="contained" fullWidth>
									Add Patroller
								</Button>
							</Box>
						</Stack>
					</Box>
				</Container>
			</CardContent>
		</Card>
	);
};

export default AddPatrollerForm;
