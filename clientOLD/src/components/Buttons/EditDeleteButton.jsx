import React from 'react';
import { Button, Box } from '@mui/material';

const EditDeleteButton = (props) => {
    const { onClick } = props;

    const handleEditClick = () => {
        onClick('edit');
    };

    const handleDeleteClick = () => {
        onClick('delete');
    };

    return (
        <Box display="flex" alignItems="center" height="100%" gap={1}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleEditClick}
                size="small"
                style={{ fontSize: 12, padding: 5 }}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteClick}
                size="small"
                style={{ fontSize: 12, padding: 5 }}
            >
                Delete
            </Button>
        </Box>
    );
};

export default EditDeleteButton;