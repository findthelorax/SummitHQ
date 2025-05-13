import { prisma } from '../../config/database';

class LiftCheckModel {
    static async create(data: any) {
        return await prisma.liftCheck.create({ data });
    }

    static async findById(id: string) {
        return await prisma.liftCheck.findUnique({ where: { id } });
    }

    static async findAll() {
        return await prisma.liftCheck.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.liftCheck.findMany({ where: { mountainId } });
    }

    static async updateById(id: string, updatedData: any) {
        return await prisma.liftCheck.update({
            where: { id },
            data: updatedData,
        });
    }

    static async deleteById(id: string) {
        return await prisma.liftCheck.delete({ where: { id } });
    }
}

export default LiftCheckModel;