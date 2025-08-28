import { useState, useEffect, useCallback } from 'react';
import { incidentApi } from '../api/IncidentAPI';
import type { IncidentDTO } from '../types/index';
import type { IncidentInputPayload } from '../api/IncidentAPI';

export function useIncidents(mountainId?: string) {
    const [incidents, setIncidents] = useState<IncidentDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchIncidents = useCallback(async () => {
        if (!mountainId) return;
        setIsLoading(true);
        try {
            const data = await incidentApi.getIncidents(mountainId);
            setIncidents(data);
        } finally {
            setIsLoading(false);
        }
    }, [mountainId]);

    useEffect(() => {
        fetchIncidents();
    }, [fetchIncidents]);

    const createIncident = useCallback(
        async (input: IncidentInputPayload) => {
            if (!mountainId) return;
            await incidentApi.createIncident(mountainId, input);
            await fetchIncidents();
        },
        [fetchIncidents, mountainId]
    );

    const updateIncident = useCallback(
        async (incidentId: string, updated: Partial<IncidentInputPayload>) => {
            if (!mountainId) return Promise.reject('No mountainId');
            const updatedIncident = await incidentApi.updateIncident(mountainId, incidentId, updated);
            await fetchIncidents();
            return updatedIncident;
        },
        [fetchIncidents, mountainId]
    );

    const deleteIncident = useCallback(
        async (incidentId: string) => {
            if (!mountainId) return;
            await incidentApi.deleteIncident(mountainId, incidentId);
            await fetchIncidents();
        },
        [fetchIncidents, mountainId]
    );

    return {
        incidents,
        isLoading,
        fetchIncidents,
        createIncident,
        updateIncident,
        deleteIncident,
    };
}