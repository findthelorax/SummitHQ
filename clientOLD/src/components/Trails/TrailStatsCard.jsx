import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { MountainContext } from '../../contexts/MountainContext';

function TrailStatsCard() {
    const { trails } = useContext(MountainContext);
    
    const totalTrails = trails.length;
    const openTrails = trails.filter(trail => trail.status === 'open').length;
    const percentOpen = (openTrails / totalTrails) * 100;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Trail Stats
                </Typography>
                <Typography color="textSecondary">
                    Total Trails: {totalTrails}
                </Typography>
                <Typography color="textSecondary">
                    Open Trails: {openTrails}
                </Typography>
                <Typography color="textSecondary">
                    Percent Open: {percentOpen}%
                </Typography>
            </CardContent>
        </Card>
    );
}

export default TrailStatsCard;