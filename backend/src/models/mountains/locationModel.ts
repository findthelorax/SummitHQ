import { prisma } from '../../config/database';

class LocationModel {
	static async create(mountainId: string, data: any) {
		return await prisma.location.create({
			data: {
				...data,
				mountainId,
			},
		});
	}

	static async findByIdAndMountain(locationId: string, mountainId: string) {
		return await prisma.location.findFirst({
			where: {
				id: locationId,
				mountainId,
			},
			include: {
				hours: true,
				equipment: true,
				area: true,
				incidents: true,
				mountain: true,
			},
		});
	}

	static async findAllByMountain(mountainId: string) {
		return await prisma.location.findMany({
			where: { mountainId },
		});
	}

	static async findAll() {
		return await prisma.location.findMany();
	}

	static async updateByMountain(locationId: string, mountainId: string, updatedData: any) {
		return await prisma.location.updateMany({
			where: {
				id: locationId,
				mountainId,
			},
			data: updatedData,
		});
	}

	static async deleteByMountain(locationId: string, mountainId: string) {
		return await prisma.location.deleteMany({
			where: {
				id: locationId,
				mountainId,
			},
		});
	}

	static async getHours(locationId: string) {
		return await prisma.hours.findMany({
			where: { locationId },
		});
	}

	static async addHours(locationId: string, hoursData: any[]) {
		if (!locationId) {
			throw new Error('Location Id is required.');
		}

		const locationExists = await prisma.location.findUnique({
			where: { id: locationId },
		});

		if (!locationExists) {
			throw new Error(`Location with Id ${locationId} does not exist.`);
		}

		const createdHours = [];
		for (const hour of hoursData) {
			const createdHour = await prisma.hours.create({
				data: {
					...hour,
					locationId,
				},
			});
			createdHours.push(createdHour);
		}

		return createdHours;
	}

	static async updateHour(locationId: string, hourId: string, hourData: any) {
		if (!locationId || !hourId) {
			throw new Error('Location Id and Hour Id are required.');
		}

		const existingHour = await prisma.hours.findFirst({
			where: {
				id: hourId,
				locationId,
			},
		});

		if (!existingHour) {
			throw new Error(`Hour with Id ${hourId} for Location Id ${locationId} not found.`);
		}

		return await prisma.hours.update({
			where: {
				id: hourId,
			},
			data: hourData,
		});
	}

	static async deleteHour(locationId: string, hourId: string) {
		return await prisma.hours.deleteMany({
			where: {
				id: hourId,
				locationId,
			},
		});
	}

	static async getIncidents(locationId: string) {
		return await prisma.incident.findMany({
			where: { locationId },
		});
	}

	static async addIncidentToLocation(locationId: string, incidentData: any) {
		const { incidentId } = incidentData;
	
		const locationExists = await prisma.location.findUnique({
			where: { id: locationId },
		});
	
		if (!locationExists) {
			throw new Error(`Location with ID ${locationId} does not exist.`);
		}
	
		const incidentExists = await prisma.incident.findUnique({
			where: { id: incidentId },
		});
	
		if (!incidentExists) {
			throw new Error(`Incident with ID ${incidentId} does not exist.`);
		}
	
		return await prisma.incident.update({
			where: { id: incidentId },
			data: { locationId },
		});
	}

	static async updateIncident(locationId: string, incidentId: string, incidentData: any) {
		return await prisma.incident.updateMany({
			where: {
				id: incidentId,
				locationId,
			},
			data: incidentData,
		});
	}

	static async deleteIncidentFromLocation(locationId: string, incidentId: string) {
		return await prisma.incident.deleteMany({
			where: {
				id: incidentId,
				locationId,
			},
		});
	}

	static async addEquipmentToLocation(mountainId: string, locationId: string, equipmentId: string) {
		const mountainExists = await prisma.mountain.findUnique({
			where: { id: mountainId },
		});

		if (!mountainExists) {
			throw new Error(`Mountain with ID ${mountainId} does not exist.`);
		}

		const locationExists = await prisma.location.findFirst({
			where: { id: locationId, mountainId },
		});

		if (!locationExists) {
			throw new Error(`Location with ID ${locationId} and Mountain ID ${mountainId} does not exist.`);
		}

		const equipmentExists = await prisma.equipment.findUnique({
			where: { id: equipmentId },
		});

		if (!equipmentExists) {
			throw new Error(`Equipment with ID ${equipmentId} does not exist.`);
		}

		return await prisma.equipment.update({
			where: { id: equipmentId },
			data: {
				locationId,
				mountainId,
			},
		});
	}

