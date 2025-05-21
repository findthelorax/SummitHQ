import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimeUpdateDialog from './TimeUpdateDialog';

export default function CurrentTimeButton({ onConfirm, existingTime }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleIconClick = () => {
        if (existingTime) {
            setDialogOpen(true);
        } else {
            onConfirm();
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogConfirm = () => {
        onConfirm();
        setDialogOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleIconClick} color='primary'>
                <AccessTimeIcon />
            </IconButton>
            <TimeUpdateDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={handleDialogConfirm}
                existingTime={existingTime}
            />
        </>
    );
}