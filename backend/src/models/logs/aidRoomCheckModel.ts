import { prisma } from '../../config/database';

class AidRoomCheckModel {
    static async create(data: any) {
        return await prisma.aidRoomCheck.create({ data });
    }

    static async findById(id: string) {
        return await prisma.aidRoomCheck.findUnique({ where: { id } });
    }

    static async findAll() {
        return await prisma.aidRoomCheck.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.aidRoomCheck.findMany({ where: { mountainId } });
    }

    static async updateById(id: string, updatedData: any) {
        return await prisma.aidRoomCheck.update({
            where: { id },
            data: updatedData,
        });
    }

    static async deleteById(id: string) {
        return await prisma.aidRoomCheck.delete({ where: { id } });
    }
}

export default AidRoomCheckModel;