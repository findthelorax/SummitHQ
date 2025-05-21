import React, { useContext } from 'react';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const PatrollerAutocomplete = ({ selectedPatrollers, setSelectedPatrollers, handlePatrollerChange }) => {
	const { patrollers } = useContext(MountainContext);

	const filterOptions = createFilterOptions({
		matchFrom: 'any',
		stringify: (option) => `${option.firstName} ${option.lastName}`,
	});

	return (
		<Autocomplete
			multiple
			id="patroller-autocomplete"
			value={selectedPatrollers}
			options={patrollers}
			onChange={handlePatrollerChange}
			autoHighlight
			autoSelect
			noOptionsText="No Patrollers Found"
			renderInput={(params) => <TextField {...params} label="Patrollers" placeholder="Select Patrollers" />}
			getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
			filterOptions={filterOptions}
		/>
	);
};

export default PatrollerAutocomplete;