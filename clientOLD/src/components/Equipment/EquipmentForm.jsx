import React, { useState, useContext, useRef } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, Select, MenuItem, Typography } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import LocationField from '../Location/EquipmentLocationField';
import { EquipmentTypes } from '../../helpers/constants';

const AddEquipmentForm = () => {
	const [type, setType] = useState('');
	const idNumber = useRef();
	const description = useRef();
	const [locationType, setLocationType] = useState(null);
	const [location, setLocation] = useState(null);
	const [otherLocation, setOtherLocation] = useState('');
	const { fetchMountains, handleCreateEquipment } = useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const locationValue = locationType === 'Other' ? otherLocation : { type: locationType, name: location.name, id: location._id};
		const equipment = { type, idNumber: idNumber.current.value, description: description.current.value, location: locationValue };
		try {
			await handleCreateEquipment(equipment);
			setType('');
			idNumber.current.value = '';
			description.current.value = '';
			setLocationType(null);
			setLocation(null);
			setOtherLocation('');
			fetchMountains();
			setSnackbarSeverity('success');
			setSnackbarMessage(`${equipment.type}:${equipment.idNumber} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			setSnackbarSeverity('error');
			setSnackbarMessage(`Error creating ${equipment.type}:${equipment.idNumber}`);
			setOpenSnackbar(true);
		}
	};

	return (
		<Card>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Stack spacing={2}>
						<Select value={type} onChange={(e) => setType(e.target.value)} required displayEmpty>
							<MenuItem value="" disabled>
								<Typography color="text.secondary" variant="body2">
									Type
								</Typography>
							</MenuItem>
							{Object.values(EquipmentTypes).map((type) => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
						</Select>
						<TextField
							label="IDNumber"
							inputRef={idNumber}
							required
							onKeyDown={(event) => {
								if (!/[0-9]/.test(event.key) && event.key !== 'Tab') {
									event.preventDefault();
								}
							}}
						/>
                        <TextField label="Description" inputRef={description} required multiline />

						<LocationField
							locationType={locationType}
							setLocationType={setLocationType}
							location={location}
							setLocation={setLocation}
							otherLocation={otherLocation}
							setOtherLocation={setOtherLocation}
						/>
						<Button type="submit" variant="contained">
							Add Equipment
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddEquipmentForm;