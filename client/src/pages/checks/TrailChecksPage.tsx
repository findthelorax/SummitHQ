import React, { useState } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { useTrails } from '../../hooks/useTrails';
import { TrailChecksGrid } from '../../components/trail/TrailCheckTableTwo';
import { Select, MenuItem, FormControl, InputLabel, Box, Typography, CircularProgress } from '@mui/material';

const TrailChecksPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const mountainId = selectedMountain?.id;
    const [selectedTrailId, setSelectedTrailId] = useState<string | undefined>(undefined);
    const { trails, isLoadingTrails } = useTrails(mountainId);

    const handleTrailChange = (event: any) => {
        setSelectedTrailId(event.target.value as string);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Trail Checks
            </Typography>
            <FormControl fullWidth sx={{ mb: 3, maxWidth: 400 }}>
                <InputLabel id="trail-select-label">Select a Trail</InputLabel>
                <Select
                    labelId="trail-select-label"
                    value={selectedTrailId || ''}
                    label="Select a Trail"
                    onChange={handleTrailChange}
                    disabled={!mountainId || isLoadingTrails}
                >
                    {isLoadingTrails && (
                        <MenuItem value="">
                            <CircularProgress size={20} />
                            <em style={{ marginLeft: 8 }}>Loading trails...</em>
                        </MenuItem>
                    )}
                    {trails.map((trail) => (
                        <MenuItem key={trail.id} value={trail.id}>
                            {trail.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {mountainId && selectedTrailId ? (
                <TrailChecksGrid mountainId={mountainId} trailId={selectedTrailId} />
            ) : (
                <Typography>Please select a trail to view its checks.</Typography>
            )}
        </Box>
    );
};

export default TrailChecksPage;