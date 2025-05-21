import { Button } from '@mui/material';
import { api } from '../../api/IncidentLogAPI';
import { useState } from 'react';
import ConfirmationDialog from '../Dashboard/ConfirmationDialog';

const DeleteButton = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            await api.deleteLog(props.mountainId, props.data.id);
            props.clicked(props.data.id);
        } catch (error) {
            console.error(`Error deleting log with id ${props.data.id}`, error);
        }
        handleClose();
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>Delete</Button>
            <ConfirmationDialog
                open={open}
                handleClose={handleClose}
                handleConfirm={handleDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this log?"
            />
        </div>
    );
};

export default DeleteButton;