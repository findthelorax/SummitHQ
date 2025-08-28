import { useState, useEffect, useCallback } from 'react';
import { locationApi, LocationInputPayload } from '../api/LocationAPI';
import type { LocationDTO, HoursDTO, IncidentDTO, EquipmentDTO, AreaDTO } from '../types/index';
import { LOCATION_TYPE } from '../types/generated-enums';

function toSharedLocationType(type: any): LOCATION_TYPE {
    if (Object.values(LOCATION_TYPE).includes(type)) return type as LOCATION_TYPE;
    return LOCATION_TYPE[type as keyof typeof LOCATION_TYPE];
}

export function useLocations(mountainId: string | undefined) {
    const [locations, setLocations] = useState<LocationDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLocations = useCallback(async () => {
        if (!mountainId) {
            setLocations([]);
            return;
        }
        setIsLoading(true);
        try {
            const data = await locationApi.getLocations(mountainId);
            setLocations(data);
        } finally {
            setIsLoading(false);
        }
    }, [mountainId]);

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    const getLocationById = useCallback(async (locationId: string) => {
        if (!mountainId) return null;
        return locationApi.getLocation(mountainId, locationId);
    }, [mountainId]);

    const createLocation = useCallback(async (location: LocationInputPayload) => {
        if (!mountainId) return;
        const payload = {
            ...location,
            entityType: toSharedLocationType(location.entityType),
        };
        await locationApi.createLocation(mountainId, payload);
        await fetchLocations();
    }, [mountainId, fetchLocations]);

    const updateLocation = useCallback(async (locationId: string, updated: Partial<LocationDTO>) => {
        if (!mountainId) return;
        const { name, entityId, entityType, areaId } = updated;
        const payload: Partial<LocationInputPayload> = {
            ...(name !== undefined ? { name } : {}),
            ...(entityId !== undefined ? { entityId } : {}),
            ...(entityType !== undefined ? { entityType: toSharedLocationType(entityType) } : {}),
            ...(areaId !== undefined ? { areaId } : {}),
        };
        await locationApi.updateLocation(mountainId, locationId, payload);
        await fetchLocations();
    }, [mountainId, fetchLocations]);

    const deleteLocation = useCallback(async (locationId: string) => {
        if (!mountainId) return;
        await locationApi.deleteLocation(mountainId, locationId);
        await fetchLocations();
    }, [mountainId, fetchLocations]);

    // --- HOURS ---
    const addLocationHours = useCallback(async (
        locationId: string,
        hours: Omit<HoursDTO, 'id' | 'locationId' | 'location' | 'createdAt' | 'updatedAt'>
    ) => {
        if (!mountainId) return;
        return locationApi.addLocationHours(mountainId, locationId, hours);
    }, [mountainId]);

    const getLocationHours = useCallback(async (locationId: string) => {
        if (!mountainId) return [];
        return locationApi.getLocationHours(mountainId, locationId);
    }, [mountainId]);

    const updateLocationHour = useCallback(async (
        locationId: string,
        hourId: string,
        updated: Partial<HoursDTO>
    ) => {
        if (!mountainId) return;
        return locationApi.updateLocationHour(mountainId, locationId, hourId, updated);
    }, [mountainId]);

    const deleteLocationHour = useCallback(async (locationId: string, hourId: string) => {
        if (!mountainId) return;
        return locationApi.deleteLocationHour(mountainId, locationId, hourId);
    }, [mountainId]);

    // --- INCIDENTS ---
    const addIncidentToLocation = useCallback(async (
        locationId: string,
        incident: Omit<IncidentDTO, 'id' | 'mountainId' | 'locationId' | 'location' | 'employees' | 'incidentEquipmentUsageLog'>
    ) => {
        if (!mountainId) return;
        return locationApi.addIncidentToLocation(mountainId, locationId, incident);
    }, [mountainId]);

    const getLocationIncidents = useCallback(async (locationId: string) => {
        if (!mountainId) return [];
        return locationApi.getLocationIncidents(mountainId, locationId);
    }, [mountainId]);

    const updateLocationIncident = useCallback(async (
        locationId: string,
        incidentId: string,
        updated: Partial<IncidentDTO>
    ) => {
        if (!mountainId) return;
        return locationApi.updateLocationIncident(mountainId, locationId, incidentId, updated);
    }, [mountainId]);

    const deleteIncidentFromLocation = useCallback(async (locationId: string, incidentId: string) => {
        if (!mountainId) return;
        return locationApi.deleteIncidentFromLocation(mountainId, locationId, incidentId);
    }, [mountainId]);

    // --- EQUIPMENT ---
    const getEquipmentByLocation = useCallback(async (locationId: string) => {
        if (!mountainId) return [];
        return locationApi.getEquipmentByLocation(mountainId, locationId);
    }, [mountainId]);

    const addEquipmentToLocation = useCallback(async (locationId: string, equipmentId: string) => {
        if (!mountainId) return;
        return locationApi.addEquipmentToLocation(mountainId, locationId, equipmentId);
    }, [mountainId]);

    const moveEquipmentToLocation = useCallback(async (
        locationId: string,
        equipmentId: string,
        data: { fromLocationId: string }
    ) => {
        if (!mountainId) return;
        return locationApi.moveEquipmentToLocation(mountainId, locationId, equipmentId, data);
    }, [mountainId]);

    const updateEquipmentInLocation = useCallback(async (
        locationId: string,
        equipmentId: string,
        updated: Partial<EquipmentDTO>
    ) => {
        if (!mountainId) return;
        return locationApi.updateEquipmentInLocation(mountainId, locationId, equipmentId, updated);
    }, [mountainId]);

    const deleteEquipmentFromLocation = useCallback(async (locationId: string, equipmentId: string) => {
        if (!mountainId) return;
        return locationApi.deleteEquipmentFromLocation(mountainId, locationId, equipmentId);
    }, [mountainId]);

    // --- AREAS ---
    const addAreaToLocation = useCallback(async (locationId: string, areaId: string) => {
        if (!mountainId) return;
        return locationApi.addAreaToLocation(mountainId, locationId, areaId);
    }, [mountainId]);

    const updateAreaInLocation = useCallback(async (
        locationId: string,
        areaId: string,
        updated: Partial<AreaDTO>
    ) => {
        if (!mountainId) return;
        return locationApi.updateAreaInLocation(mountainId, locationId, areaId, updated);
    }, [mountainId]);

    const removeAreaFromLocation = useCallback(async (locationId: string, areaId: string) => {
        if (!mountainId) return;
        return locationApi.removeAreaFromLocation(mountainId, locationId, areaId);
    }, [mountainId]);

    return {
        locations,
        isLoading,
        fetchLocations,
        getLocationById,
        createLocation,
        updateLocation,
        deleteLocation,
        // hours
        addLocationHours,
        getLocationHours,
        updateLocationHour,
        deleteLocationHour,
        // incidents
        addIncidentToLocation,
        getLocationIncidents,
        updateLocationIncident,
        deleteIncidentFromLocation,
        // equipment
        getEquipmentByLocation,
        addEquipmentToLocation,
        moveEquipmentToLocation,
        updateEquipmentInLocation,
        deleteEquipmentFromLocation,
        // areas
        addAreaToLocation,
        updateAreaInLocation,
        removeAreaFromLocation,
    };
}