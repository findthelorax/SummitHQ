import { apiClient } from './apiConfig';
import type { IncidentDTO, EmployeeDTO } from '../types/index';
import { INCIDENT_STATUS } from '../types/generated-enums';

export type IncidentInputPayload = {
    description?: string;
    status?: INCIDENT_STATUS;
    latitude?: number | null;
    longitude?: number | null;
    locationId?: string;
    mountainId?: string;
    callTime?: string | null;
    onSceneTime?: string | null;
    stableTime?: string | null;
    transportTime?: string | null;
    emptyRun?: boolean;
    emptyRunAt?: Date;
    employees?: EmployeeDTO[];
    incidentEquipmentUsageLog?: {
        equipmentId: string;
        quantity: number;
    }[];
};

function toIncidentStatus(status: any): INCIDENT_STATUS {
    if (Object.values(INCIDENT_STATUS).includes(status)) return status as INCIDENT_STATUS;
    return INCIDENT_STATUS[status as keyof typeof INCIDENT_STATUS] ?? INCIDENT_STATUS.IN_PROGRESS;
}

export const incidentApi = {
    async createIncident(mountainId: string, incident: IncidentInputPayload) {
        const payload = {
            ...incident,
            status: incident.status ? toIncidentStatus(incident.status) : INCIDENT_STATUS.REPORTED,
        };
        const res = await apiClient.post<IncidentDTO>(`/api/mountains/${mountainId}/incidents`, payload);
        return res.data;
    },

    async assignEmployee(mountainId: string, incidentId: string, employeeId: string) {
        const res = await apiClient.patch<IncidentDTO>(
            `/api/mountains/${mountainId}/incidents/${incidentId}/assign-employee`,
            { employeeId }
        );
        return res.data;
    },

    async updateAssignedEmployee(mountainId: string, incidentId: string, employeeId: string) {
        const res = await apiClient.put<IncidentDTO>(
            `/api/mountains/${mountainId}/incidents/${incidentId}/update-employee`,
            { employeeId }
        );
        return res.data;
    },

    async getIncidents(mountainId: string) {
        const res = await apiClient.get<IncidentDTO[]>(`/api/mountains/${mountainId}/incidents`);
        return res.data;
    },

    async getIncident(mountainId: string, incidentId: string) {
        const res = await apiClient.get<IncidentDTO>(`/api/mountains/${mountainId}/incidents/${incidentId}`);
        return res.data;
    },

    async updateIncident(mountainId: string, incidentId: string, updated: Partial<IncidentInputPayload>) {
        const payload = {
            ...updated,
            ...(updated.status ? { status: toIncidentStatus(updated.status) } : {}),
        };
        const res = await apiClient.put<IncidentDTO>(`/api/mountains/${mountainId}/incidents/${incidentId}`, payload);
        return res.data;
    },

    async deleteIncident(mountainId: string, incidentId: string) {
        const res = await apiClient.delete(`/api/mountains/${mountainId}/incidents/${incidentId}`);
        return res.data;
    },
};