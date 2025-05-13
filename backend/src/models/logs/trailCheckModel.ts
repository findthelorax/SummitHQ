import { prisma } from '../../config/database';

class TrailCheckModel {
    static async create(data: any) {
        return await prisma.trailCheck.create({ data });
    }

    static async findById(id: string) {
        return await prisma.trailCheck.findUnique({ where: { id } });
    }

    static async findAll() {
        return await prisma.trailCheck.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.trailCheck.findMany({ where: { mountainId } });
    }

    static async updateById(id: string, updatedData: any) {
        return await prisma.trailCheck.update({
            where: { id },
            data: updatedData,
        });
    }

    static async deleteById(id: string) {
        return await prisma.trailCheck.delete({ where: { id } });
    }
}

export default TrailCheckModel;