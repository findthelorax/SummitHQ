import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddEquipmentLogForm = () => {
	const [notes, setNotes] = useState('');
	const [checkedOn, setCheckedOn] = useState(null);
	const [selectedEquipment, setSelectedEquipment] = useState(null);
	const [selectedPatroller, setSelectedPatroller] = useState(null);
	const { selectedMountain, fetchMountains, equipment, handleCreateEquipmentLog } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await handleCreateEquipmentLog(selectedMountain.id, selectedEquipment.id, {
				notes,
				checkedOn,
				checkedBy: selectedPatroller.id,
			});
			setNotes('');
			setSelectedEquipment(null);
			setSelectedPatroller(null);
			setCheckedOn(null);
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage('Equipment log created successfully');
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating equipment log', error);
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating equipment log');
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<MountainAutocomplete
							options={equipment}
							selectedValue={selectedEquipment}
							setSelectedValue={setSelectedEquipment}
							label="Equipment"
						/>
						<PatrollerAutocomplete
							selectedPatroller={selectedPatroller}
							setSelectedPatroller={setSelectedPatroller}
						/>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								label="Checked On"
								inputFormat="MM/dd/yyyy"
								value={checkedOn}
								onChange={(newValue) => {
									setCheckedOn(newValue);
								}}
								slots={{
									textField: TextField,
								}}
							/>
						</LocalizationProvider>
						<TextField
							label="Notes"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							required
							multiline
						/>
						<Button type="submit" variant="contained">
							Add Equipment Log
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddEquipmentLogForm;
