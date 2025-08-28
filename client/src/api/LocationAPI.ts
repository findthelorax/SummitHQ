import { apiClient } from './apiConfig';
import type { LocationDTO, HoursDTO, IncidentDTO, EquipmentDTO, AreaDTO, LocationFull } from '../types/index';
import type { LOCATION_TYPE } from '../types/generated-enums';

export type LocationInputPayload = {
    name: string;
    entityId: string;
    entityType: LOCATION_TYPE;
    areaId?: string | null;
};

export const locationApi = {
    async createLocation(mountainId: string, location: LocationInputPayload) {
        const res = await apiClient.post<LocationDTO>(`/api/mountains/${mountainId}/locations`, location);
        return res.data;
    },

    async getLocations(mountainId: string) {
        const res = await apiClient.get<LocationDTO[]>(`/api/mountains/${mountainId}/locations`);
        return res.data;
    },

    async getLocation(mountainId: string, locationId: string) {
        const res = await apiClient.get<LocationFull>(`/api/mountains/${mountainId}/locations/${locationId}`);
        return res.data;
    },

    async updateLocation(mountainId: string, locationId: string, updated: Partial<LocationInputPayload>) {
        const res = await apiClient.put<LocationDTO>(`/api/mountains/${mountainId}/locations/${locationId}`, updated);
        return res.data;
    },

    async deleteLocation(mountainId: string, locationId: string) {
        const res = await apiClient.delete<LocationDTO>(`/api/mountains/${mountainId}/locations/${locationId}`);
        return res.data;
    },

    async addLocationHours(
        mountainId: string,
        locationId: string,
        hours: Omit<HoursDTO, 'id' | 'locationId' | 'location' | 'createdAt' | 'updatedAt'>
    ) {
        const res = await apiClient.post<HoursDTO>(`/api/mountains/${mountainId}/locations/${locationId}/hours`, hours);
        return res.data;
    },

    async getLocationHours(mountainId: string, locationId: string) {
        const res = await apiClient.get<HoursDTO[]>(`/api/mountains/${mountainId}/locations/${locationId}/hours`);
        return res.data;
    },

    async updateLocationHour(mountainId: string, locationId: string, hourId: string, updated: Partial<HoursDTO>) {
        const res = await apiClient.put<HoursDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/hours/${hourId}`,
            updated
        );
        return res.data;
    },

    async deleteLocationHour(mountainId: string, locationId: string, hourId: string) {
        const res = await apiClient.delete<HoursDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/hours/${hourId}`
        );
        return res.data;
    },

    async addIncidentToLocation(
        mountainId: string,
        locationId: string,
        incident: Omit<
            IncidentDTO,
            'id' | 'mountainId' | 'locationId' | 'location' | 'employees' | 'incidentEquipmentUsageLog'
        >
    ) {
        const res = await apiClient.post<IncidentDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/incidents`,
            incident
        );
        return res.data;
    },

    async getLocationIncidents(mountainId: string, locationId: string) {
        const res = await apiClient.get<IncidentDTO[]>(`/api/mountains/${mountainId}/locations/${locationId}/incidents`);
        return res.data;
    },

    async updateLocationIncident(
        mountainId: string,
        locationId: string,
        incidentId: string,
        updated: Partial<IncidentDTO>
    ) {
        const res = await apiClient.put<IncidentDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/incidents/${incidentId}`,
            updated
        );
        return res.data;
    },

    async deleteIncidentFromLocation(mountainId: string, locationId: string, incidentId: string) {
        const res = await apiClient.delete<IncidentDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/incidents/${incidentId}`
        );
        return res.data;
    },

    async getEquipmentByLocation(mountainId: string, locationId: string) {
        const res = await apiClient.get<EquipmentDTO[]>(`/api/mountains/${mountainId}/locations/${locationId}/equipment`);
        return res.data;
    },

    async addEquipmentToLocation(mountainId: string, locationId: string, equipmentId: string) {
        const res = await apiClient.post<EquipmentDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`
        );
        return res.data;
    },

    async moveEquipmentToLocation(
        mountainId: string,
        locationId: string,
        equipmentId: string,
        data: { fromLocationId: string }
    ) {
        const res = await apiClient.patch<EquipmentDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`,
            data
        );
        return res.data;
    },

    async updateEquipmentInLocation(
        mountainId: string,
        locationId: string,
        equipmentId: string,
        updated: Partial<EquipmentDTO>
    ) {
        const res = await apiClient.put<EquipmentDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`,
            updated
        );
        return res.data;
    },

    async deleteEquipmentFromLocation(mountainId: string, locationId: string, equipmentId: string) {
        const res = await apiClient.delete<EquipmentDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`
        );
        return res.data;
    },

    async addAreaToLocation(mountainId: string, locationId: string, areaId: string) {
        const res = await apiClient.post<AreaDTO>(`/api/mountains/${mountainId}/locations/${locationId}/areas/${areaId}`);
        return res.data;
    },

    async updateAreaInLocation(mountainId: string, locationId: string, areaId: string, updated: Partial<AreaDTO>) {
        const res = await apiClient.put<AreaDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/areas/${areaId}`,
            updated
        );
        return res.data;
    },

    async removeAreaFromLocation(mountainId: string, locationId: string, areaId: string) {
        const res = await apiClient.delete<AreaDTO>(
            `/api/mountains/${mountainId}/locations/${locationId}/areas/${areaId}`
        );
        return res.data;
    },
};