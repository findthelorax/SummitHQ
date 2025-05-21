import React, { useContext } from 'react';
import { MountainContext } from '../../contexts/MountainContext';
import { Card, CardContent, Typography } from '@mui/material';

const PatrolDispatcherDisplay = () => {
    const { currentDayPatrolDispatcher } = useContext(MountainContext);
    console.log("🚀 ~ file: PatrolDispatcherDisplay.jsx:7 ~ PatrolDispatcherDisplay ~ currentDayPatrolDispatcher:", currentDayPatrolDispatcher)

    return (
        <Card style={{ width: '220px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent>
                <Typography variant="body2" component="p">
                    {currentDayPatrolDispatcher ? `${currentDayPatrolDispatcher.firstName} ${currentDayPatrolDispatcher.lastName}` : 'No patrol dispatcher today.'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PatrolDispatcherDisplay;