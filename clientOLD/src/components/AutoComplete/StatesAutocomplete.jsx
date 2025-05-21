import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const StateAutocomplete = ({ state, setState }) => {
    return (
        <Autocomplete
            id="state-autocomplete"
            options={states}
            value={state}
            onChange={(event, newValue) => {
                setState(newValue);
            }}
            autoHighlight
            autoSelect
            renderInput={(params) => <TextField {...params} label="State" required />}
        />
    );
};

export default StateAutocomplete;