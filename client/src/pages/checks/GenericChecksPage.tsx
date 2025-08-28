import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ListSubheader,
    CircularProgress
} from '@mui/material';
import { useMountain } from '../../contexts/MountainContext';

interface GenericChecksPageProps<T> {
    entityName: string;
    useEntities: (mountainId: string | undefined) => { [key: string]: any };
    entityKey: string;
    isLoadingKey: string;
    ChecksGrid: React.ComponentType<{ mountainId: string; entityId: string }>;
}

export function GenericChecksPage<T>({
    entityName,
    useEntities,
    entityKey,
    isLoadingKey,
    ChecksGrid,
}: GenericChecksPageProps<T>) {
    const { selectedMountain } = useMountain();
    const mountainId = selectedMountain?.id;
    const [selectedEntityId, setSelectedEntityId] = useState<string | undefined>(undefined);

    // Use the provided hook to get entities and loading state
    const entitiesResult = useEntities(mountainId);
    // Expecting each entity to have: { id, name, aidRoom: { location: { area: { name } } } }
    const entities = entitiesResult[entityKey] as any[]; // Use 'any' for flexibility
    const isLoading = entitiesResult[isLoadingKey] as boolean;

    const handleChange = (event: any) => {
        setSelectedEntityId(event.target.value as string);
    };

    // Group and sort entities by area
    const groupedEntities = React.useMemo(() => {
        if (!entities) return {};
        const groups: { [area: string]: any[] } = {};
        entities.forEach((entity) => {
            // Get area name from nested structure, fallback to 'Other'
            const areaName =
                entity.aidRoom?.location?.area?.name ||
                entity.location?.area?.name ||
                'Other';
            if (!groups[areaName]) groups[areaName] = [];
            groups[areaName].push(entity);
        });
        // Sort entities within each area
        Object.keys(groups).forEach(area => {
            groups[area].sort((a, b) => {
                const nameA = a.aidRoom?.name || a.name;
                const nameB = b.aidRoom?.name || b.name;
                return nameA.localeCompare(nameB);
            });
        });
        return groups;
    }, [entities]);

    // Sort area names alphabetically
    const sortedAreas = Object.keys(groupedEntities).sort((a, b) => a.localeCompare(b));

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                {entityName} Checks
            </Typography>
            <FormControl fullWidth sx={{ mb: 3, maxWidth: 400 }}>
                <InputLabel id={`${entityName.toLowerCase()}-select-label`}>Select a {entityName}</InputLabel>
                <Select
                    labelId={`${entityName.toLowerCase()}-select-label`}
                    value={selectedEntityId || ''}
                    label={`Select a ${entityName}`}
                    onChange={handleChange}
                    disabled={!mountainId || isLoading}
                >
                    {isLoading && (
                        <MenuItem value="">
                            <CircularProgress size={20} />
                            <em style={{ marginLeft: 8 }}>Loading {entityName.toLowerCase()}s...</em>
                        </MenuItem>
                    )}
                    {!isLoading && sortedAreas.map(area => [
                        <ListSubheader key={area}>{area}</ListSubheader>,
                        groupedEntities[area].map(entity => (
                            <MenuItem key={entity.id} value={entity.id}>
                                {entity.aidRoom?.name || entity.name}
                            </MenuItem>
                        ))
                    ])}
                </Select>
            </FormControl>
            {mountainId && selectedEntityId ? (
                <ChecksGrid mountainId={mountainId} entityId={selectedEntityId} />
            ) : (
                <Typography>Please select a {entityName.toLowerCase()} to view its checks.</Typography>
            )}
        </Box>
    );
}