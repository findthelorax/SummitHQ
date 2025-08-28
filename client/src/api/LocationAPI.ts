import axios from 'axios';
import type { LocationDTO, HoursDTO, IncidentDTO, EquipmentDTO, AreaDTO, LocationFull } from '../types/index';
import type { LOCATION_TYPE } from '../types/generated-enums';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;
const url = (path: string) => `${BASE_URL}${path}`;

export type LocationInputPayload = {
    name: string;
    entityId: string;
    entityType: LOCATION_TYPE;
    areaId?: string | null;
};

export const locationApi = {
    async createLocation(mountainId: string, location: LocationInputPayload) {
        const res = await axios.post<LocationDTO>(url(`/api/mountains/${mountainId}/locations`), location);
        return res.data;
    },

    async getLocations(mountainId: string) {
        const res = await axios.get<LocationDTO[]>(url(`/api/mountains/${mountainId}/locations`));
        return res.data;
    },

    async getLocation(mountainId: string, locationId: string) {
        const res = await axios.get<LocationFull>(url(`/api/mountains/${mountainId}/locations/${locationId}`));
        return res.data;
    },

    async updateLocation(mountainId: string, locationId: string, updated: Partial<LocationInputPayload>) {
        const res = await axios.put<LocationDTO>(url(`/api/mountains/${mountainId}/locations/${locationId}`), updated);
        return res.data;
    },

    async deleteLocation(mountainId: string, locationId: string) {
        const res = await axios.delete<LocationDTO>(url(`/api/mountains/${mountainId}/locations/${locationId}`));
        return res.data;
    },

    async addLocationHours(
        mountainId: string,
        locationId: string,
        hours: Omit<HoursDTO, 'id' | 'locationId' | 'location' | 'createdAt' | 'updatedAt'>
    ) {
        const res = await axios.post<HoursDTO>(url(`/api/mountains/${mountainId}/locations/${locationId}/hours`), hours);
        return res.data;
    },

    async getLocationHours(mountainId: string, locationId: string) {
        const res = await axios.get<HoursDTO[]>(url(`/api/mountains/${mountainId}/locations/${locationId}/hours`));
        return res.data;
    },

    async updateLocationHour(mountainId: string, locationId: string, hourId: string, updated: Partial<HoursDTO>) {
        const res = await axios.put<HoursDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/hours/${hourId}`),
            updated
        );
        return res.data;
    },

    async deleteLocationHour(mountainId: string, locationId: string, hourId: string) {
        const res = await axios.delete<HoursDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/hours/${hourId}`)
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
        const res = await axios.post<IncidentDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/incidents`),
            incident
        );
        return res.data;
    },

    async getLocationIncidents(mountainId: string, locationId: string) {
        const res = await axios.get<IncidentDTO[]>(url(`/api/mountains/${mountainId}/locations/${locationId}/incidents`));
        return res.data;
    },

    async updateLocationIncident(
        mountainId: string,
        locationId: string,
        incidentId: string,
        updated: Partial<IncidentDTO>
    ) {
        const res = await axios.put<IncidentDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/incidents/${incidentId}`),
            updated
        );
        return res.data;
    },

    async deleteIncidentFromLocation(mountainId: string, locationId: string, incidentId: string) {
        const res = await axios.delete<IncidentDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/incidents/${incidentId}`)
        );
        return res.data;
    },

    async getEquipmentByLocation(mountainId: string, locationId: string) {
        const res = await axios.get<EquipmentDTO[]>(url(`/api/mountains/${mountainId}/locations/${locationId}/equipment`));
        return res.data;
    },

    async addEquipmentToLocation(mountainId: string, locationId: string, equipmentId: string) {
        const res = await axios.post<EquipmentDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`)
        );
        return res.data;
    },

    async moveEquipmentToLocation(
        mountainId: string,
        locationId: string,
        equipmentId: string,
        data: { fromLocationId: string }
    ) {
        const res = await axios.patch<EquipmentDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`),
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
        const res = await axios.put<EquipmentDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`),
            updated
        );
        return res.data;
    },

    async deleteEquipmentFromLocation(mountainId: string, locationId: string, equipmentId: string) {
        const res = await axios.delete<EquipmentDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`)
        );
        return res.data;
    },

    async addAreaToLocation(mountainId: string, locationId: string, areaId: string) {
        const res = await axios.post<AreaDTO>(url(`/api/mountains/${mountainId}/locations/${locationId}/areas/${areaId}`));
        return res.data;
    },

    async updateAreaInLocation(mountainId: string, locationId: string, areaId: string, updated: Partial<AreaDTO>) {
        const res = await axios.put<AreaDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/areas/${areaId}`),
            updated
        );
        return res.data;
    },

    async removeAreaFromLocation(mountainId: string, locationId: string, areaId: string) {
        const res = await axios.delete<AreaDTO>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/areas/${areaId}`)
        );
        return res.data;
    },

};