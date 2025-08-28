import { prisma } from '../../config/database.js';

class TrailCheckModel {
    static async create(data: any) {
        return await prisma.trailCheck.create({ data });
    }

    static async findByIdAndMountainAndTrail(id: string, mountainId: string, trailId: string) {
        return await prisma.trailCheck.findFirst({
            where: {
                id,
                mountainId,
                trailId,
            },
            include: {
                employee: {
                    select: { firstName: true, lastName: true, primaryDepartment: true },
                },
            },
        });
    }

    static async findAllByMountainAndTrail(mountainId: string, trailId: string) {
        return await prisma.trailCheck.findMany({
            where: {
                mountainId,
                trailId,
            },
            include: {
                employee: {
                    select: { firstName: true, lastName: true, primaryDepartment: true },
                },
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.trailCheck.findMany({
            where: {
                mountainId,
            },
            include: {
                trail: { select: { name: true } },
                employee: {
                    select: { firstName: true, lastName: true, primaryDepartment: true },
                },
            },
        });
    }
    
    static async updateByIdAndMountainAndTrail(id: string, mountainId: string, trailId: string, updatedData: any) {
        return await prisma.trailCheck.update({
            where: {
                id,
                mountainId,
                trailId,
            },
            data: updatedData,
        });
    }

    static async deleteByIdAndMountainAndTrail(id: string, mountainId: string, trailId: string) {
        return await prisma.trailCheck.delete({
            where: {
                id,
                mountainId,
                trailId,
            },
        });
    }
}

export default TrailCheckModel;