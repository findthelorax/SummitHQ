import { apiClient } from './apiConfig';
import type { AidRoomDTO, AidRoomCheckDTO } from '../types/index';
import type { STATUS } from '../types/generated-enums';

export type AidRoomInputPayload = {
    name: string;
    status: STATUS;
    latitude: number | null;
    longitude: number | null;
    areaId?: string;
};

export type AidRoomCheckInputPayload = {
    employeeId: string;
    equipmentIssues: boolean;
    equipmentNotes: string;
    paperworkStocked: boolean;
    notes: string;
};

export const aidRoomApi = {
    async createAidRoom(mountainId: string, aidRoom: AidRoomInputPayload, areaId?: string) {
        const payload = areaId ? { ...aidRoom, areaId } : aidRoom;
        const res = await apiClient.post<AidRoomDTO>(`/api/mountains/${mountainId}/aidRooms`, payload);
        return res.data;
    },

    async getAidRooms(mountainId: string) {
        const res = await apiClient.get<AidRoomDTO[]>(`/api/mountains/${mountainId}/aidRooms`);
        return res.data;
    },

    async getAllAidRooms() {
        const res = await apiClient.get<AidRoomDTO[]>(`/api/aidRooms`);
        return res.data;
    },

    async getAidRoom(mountainId: string, aidRoomId: string) {
        const res = await apiClient.get<AidRoomDTO>(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}`);
        return res.data;
    },

    async updateAidRoom(mountainId: string, aidRoomId: string, updated: Partial<AidRoomInputPayload>) {
        const res = await apiClient.put<AidRoomDTO>(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}`, updated);
        return res.data;
    },

    async deleteAidRoom(mountainId: string, aidRoomId: string) {
        const res = await apiClient.delete<AidRoomDTO>(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}`);
        return res.data;
    },

    async createAidRoomCheck(
        mountainId: string,
        aidRoomId: string,
        check: Partial<AidRoomCheckInputPayload>
    ) {
        const res = await apiClient.post<AidRoomCheckDTO>(
            `/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks`,
            check
        );
        return res.data;
    },

    async getAidRoomChecks(mountainId: string, aidRoomId: string) {
        const res = await apiClient.get<AidRoomCheckDTO[]>(
            `/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks`
        );
        return res.data;
    },

    async getAidRoomCheck(mountainId: string, aidRoomId: string, aidRoomCheckId: string) {
        const res = await apiClient.get<AidRoomCheckDTO>(
            `/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks/${aidRoomCheckId}`
        );
        return res.data;
    },

    async updateAidRoomCheck(
        mountainId: string,
        aidRoomId: string,
        aidRoomCheckId: string,
        updated: Partial<AidRoomCheckDTO>
    ) {
        const res = await apiClient.put<AidRoomCheckDTO>(
            `/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks/${aidRoomCheckId}`,
            updated
        );
        return res.data;
    },

    async deleteAidRoomCheck(mountainId: string, aidRoomId: string, aidRoomCheckId: string) {
        const res = await apiClient.delete<AidRoomCheckDTO>(
            `/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks/${aidRoomCheckId}`
        );
        return res.data;
    },

    async getAllAidRoomChecks(mountainId: string) {
        const res = await apiClient.get<AidRoomCheckDTO[]>(`/api/mountains/${mountainId}/aidRoomChecks`);
        return res.data;
    },
};