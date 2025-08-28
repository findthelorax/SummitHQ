import axios from 'axios';
import type { MountainFull, WeatherDTO, EmployeeMountainAssignmentDTO, LocationDTO, LiftCheckDTO, EquipmentDTO } from '../types/index';

export type MountainInputPayload = {
    name: string;
    city: string;
    state: string;
    latitude: number | null;
    longitude: number | null;
    height: number | null;
    phoneNumber?: string;
    address?: string;
    zipcode?: string;
    openingDate?: string;
    closingDate?: string;
};

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const mountainApi = {
    async createMountain(mountain: MountainInputPayload) {
        const res = await axios.post<MountainFull>(url(`/api/mountains`), mountain);
        return res.data;
    },

    async getAllMountains() {
        const res = await axios.get<MountainFull[]>(url(`/api/mountains`));
        return res.data;
    },

    async getMountain(mountainId: string) {
        const res = await axios.get<MountainFull>(url(`/api/mountains/${mountainId}`));
        return res.data;
    },

    async updateMountain(mountainId: string, updated: Partial<MountainInputPayload>) {
        const res = await axios.put<MountainFull>(url(`/api/mountains/${mountainId}`), updated);
        return res.data;
    },

    async deleteMountain(mountainId: string) {
        const res = await axios.delete<MountainFull>(url(`/api/mountains/${mountainId}`));
        return res.data;
    },

    async deleteAllMountains() {
        const res = await axios.delete<MountainFull[]>(url(`/api/mountains`));
        return res.data;
    },

    // --- New endpoints for related data ---

    async getWeather(mountainId: string, params?: { limit?: number; offset?: number; order?: 'asc' | 'desc' }) {
        const res = await axios.get<WeatherDTO[]>(url(`/api/mountains/${mountainId}/weather`), { params });
        return res.data;
    },

    async getEmployees(mountainId: string, params?: { limit?: number; offset?: number }) {
        const res = await axios.get<EmployeeMountainAssignmentDTO[]>(url(`/api/mountains/${mountainId}/employees`), { params });
        return res.data;
    },

	async getEquipment(mountainId: string, params?: { limit?: number; offset?: number }) {
		const res = await axios.get<EquipmentDTO[]>(url(`/api/mountains/${mountainId}/equipment`), { params });
		return res.data;
	},

    async getLocations(mountainId: string, params?: { limit?: number; offset?: number }) {
        const res = await axios.get<LocationDTO[]>(url(`/api/mountains/${mountainId}/locations`), { params });
        return res.data;
    },

    async getLiftChecks(mountainId: string, params?: { limit?: number; offset?: number }) {
        const res = await axios.get<LiftCheckDTO[]>(url(`/api/mountains/${mountainId}/lift-checks`), { params });
        return res.data;
    },

    // Add similar methods for aidRoomChecks, hutChecks, trailChecks, equipmentChecks, incidents, etc.
};