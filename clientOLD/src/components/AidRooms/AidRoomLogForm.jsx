import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Stack, Card, CardContent, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PatrollerAutocomplete from '../AutoComplete/PatrollerAutocomplete';
import MountainAutocomplete from '../AutoComplete/MountainAutocomplete';

const AddAidRoomLogForm = () => {
	const [notes, setNotes] = useState('');
    const [selectedFirstAidRoom, setSelectedFirstAidRoom] = useState(null);
    const [selectedPatroller, setSelectedPatroller] = useState(null);
    const [paperwork, setPaperwork] = useState({
        tenFifties: false,
        collisionCards: false,
        witnessContact: false,
        infractionCards: false,
        ambulanceForm: false,
        rentalForms: false,
    });
    const { selectedMountain, fetchMountains, aidRooms, handleCreateAidRoomLog } = useContext(MountainContext);
    const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

    const handleCheckboxChange = (event) => {
        setPaperwork({ ...paperwork, [event.target.name]: event.target.checked });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await handleCreateAidRoomLog(selectedMountain._id, selectedFirstAidRoom._id, { 
                notes, 
                paperwork,
                equipmentCheckedLog: [{ 
                    checked: true, 
                    checkedOn: new Date(), 
                    checkedBy: selectedPatroller._id 
                }]
            });
            setNotes('');
            setSelectedFirstAidRoom(null);
            setSelectedPatroller(null);
            setPaperwork({
                tenFifties: false,
                collisionCards: false,
                witnessContact: false,
                infractionCards: false,
                ambulanceForm: false,
                rentalForms: false,
            });
            fetchMountains();
            setSnackbarSeverity('success');
            setSnackbarMessage('Aid room log created successfully');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error creating aidRoom log', error);
            setSnackbarSeverity('error');
            setSnackbarMessage('Error creating aid room log');
            setOpenSnackbar(true);
        }
    };

    return (
        <Card>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={2}>
                        <MountainAutocomplete
                            options={aidRooms}
                            selectedValue={selectedFirstAidRoom}
                            setSelectedValue={setSelectedFirstAidRoom}
                            label="First Aid Room"
                        />
                        <PatrollerAutocomplete 
                            selectedPatroller={selectedPatroller}
                            setSelectedPatroller={setSelectedPatroller}
                        />
                        <FormControl>
                            <FormControlLabel
                                control={<Checkbox checked={paperwork.tenFifties} onChange={handleCheckboxChange} name="tenFifties" />}
                                label="Ten Fifties"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={paperwork.collisionCards} onChange={handleCheckboxChange} name="collisionCards" />}
                                label="Collision Cards"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={paperwork.witnessContact} onChange={handleCheckboxChange} name="witnessContact" />}
                                label="Witness Contact"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={paperwork.infractionCards} onChange={handleCheckboxChange} name="infractionCards" />}
                                label="Infraction Cards"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={paperwork.ambulanceForm} onChange={handleCheckboxChange} name="ambulanceForm" />}
                                label="Ambulance Form"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={paperwork.rentalForms} onChange={handleCheckboxChange} name="rentalForms" />}
                                label="Rental Forms"
                            />
                        </FormControl>
						<TextField
							label="Notes"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							required
							multiline
						/>
                        <Button type="submit" variant="contained">
                            Add First Aid Room Log
                        </Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddAidRoomLogForm;