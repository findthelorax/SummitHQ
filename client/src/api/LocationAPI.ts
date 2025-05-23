import axios from 'axios';
import type { Location, Hours, Incident, Equipment, Area } from 'shared/types';
import type { LOCATION_TYPE, STATUS } from 'shared/types/enums';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;
const url = (path: string) => `${BASE_URL}${path}`;

export type LocationCreatePayload = {
    name: string;
    entityId: string;
    entityType: LOCATION_TYPE;
    areaId?: string | null;
};

export const locationApi = {
    async createLocation(mountainId: string, location: LocationCreatePayload) {
        const res = await axios.post<Location>(url(`/api/mountains/${mountainId}/locations`), location);
        return res.data;
    },

    async getLocations(mountainId: string) {
        const res = await axios.get<Location[]>(url(`/api/mountains/${mountainId}/locations`));
        return res.data;
    },

    async getLocation(mountainId: string, locationId: string) {
        const res = await axios.get<Location>(url(`/api/mountains/${mountainId}/locations/${locationId}`));
        return res.data;
    },

    async updateLocation(mountainId: string, locationId: string, updated: Partial<LocationCreatePayload>) {
        const res = await axios.put<Location>(url(`/api/mountains/${mountainId}/locations/${locationId}`), updated);
        return res.data;
    },

    async deleteLocation(mountainId: string, locationId: string) {
        const res = await axios.delete<Location>(url(`/api/mountains/${mountainId}/locations/${locationId}`));
        return res.data;
    },

    async addLocationHours(
        mountainId: string,
        locationId: string,
        hours: Omit<Hours, 'id' | 'locationId' | 'location' | 'createdAt' | 'updatedAt'>
    ) {
        const res = await axios.post<Hours>(url(`/api/mountains/${mountainId}/locations/${locationId}/hours`), hours);
        return res.data;
    },

    async getLocationHours(mountainId: string, locationId: string) {
        const res = await axios.get<Hours[]>(url(`/api/mountains/${mountainId}/locations/${locationId}/hours`));
        return res.data;
    },

    async updateLocationHour(mountainId: string, locationId: string, hourId: string, updated: Partial<Hours>) {
        const res = await axios.put<Hours>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/hours/${hourId}`),
            updated
        );
        return res.data;
    },

    async deleteLocationHour(mountainId: string, locationId: string, hourId: string) {
        const res = await axios.delete<Hours>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/hours/${hourId}`)
        );
        return res.data;
    },

    async addIncidentToLocation(
        mountainId: string,
        locationId: string,
        incident: Omit<
            Incident,
            'id' | 'mountainId' | 'locationId' | 'location' | 'employees' | 'incidentEquipmentUsageLog'
        >
    ) {
        const res = await axios.post<Incident>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/incidents`),
            incident
        );
        return res.data;
    },

    async getLocationIncidents(mountainId: string, locationId: string) {
        const res = await axios.get<Incident[]>(url(`/api/mountains/${mountainId}/locations/${locationId}/incidents`));
        return res.data;
    },

    async updateLocationIncident(
        mountainId: string,
        locationId: string,
        incidentId: string,
        updated: Partial<Incident>
    ) {
        const res = await axios.put<Incident>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/incidents/${incidentId}`),
            updated
        );
        return res.data;
    },

    async deleteIncidentFromLocation(mountainId: string, locationId: string, incidentId: string) {
        const res = await axios.delete<Incident>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/incidents/${incidentId}`)
        );
        return res.data;
    },

    async getEquipmentByLocation(mountainId: string, locationId: string) {
        const res = await axios.get<Equipment[]>(url(`/api/mountains/${mountainId}/locations/${locationId}/equipment`));
        return res.data;
    },

    async addEquipmentToLocation(mountainId: string, locationId: string, equipmentId: string) {
        const res = await axios.post<Equipment>(
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
        const res = await axios.patch<Equipment>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`),
            data
        );
        return res.data;
    },

    async updateEquipmentInLocation(
        mountainId: string,
        locationId: string,
        equipmentId: string,
        updated: Partial<Equipment>
    ) {
        const res = await axios.put<Equipment>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`),
            updated
        );
        return res.data;
    },

    async deleteEquipmentFromLocation(mountainId: string, locationId: string, equipmentId: string) {
        const res = await axios.delete<Equipment>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/equipment/${equipmentId}`)
        );
        return res.data;
    },

    async addAreaToLocation(mountainId: string, locationId: string, areaId: string) {
        const res = await axios.post<Area>(url(`/api/mountains/${mountainId}/locations/${locationId}/areas/${areaId}`));
        return res.data;
    },

    async updateAreaInLocation(mountainId: string, locationId: string, areaId: string, updated: Partial<Area>) {
        const res = await axios.put<Area>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/areas/${areaId}`),
            updated
        );
        return res.data;
    },

    async removeAreaFromLocation(mountainId: string, locationId: string, areaId: string) {
        const res = await axios.delete<Area>(
            url(`/api/mountains/${mountainId}/locations/${locationId}/areas/${areaId}`)
        );
        return res.data;
    },

};