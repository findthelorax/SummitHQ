import { prisma } from '../../config/database.js';

class HutCheckModel {
    static async create(data: any) {
        return await prisma.hutCheck.create({ data });
    }

    static async findByIdAndMountainAndHut(id: string, mountainId: string, hutId: string) {
        return await prisma.hutCheck.findFirst({
            where: {
                id,
                mountainId,
                hutId,
            },
            include: {
                employee: {
                    select: { firstName: true, lastName: true, primaryDepartment: true },
                },
            },
        });
    }

    static async findAllByMountainAndHut(mountainId: string, hutId: string) {
        return await prisma.hutCheck.findMany({
            where: {
                mountainId,
                hutId,
            },
            include: {
                employee: {
                    select: { firstName: true, lastName: true, primaryDepartment: true },
                },
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.hutCheck.findMany({
            where: {
                mountainId,
            },
            include: {
                hut: { select: { name: true } },
                employee: {
                    select: { firstName: true, lastName: true, primaryDepartment: true },
                },
            },
        });
    }

    static async updateByIdAndMountainAndHut(id: string, mountainId: string, hutId: string, updatedData: any) {
        return await prisma.hutCheck.update({
            where: {
                id,
                mountainId,
                hutId,
            },
            data: updatedData,
        });
    }

    static async deleteByIdAndMountainAndHut(id: string, mountainId: string, hutId: string) {
        return await prisma.hutCheck.delete({
            where: {
                id,
                mountainId,
                hutId,
            },
        });
    }
}

export default HutCheckModel;