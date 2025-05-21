import { prisma } from '../../config/database.js';

class WeatherModel {
    static async create(mountainId: string, data: any) {
        return prisma.weather.create({
            data: {
                ...data,
                mountain: { connect: { id: mountainId } },
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return prisma.weather.findMany({
            where: { mountainId },
            orderBy: { date: 'desc' },
        });
    }

    static async findById(mountainId: string, weatherId: string) {
        return prisma.weather.findFirst({
            where: { id: weatherId, mountainId },
        });
    }

    static async updateById(mountainId: string, weatherId: string, data: any) {
        return prisma.weather.update({
            where: { id: weatherId },
            data,
        });
    }

    static async deleteById(mountainId: string, weatherId: string) {
        return prisma.weather.delete({
            where: { id: weatherId },
        });
    }
}

export default WeatherModel;