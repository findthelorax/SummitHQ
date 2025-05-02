import { prisma } from '../config/database';

class IncidentModel {
    static async create(mountainId: string, data: any) {
        const createData: any = {
            ...data,
            mountainId,
            locationType: data.locationType?.toUpperCase(),
        };

        switch (data.locationType?.toUpperCase()) {
            case "LIFT":
                if (data.liftId) {
                    createData.lift = { connect: { id: data.liftId } };
                }
                break;
            case "TRAIL":
                if (data.trailId) {
                    createData.trail = { connect: { id: data.trailId } };
                }
                break;
            case "LODGE":
                if (data.lodgeId) {
                    createData.lodge = { connect: { id: data.lodgeId } };
                }
                break;
            case "HUT":
                if (data.hutId) {
                    createData.hut = { connect: { id: data.hutId } };
                }
                break;
            case "AID_ROOM":
                if (data.aidRoomId) {
                    createData.aidRoom = { connect: { id: data.aidRoomId } };
                }
                break;
            case "OTHER":
                break;
        }

        return await prisma.incident.create({
            data: createData,
        });
    }

    static async assignEmployee(incidentId: string, employeeId: string) {
        return await prisma.incident.update({
            where: { id: incidentId },
            data: { employeeId },
        });
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.incident.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.incident.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        const updateData: any = {
            ...updatedData,
            locationType: updatedData.locationType?.toUpperCase(),
        };

        switch (updatedData.locationType?.toUpperCase()) {
            case "LIFT":
                updateData.lift = updatedData.liftId
                    ? { connect: { id: updatedData.liftId } }
                    : { disconnect: true };
                break;
            case "TRAIL":
                updateData.trail = updatedData.trailId
                    ? { connect: { id: updatedData.trailId } }
                    : { disconnect: true };
                break;
            case "LODGE":
                updateData.lodge = updatedData.lodgeId
                    ? { connect: { id: updatedData.lodgeId } }
                    : { disconnect: true };
                break;
            case "HUT":
                updateData.hut = updatedData.hutId
                    ? { connect: { id: updatedData.hutId } }
                    : { disconnect: true };
                break;
            case "AID_ROOM":
                updateData.aidRoom = updatedData.aidRoomId
                    ? { connect: { id: updatedData.aidRoomId } }
                    : { disconnect: true };
                break;
            case "OTHER":
                updateData.lift = { disconnect: true };
                updateData.trail = { disconnect: true };
                updateData.lodge = { disconnect: true };
                updateData.hut = { disconnect: true };
                updateData.aidRoom = { disconnect: true };
                break;
        }

        return await prisma.incident.update({
            where: {
                id,
                mountainId,
            },
            data: updateData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.incident.delete({
            where: {
                id,
                mountainId,
            },
        });
    }
}

export default IncidentModel;