	static async findEquipmentByLocation(mountainId: string, locationId: string) {
		return await prisma.equipment.findMany({
			where: {
				mountainId,
				locationId,
			},
		});
	}

	static async moveEquipmentToLocation(mountainId: string, currentLocationId: string, newLocationId: string, equipmentId: string) {
		const mountainExists = await prisma.mountain.findUnique({
			where: { id: mountainId },
		});
	
		if (!mountainExists) {
			throw new Error(`Mountain with ID ${mountainId} does not exist.`);
		}
	
		const currentLocationExists = await prisma.location.findFirst({
			where: { id: currentLocationId, mountainId },
		});
	
		if (!currentLocationExists) {
			throw new Error(`Current location with ID ${currentLocationId} and Mountain ID ${mountainId} does not exist.`);
		}
	
		const newLocationExists = await prisma.location.findFirst({
			where: { id: newLocationId, mountainId },
		});
	
		if (!newLocationExists) {
			throw new Error(`New location with ID ${newLocationId} and Mountain ID ${mountainId} does not exist.`);
		}
	
		const equipmentExists = await prisma.equipment.findFirst({
			where: {
				id: equipmentId,
				locationId: currentLocationId,
				mountainId,
			},
		});
	
		if (!equipmentExists) {
			throw new Error(`Equipment with ID ${equipmentId} is not associated with location ID ${currentLocationId} and mountain ID ${mountainId}.`);
		}
	
		return await prisma.equipment.update({
			where: { id: equipmentId },
			data: {
				locationId: newLocationId,
			},
		});
	}

	static async updateEquipmentInLocation(
		mountainId: string,
		locationId: string,
		equipmentId: string,
		updatedData: any
	) {
		return await prisma.equipment.update({
			where: { id: equipmentId },
			data: {
				...updatedData,
				mountainId,
				locationId,
			},
		});
	}

	static async deleteEquipmentFromLocation(mountainId: string, locationId: string, equipmentId: string) {
		const equipment = await prisma.equipment.findFirst({
			where: {
				id: equipmentId,
				mountainId,
				locationId,
			},
		});

		if (!equipment) {
			throw new Error(
				`Equipment with ID ${equipmentId} is not associated with location ID ${locationId} and mountain ID ${mountainId}.`
			);
		}

		return await prisma.equipment.update({
			where: { id: equipmentId },
			data: {
				locationId: null,
			},
		});
	}

	static async addAreaToLocation(mountainId: string, locationId: string, areaId: string) {
		const area = await prisma.area.findUnique({
			where: { id: areaId },
		});
		if (!area) {
			throw new Error(`Area with ID ${areaId} does not exist.`);
		}

		const mountain = await prisma.mountain.findUnique({
			where: { id: mountainId },
		});
		if (!mountain) {
			throw new Error(`Mountain with ID ${mountainId} does not exist.`);
		}

		const location = await prisma.location.findUnique({
			where: { id: locationId },
		});
		if (!location) {
			throw new Error(`Location with ID ${locationId} does not exist.`);
		}

		return await prisma.location.update({
			where: { id: locationId },
			data: {
				area: {
					connect: { id: areaId },
				},
				mountain: {
					connect: { id: mountainId },
				},
			},
		});
	}

	static async updateAreaInLocation(mountainId: string, locationId: string, areaId: string, updatedData: any) {
		const areaExists = await prisma.area.findUnique({
			where: { id: areaId },
		});
		if (!areaExists) {
			throw new Error(`Area with ID ${areaId} does not exist.`);
		}

		const mountainExists = await prisma.mountain.findUnique({
			where: { id: mountainId },
		});
		if (!mountainExists) {
			throw new Error(`Mountain with ID ${mountainId} does not exist.`);
		}

		const locationExists = await prisma.location.findUnique({
			where: { id: locationId },
		});
		if (!locationExists) {
			throw new Error(`Location with ID ${locationId} does not exist.`);
		}

		return await prisma.location.update({
			where: { id: locationId },
			data: {
				...updatedData,
				area: {
					connect: { id: areaId },
				},
				mountain: {
					connect: { id: mountainId },
				},
			},
		});
	}

	static async removeAreaFromLocation(mountainId: string, locationId: string, areaId: string) {
		return await prisma.location.update({
			where: { id: locationId },
			data: {
				area: {
					disconnect: { id: areaId },
				},
			},
		});
	}
}

export default LocationModel;
