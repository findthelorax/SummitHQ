import * as React from 'react';
import { useState, useContext } from 'react';
import { Button, Box, Checkbox, FormControlLabel, Card, CardContent } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import PatrollerAutocomplete from '../AutoComplete/PatrollerMultiSelectAutocomplete';
import IncidentField from '../Incidents/IncidentField';
import LocationField from '../Location/LocationField';
import TimePickerField from '../Incidents/TimePickerField';
import { useFetchLogs } from '../../hooks/usseFetchLogs';

const IncidentForm = () => {
	const { selectedMountain, api } = useContext(MountainContext);
	// eslint-disable-next-line
	const [gridApi, setGridApi] = useState(null);
	const [locationType, setLocationType] = useState('Trail');
	const [location, setLocation] = useState(null);
	const [otherLocation, setOtherLocation] = useState('');
	const [selectedPatrollers, setSelectedPatrollers] = useState([]);
	const { rowData, setRowData } = useFetchLogs(selectedMountain);
	const [newRow, setNewRow] = useState({
		callTime: '',
		incident: '',
		location: '',
		patrollers: '',
		onSceneTime: '',
		stableTime: '',
		transportTime: '',
		dryRun: false,
	});

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

	const handleSubmit = async () => {
		if (
			!(newRow.callTime instanceof Date && !isNaN(newRow.callTime)) ||
			(!newRow.dryRun &&
				(!(newRow.onSceneTime instanceof Date && !isNaN(newRow.onSceneTime)) ||
					!(newRow.stableTime instanceof Date && !isNaN(newRow.stableTime)) ||
					!(newRow.transportTime instanceof Date && !isNaN(newRow.transportTime))))
		) {
			alert('Please enter a valid date.');
			return;
		}

		const patrollers = selectedPatrollers.map((patroller) => patroller._id);

		setNewRow((prevState) => ({
			...prevState,
			patrollers: patrollers,
		}));

		try {
			if (selectedMountain && selectedMountain._id) {
				await api.createLog(selectedMountain._id, { ...newRow, patrollers });
			}
		} catch (error) {
			console.error('Error creating log', error);
		}

		setRowData((prevState) => [newRow, ...prevState]);
		setSelectedPatrollers([]);
		setNewRow({
			callTime: '',
			incident: '',
			location: '',
			patrollers: '',
			onSceneTime: '',
			stableTime: '',
			transportTime: '',
			dryRun: false,
		});
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
        callTime: '',
        incident: '',
        location: '',
        patrollers: '',
        onSceneTime: '',
        stableTime: '',
        transportTime: '',
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
