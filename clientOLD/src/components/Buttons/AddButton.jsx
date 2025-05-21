import React from 'react';
import { Button } from '@mui/material';

const AddButton = (props) => {
    const { onClick } = props;

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            size="small"
            style={{ fontSize: 12, padding: 5, marginBottom: 5}}
        >
            Add
        </Button>
    );
};

export default AddButton;