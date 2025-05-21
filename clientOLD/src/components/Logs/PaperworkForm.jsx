import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { api } from '../../api/PaperworkAPI';

const AddPaperworkForm = () => {
    const [title, setTitle] = useState('');
    const { setOpenSnackbar, setSnackbarMessage } = useContext(SnackbarContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const paperwork = { title, description };
            await api.createPaperwork(paperwork);
            setTitle('');
        } catch (error) {
            console.error('Error creating paperwork', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <Button type="submit" variant="contained">Add Paperwork</Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddPaperworkForm;