import { prisma } from '../../config/database';

class HutCheckModel {
    static async create(data: any) {
        return await prisma.hutCheck.create({ data });
    }

    static async findById(id: string) {
        return await prisma.hutCheck.findUnique({ where: { id } });
    }

    static async findAll() {
        return await prisma.hutCheck.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.hutCheck.findMany({ where: { mountainId } });
    }

    static async updateById(id: string, updatedData: any) {
        return await prisma.hutCheck.update({
            where: { id },
            data: updatedData,
        });
    }

    static async deleteById(id: string) {
        return await prisma.hutCheck.delete({ where: { id } });
    }
}

export default HutCheckModel;