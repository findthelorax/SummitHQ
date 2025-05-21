import React, { useContext } from 'react';
import { DateContext } from '../../contexts/DateContext';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, FormControl } from '@mui/material';

const DatePickerMobile = () => {
    const { selectedDate, handleDateChange, openDatePicker, setOpenDatePicker } = useContext(DateContext);

    return (
        <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    inputFormat="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    open={openDatePicker} // Pass open prop to MobileDatePicker
                    slots={{
                        textField: props => <TextField {...props} label="Date" InputLabelProps={{ shrink: true }} />, // Set label here
                    }}
                    sx={{ 
                        marginRight: 2,
                        maxWidth: 140,
                        '& .MuiInputBase-root': {
                            height: '40px',
                            fontSize: '0.875rem',
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '6px 14px',
                        },
                        '& .MuiInputLabel-root': {
                            transform: 'translate(14px, 9px) scale(1)',
                        },
                        '& .MuiInputLabel-shrink': {
                            transform: 'translate(14px, -6px) scale(0.75)',
                        },
                    }}
                    onOpen={() => setOpenDatePicker(true)}
                    onClose={() => setOpenDatePicker(false)}
                />
            </LocalizationProvider>
        </FormControl>
    );
};

export default DatePickerMobile;