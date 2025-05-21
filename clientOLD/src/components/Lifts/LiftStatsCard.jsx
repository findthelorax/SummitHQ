import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

function LiftStatsCard() {
    const { lifts } = useContext(MountainContext);
    
    const totalLifts = lifts.length;
    const openLifts = lifts.filter(lift => lift.status === 'open').length;
    const percentOpen = (openLifts / totalLifts) * 100;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Lift Stats
                </Typography>
                <Typography color="textSecondary">
                    Total Lifts: {totalLifts}
                </Typography>
                <Typography color="textSecondary">
                    Open Lifts: {openLifts}
                </Typography>
                <Typography color="textSecondary">
                    Percent Open: {percentOpen}%
                </Typography>
            </CardContent>
        </Card>
    );
}

export default LiftStatsCard;