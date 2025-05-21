import React, { useState, useContext, useRef } from 'react';
import {
	TextField,
	Button,
	Box,
	Stack,
	Card,
	CardContent,
	FormControl,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';

const AddHutLogForm = () => {
	const [notes, setNotes] = useState('');
	const [selectedHut, setSelectedHut] = useState(null);
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const [cleanedOn, setCleanedOn] = useState(null);
	const [paperwork, setPaperwork] = useState({
		tenFifties: false,
		collisionCards: false,
		witnessContact: false,
		infractionCards: false,
		ambulanceForm: false,
		rentalForms: false,
	});
	const { selectedMountain, fetchMountains, huts, handleCreateHutLog } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleCheckboxChange = (event) => {
		setPaperwork({ ...paperwork, [event.target.name]: event.target.checked });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await handleCreateHutLog(selectedMountain._id, selectedHut._id, {
				notes,
				paperwork,
				cleaningLog: [{ cleanedOn, cleanedBy: selectedPatroller._id }],
			});
			setNotes(null);
			setSelectedHut(null);
			setSelectedPatroller(null);
			setCleanedOn(null);
			setPaperwork({
				tenFifties: false,
				collisionCards: false,
				witnessContact: false,
				infractionCards: false,
				ambulanceForm: false,
				rentalForms: false,
			});
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage('Hut log created successfully');
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating hut log', error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating hut log');
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<MountainAutocomplete
							options={huts}
							selectedValue={selectedHut}
							setSelectedValue={setSelectedHut}
							label="Hut"
						/>
						<PatrollerAutocomplete
							selectedPatroller={selectedPatroller}
							setSelectedPatroller={setSelectedPatroller}
						/>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								label="Cleaned On"
								inputFormat="MM/dd/yyyy"
								value={cleanedOn}
								onChange={(newValue) => {
									setCleanedOn(newValue);
								}}
								slots={{
									textField: TextField,
								}}
							/>
						</LocalizationProvider>
						<FormControl>
							<FormControlLabel
								control={
									<Checkbox
										checked={paperwork.tenFifties}
										onChange={handleCheckboxChange}
										name="tenFifties"
									/>
								}
								label="Ten Fifties"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={paperwork.collisionCards}
										onChange={handleCheckboxChange}
										name="collisionCards"
									/>
								}
								label="Collision Cards"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={paperwork.witnessContact}
										onChange={handleCheckboxChange}
										name="witnessContact"
									/>
								}
								label="Witness Contact"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={paperwork.infractionCards}
										onChange={handleCheckboxChange}
										name="infractionCards"
									/>
								}
								label="Infraction Cards"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={paperwork.ambulanceForm}
										onChange={handleCheckboxChange}
										name="ambulanceForm"
									/>
								}
								label="Ambulance Form"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={paperwork.rentalForms}
										onChange={handleCheckboxChange}
										name="rentalForms"
									/>
								}
								label="Rental Forms"
							/>
						</FormControl>
						<TextField
							label="Notes"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							required
							multiline
						/>
						<Button type="submit" variant="contained">
							Add Hut Log
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddHutLogForm;
