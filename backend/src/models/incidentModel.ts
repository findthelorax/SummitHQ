import { prisma } from '../config/database';
import { Status } from '../types';

class Incident {
    static async create(
        mountainId: string,
        data: { description: string; status: Status}
    ) {
        return await prisma.incident.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findById(id: string) {
        return await prisma.incident.findUnique({
            where: { id },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.incident.findMany({
            where: { mountainId },
        });
    }

    static async update(id: string, updatedData: Partial<{ name: string; description: string; status: Status }>) {
        return await prisma.incident.update({
            where: { id },
            data: updatedData,
        });
    }

    static async delete(id: string) {
        return await prisma.incident.delete({
            where: { id },
        });
    }
}

export default Incident;