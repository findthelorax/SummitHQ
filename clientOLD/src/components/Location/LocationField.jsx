import { useContext } from 'react';
import { Box, TextField } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import LocationTypeAutocomplete from '../AutoComplete/LocationTypeAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const LocationField = ({ locationType, setLocationType, location, setLocation, setNewRow, otherLocation, setOtherLocation }) => {
    const { locations, locationTypes } = useContext(MountainContext);
    const locationsArray = locations[locationType] || [];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <LocationTypeAutocomplete
                locationType={locationType}
                setLocationType={setLocationType}
                setLocation={setLocation}
                options={locationTypes}
                defaultLocationType="Trail"
            />
            {locationType !== 'Other' ? (
                <MountainAutocomplete
                    options={locationsArray}
                    selectedValue={location}
                    setSelectedValue={(selectedLocation) => {
                        if (selectedLocation) {
                            setLocation(selectedLocation);
                            setNewRow((prevState) => ({
                                ...prevState,
                                location: selectedLocation.name,
                            }));
                        } else {
                            setLocation(null);
                            setNewRow((prevState) => ({
                                ...prevState,
                                location: null,
                            }));
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
                        setNewRow((prevState) => ({
                            ...prevState,
                            location: e.target.value,
                        }));
                    }}
                    required
                />
            )}
        </Box>
    );
};

export default LocationField;