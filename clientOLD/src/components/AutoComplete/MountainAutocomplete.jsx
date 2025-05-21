import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const MountainAutocomplete = ({ options, selectedValue, setSelectedValue, label }) => {
	return (
		<Autocomplete
			id={`${label.toLowerCase()}-autocomplete`}
			options={options || []}
			getOptionLabel={(option) => option && option.name ? option.name : ""}
			value={selectedValue}
			onChange={(event, newValue) => {
				setSelectedValue(newValue);
			}}
			isOptionEqualToValue={(option, value) => option._id === value._id}
			autoHighlight
			autoSelect
			noOptionsText={`No ${label.toLowerCase()}s available`}
			renderInput={(params) => <TextField {...params} label={label} required />}
		/>
	);
};

export default MountainAutocomplete;