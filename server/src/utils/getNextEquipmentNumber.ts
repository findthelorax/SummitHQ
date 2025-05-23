import { prisma } from '../config/database.js';

export async function getNextEquipmentNumber(mountainId?: string): Promise<number> {
	const equipments = await prisma.equipment.findMany({
		where: mountainId ? { mountainId } : {},
		select: { number: true },
		orderBy: { number: 'asc' },
	});

	const usedNumbers = equipments
		.map((e) => e.number)
		.filter((n): n is number => typeof n === 'number')
		.sort((a, b) => a - b);

	let next = 1;
	for (const num of usedNumbers) {
		if (num === next) {
			next++;
		} else if (num > next) {
			break;
		}
	}
	return next;
}