import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, MenuItem } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddTrailForm = () => {
	const nameRef = useRef();
	const [selectedArea, setSelectedArea] = useState(null);
	const [difficulty, setDifficulty] = useState('');
	const [type, setType] = useState('');
	const { areas, handleCreateTrail } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const name = nameRef.current.value;
		const trail = { name, areaId: selectedArea._id, difficulty, type };
		try {
			await handleCreateTrail(trail);
			nameRef.current.value = '';
			setSelectedArea(null);
			setDifficulty('');
			setType('');
			setSnackbarSeverity('success');
			setSnackbarMessage(`${trail.name} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating trail', error);
			setSnackbarSeverity('error');
			setSnackbarMessage(`Error creating ${trail.name}`);
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<TextField label="Name" inputRef={nameRef} required />
						<MountainAutocomplete
							options={areas}
							selectedValue={selectedArea}
							setSelectedValue={setSelectedArea}
							label="Area"
						/>
						<TextField
							select
							label="Difficulty"
							value={difficulty}
							onChange={(e) => setDifficulty(e.target.value)}
							required
						>
							<MenuItem value={'Green'}>Green</MenuItem>
							<MenuItem value={'Blue'}>Blue</MenuItem>
							<MenuItem value={'Black'}>Black</MenuItem>
							<MenuItem value={'Double Black'}>Double Black</MenuItem>
						</TextField>
						<TextField select label="Type" value={type} onChange={(e) => setType(e.target.value)} required>
							<MenuItem value={'Glades'}>Glades</MenuItem>
							<MenuItem value={'Moguls'}>Moguls</MenuItem>
							<MenuItem value={'Natural'}>Natural</MenuItem>
							<MenuItem value={'Race'}>Race</MenuItem>
							<MenuItem value={'Park'}>Park</MenuItem>
							<MenuItem value={'Groomed'}>Groomed</MenuItem>
						</TextField>
						<Button type="submit" variant="contained">
							Add Trail
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddTrailForm;
