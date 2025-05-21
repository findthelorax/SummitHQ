import * as React from 'react';
import { useState } from 'react';
import { Button, Box, Checkbox, FormControlLabel, Card, CardContent } from '@mui/material';
import PatrollerAutocomplete from '../AutoComplete/PatrollerMultiSelectAutocomplete';
import IncidentField from './IncidentField';
import LocationField from '../Location/LocationField';
import TimePickerField from './TimePickerField';

const IncidentForm = ({
	newRow,
	setNewRow,
	handleSubmit,
	selectedPatrollers,
	setSelectedPatrollers,
}) => {
	// eslint-disable-next-line
	const [gridApi, setGridApi] = useState(null);
	const [locationType, setLocationType] = useState('Trail');
	const [location, setLocation] = useState(null);
	const [otherLocation, setOtherLocation] = useState('');

	const handleTimeChange = (name, time) => {
		if (time !== null) {
			setNewRow((prevState) => ({
				...prevState,
				[name]: time,
			}));
		} else {
			setNewRow((prevState) => ({
				...prevState,
				[name]: null,
			}));
		}
	};
	
	const handleTimestamp = (field) => {
		const timestamp = new Date();
		const formattedTimestamp = timestamp.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});

		// If there is already a timestamp, ask the user for confirmation before overwriting it
		if (newRow[field] && !window.confirm('Are you sure you want to overwrite the existing timestamp?')) {
			return;
		}

		setNewRow((prevState) => ({
			...prevState,
			[field]: formattedTimestamp,
		}));

		return formattedTimestamp;
	};
	
	const handlePatrollerChange = (event, newValue) => {
		setSelectedPatrollers(newValue);
		const patrollersString = newValue.map((patroller) => `${patroller.firstName} ${patroller.lastName}`).join(', ');
		const patrollerIds = newValue.map((patroller) => patroller._id);
		setNewRow((prevState) => ({
			...prevState,
			patrollers: patrollersString,
			patrollerIds,
		}));
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setNewRow((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		setNewRow((prevState) => ({
			...prevState,
			[name]: checked,
			onSceneTime: checked ? null : prevState.onSceneTime,
			stableTime: checked ? null : prevState.stableTime,
			transportTime: checked ? null : prevState.transportTime,
		}));
	};

	const clearForm = () => {
		setNewRow({
			dryRun: false,
		});
		setLocationType('Trail');
		setLocation(null);
		setOtherLocation('');
		setSelectedPatrollers([]);
	};

	return (
		<Card>
			<CardContent style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
				<TimePickerField
					label="Call Time"
					name="callTime"
					value={newRow.callTime}
					handleTimeChange={handleTimeChange}
				/>

				<LocationField
					locationType={locationType}
					setLocationType={setLocationType}
					location={location}
					setLocation={setLocation}
					setNewRow={setNewRow}
					otherLocation={otherLocation}
					setOtherLocation={setOtherLocation}
				/>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<IncidentField newRow={newRow} setNewRow={setNewRow} handleInputChange={handleInputChange} />

					<PatrollerAutocomplete
						selectedPatrollers={selectedPatrollers}
						setSelectedPatrollers={setSelectedPatrollers}
						handlePatrollerChange={handlePatrollerChange}
					/>
				</Box>
				<TimePickerField
					label="On Scene"
					name="onSceneTime"
					handleTimeChange={handleTimeChange}
					clear={newRow.dryRun}
				/>
				<TimePickerField
					label="Stable"
					name="stableTime"
					handleTimeChange={handleTimeChange}
					clear={newRow.dryRun}
				/>
				<TimePickerField
					label="Transport"
					name="transportTime"
					handleTimeChange={handleTimeChange}
					clear={newRow.dryRun}
				/>
				<FormControlLabel
					control={<Checkbox checked={newRow.dryRun} onChange={handleCheckboxChange} name="dryRun" />}
					label="Dry Run"
				/>
				<Button onClick={handleSubmit} variant="contained">
					Submit
				</Button>
				<Button onClick={clearForm} variant="contained">
					Clear
				</Button>
				<Button onClick={() => gridApi && gridApi.exportDataAsCsv()} variant="contained">
					Export
				</Button>
			</CardContent>
		</Card>
	);
};

export default IncidentForm;