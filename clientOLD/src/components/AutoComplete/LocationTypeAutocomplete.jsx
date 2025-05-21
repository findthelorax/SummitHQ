import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

const LocationTypeAutocomplete = ({ locationType, setLocationType, setLocation, defaultLocationType }) => {
	const { locationTypes } = useContext(MountainContext);
	const [localLocationType, setLocalLocationType] = useState(defaultLocationType || null);
	
	useEffect(() => {
		if (locationType !== undefined && locationType !== null) {
			setLocalLocationType(locationType);
		}
	}, [locationType]);

	return (
		<Autocomplete
			id="location-type-autocomplete"
			options={locationTypes || []}
			value={localLocationType}
			onChange={(event, newValue) => {
				setLocalLocationType(newValue);
				setLocationType(newValue);
				setLocation(null);
			}}
			autoHighlight
			autoSelect
			noOptionsText="No location types available"
			renderInput={(params) => (
				<TextField {...params} label="Location Type" required />
			)}
		/>
	);
};

export default LocationTypeAutocomplete;