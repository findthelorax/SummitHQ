import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';
import EquipmentModel from '../../models/equipment/equipmentModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class EquipmentController {
	createEquipment = asyncWrapper(async (req: Request, res: Response) => {
		const { mountainId } = req.params;
		const data = req.body;

		const result = await EquipmentModel.create(data, mountainId);
		res.status(201).json(result);
	});

	// getEquipments = asyncWrapper(async (req: Request, res: Response) => {
	// 	const { mountainId } = req.params;
	// 	const equipment = await EquipmentModel.findAllByMountain(mountainId);
	// 	res.status(200).json(equipment);
	// });

	getEquipments = asyncWrapper(async (req: Request, res: Response) => {
		const { mountainId } = req.query;

		const equipment = mountainId
			? await EquipmentModel.findAllByMountain(mountainId as string)
			: await EquipmentModel.findAll();

		res.status(200).json(equipment);
	});

	getEquipment = asyncWrapper(async (req: Request, res: Response) => {
		const { mountainId, equipmentId } = req.params;
		const result = await EquipmentModel.findByIdAndMountain(equipmentId, mountainId);
		if (!result) {
			res.status(404).json({ message: 'Equipment not found' });
			return;
		}
		res.status(200).json(result);
	});

	updateEquipment = asyncWrapper(async (req: Request, res: Response) => {
		const { mountainId, equipmentId } = req.params;
		const updatedData = req.body;

		const result = await EquipmentModel.updateByMountain(equipmentId, mountainId, updatedData);
		if (!result) {
			res.status(404).json({ message: 'Equipment not found' });
			return;
		}

		res.status(200).json(result);
	});

	deleteEquipment = asyncWrapper(async (req: Request, res: Response) => {
		const { mountainId, equipmentId } = req.params;

		const deleted = await EquipmentModel.deleteByMountain(equipmentId, mountainId);
		if (!deleted) {
			res.status(404).json({ message: 'Equipment not found' });
			return;
		}

		res.status(204).send();
	});

	assignEquipmentToMountain = asyncWrapper(async (req: Request, res: Response) => {
		const { mountainId, equipmentId } = req.params;

		const mountain = await prisma.mountain.findUnique({ where: { id: mountainId } });
		if (!mountain) {
			res.status(404).json({ message: 'Mountain not found' });
			return;
		}

		const equipment = await prisma.equipment.findUnique({ where: { id: equipmentId } });
		if (!equipment) {
			res.status(404).json({ message: 'Equipment not found' });
			return;
		}

		const updated = await prisma.equipment.update({
			where: { id: equipmentId },
			data: { mountainId },
		});

		res.status(201).json(updated);
	});

	removeEquipmentFromMountain = asyncWrapper(async (req: Request, res: Response) => {
		const { mountainId, equipmentId } = req.params;

		const equipment = await prisma.equipment.findFirst({
			where: { id: equipmentId, mountainId },
		});
		if (!equipment) {
			res.status(404).json({ message: 'Equipment not found for this mountain' });
			return;
		}

		const updated = await prisma.equipment.update({
			where: { id: equipmentId },
			data: { mountainId: undefined },
		});

		res.status(200).json(updated);
	});

	assignToLocation = asyncWrapper(async (req: Request, res: Response) => {
		const { equipmentId, mountainId, locationId } = req.params;

		// Ensure the location belongs to the specified mountain
		const location = await prisma.location.findFirst({
			where: { id: locationId, mountainId },
		});
		if (!location) {
			res.status(404).json({ message: 'Location not found for this mountain' });
			return;
		}

		// Assign equipment to location
		const updated = await EquipmentModel.assignToLocation(equipmentId, locationId, mountainId);
		if (!updated) {
			res.status(404).json({ message: 'Equipment or Location not found' });
			return;
		}
		res.status(200).json(updated);
	});

	removeFromLocation = asyncWrapper(async (req: Request, res: Response) => {
		const { equipmentId, mountainId, locationId } = req.params;

		// Ensure the location belongs to the specified mountain
		const location = await prisma.location.findFirst({
			where: { id: locationId, mountainId },
		});
		if (!location) {
			res.status(404).json({ message: 'Location not found for this mountain' });
			return;
		}

		// Remove equipment from location
		const updated = await EquipmentModel.removeFromLocation(equipmentId, locationId, mountainId);
		if (!updated) {
			res.status(404).json({ message: 'Equipment not found' });
			return;
		}
		res.status(200).json(updated);
	});

	moveToLocation = asyncWrapper(async (req: Request, res: Response) => {
		const { equipmentId, mountainId } = req.params;
		const { newLocationId } = req.body;

		// Ensure the new location belongs to the specified mountain
		const location = await prisma.location.findFirst({
			where: { id: newLocationId, mountainId },
		});
		if (!location) {
			res.status(404).json({ message: 'New location not found for this mountain' });
			return;
		}

		// Move equipment to new location
		const updated = await EquipmentModel.moveToLocation(equipmentId, newLocationId, mountainId);
		if (!updated) {
			res.status(404).json({ message: 'Equipment or Location not found' });
			return;
		}
		res.status(200).json(updated);
	});
}

export default new EquipmentController();
