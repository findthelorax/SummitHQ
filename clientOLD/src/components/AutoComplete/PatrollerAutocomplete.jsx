import React, { useContext } from 'react';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const PatrollerAutocomplete = ({ selectedPatroller, setSelectedPatroller }) => {
	const { patrollers } = useContext(MountainContext);

	const filterOptions = createFilterOptions({
		matchFrom: 'any',
		stringify: (option) => `${option.firstName} ${option.lastName}`,
	});

	return (
		<Autocomplete
			id="patroller-autocomplete"
			value={selectedPatroller}
			options={patrollers}
			onChange={(event, newValue) => {
				setSelectedPatroller(newValue);
			}}
			autoHighlight
			autoSelect
			noOptionsText="No Patrollers Found"
			renderInput={(params) => <TextField {...params} label="Patroller" placeholder="Select Patroller" />}
			getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
			filterOptions={filterOptions}
		/>
	);
};

export default PatrollerAutocomplete;
