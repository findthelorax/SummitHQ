import React, { useContext } from 'react';
import { DateContext } from '../../contexts/DateContext';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField, InputLabel, FormControl } from '@mui/material';

const DatePickerDesktop = () => {
    const { selectedDate, handleDateChange } = useContext(DateContext);

    return (
        <FormControl fullWidth>
            <InputLabel>Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    inputFormat="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    slots={{
                        textField: TextField,
                    }}
                />
            </LocalizationProvider>
        </FormControl>
    );
};

export default DatePickerDesktop;