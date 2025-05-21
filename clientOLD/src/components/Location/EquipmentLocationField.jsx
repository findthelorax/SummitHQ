import { Box, TextField } from '@mui/material';
import LocationTypeAutocomplete from '../AutoComplete/LocationTypeAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';
import { useContext } from 'react';
import { MountainContext } from '../../contexts/MountainContext';

const LocationField = ({ locationType, setLocationType, location, setLocation, otherLocation, setOtherLocation }) => {
	const { locations } = useContext(MountainContext);
	const locationsArray = locations[locationType] || [];

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<LocationTypeAutocomplete
				locationType={locationType}
				setLocationType={setLocationType}
				setLocation={setLocation}
			/>
			{locationType !== 'Other' ? (
				<MountainAutocomplete
					options={locationsArray}
					selectedValue={location}
					setSelectedValue={(selectedLocation) => {
						if (selectedLocation) {
							setLocation(selectedLocation);
						} else {
							setLocation(null);
						}
					}}
					label="Location"
				/>
			) : (
				<TextField
					label="Other Location"
					value={otherLocation}
					onChange={(e) => {
						setOtherLocation(e.target.value);
					}}
					required
				/>
			)}
		</Box>
	);
};

export default LocationField;