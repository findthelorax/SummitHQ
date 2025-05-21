import * as React from 'react';
import { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CurrentTimeButton from './CurrentTimeButton';

export default function IncidentLogTimePicker({ label, name, handleTimeChange, clear }) {
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        if (clear) {
            setSelectedTime(null);
            handleTimeChange(name, null);
        }
    }, [clear]);

    const setCurrentTime = () => {
        setSelectedTime(new Date());
        handleTimeChange(name, new Date());
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CurrentTimeButton onConfirm={setCurrentTime} existingTime={selectedTime}/>
            <TimePicker
                label={label}
                value={selectedTime}
                views={['hours', 'minutes', 'seconds']}
                sx={{ 
                    marginLeft: -1.5,
                    maxWidth: 120,
                    '& .MuiInputBase-root': {
                        height: '80px',
                        fontSize: '0.875rem',
                    },
                    '& .MuiInputAdornment-root': {
                        display: 'none',
                    },
                }}
                onChange={(time) => {
                    console.log("🚀 ~ file: IncidentLogTimePicker.jsx:42 ~ IncidentLogTimePicker ~ time:", time)
                    setSelectedTime(time);
                    handleTimeChange(name, time);
                }}
            />
        </LocalizationProvider>
    );
}