import { prisma } from '../src/config/database.js';
import chalk from 'chalk';
import {
	generateMountain,
	generateTrail,
	generateLift,
	generateLodge,
	generateHut,
	generateAidRoom,
	generateEquipment,
	generateEmployee,
	generateAreasForMountain,
} from '../src/seed-data/faker';
import { getSeedRoles } from '../src/seed-data/roles';
import { DEPARTMENT, ROLE_LEVEL, LOCATION_TYPE, INCIDENT_STATUS } from '../../client/src/types/old/generated-enums.js';
import LocationModel from '../src/models/mountains/locationModel.js';

interface ToTitleCase {
	(str: string): string;
}

const toTitleCase: ToTitleCase = (str: string): string => {
	return str.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
};

async function main() {
	try {
		console.log(chalk.blue('🌄 Seeding mountains...'));
		const mountainCount = 10;
		const createdMountains = [];
		for (let i = 0; i < mountainCount; i++) {
			const mountain = await prisma.mountain.create({
				data: generateMountain(),
			});
			createdMountains.push(mountain);
		}
		console.log(chalk.green(`✅ Seeded ${createdMountains.length} mountains.`));

		const rolesRaw = getSeedRoles();
		const roles = rolesRaw.map((role) => ({
			...role,
			department: DEPARTMENT[role.department as keyof typeof DEPARTMENT],
			level: ROLE_LEVEL[role.level as keyof typeof ROLE_LEVEL],
		}));

		const uniqueRoles = Array.from(
			new Map(roles.map((role) => [`${role.department}-${role.title}-${role.level}`, role])).values()
		);

		await prisma.role.createMany({
			data: uniqueRoles,
			skipDuplicates: true,
		});
		console.log(chalk.green(`✅ Seeded ${uniqueRoles.length} roles.`));

		let allEmployeeIds: string[] = [];
		let allEquipmentIds: string[] = [];

		for (const mountain of createdMountains) {
			const areas = generateAreasForMountain(mountain.id);
			await prisma.area.createMany({ data: areas });
			console.log(chalk.green(`  - Seeded ${areas.length} areas for ${mountain.name}`));
		}

		for (const mountain of createdMountains) {
			for (let day = 0; day < 14; day++) {
				const date = new Date();
				date.setDate(date.getDate() - day);
				await prisma.weather.create({
					data: {
						mountainId: mountain.id,
						date,
						temperature: 25 + Math.random() * 10,
						feelsLikeTemperature: 25 + Math.random() * 10,
						humidity: 50 + Math.random() * 30,
						dewPoint: 10 + Math.random() * 10,
						windSpeed: Math.random() * 20,
						windDirection: 'NW',
						windGust: Math.random() * 30,
						visibility: 10,
						conditions: 'Sunny',
						snowfallRecent: Math.random() * 5,
						snowfall24h: Math.random() * 10,
						snowfall7d: Math.random() * 30,
						snowDepthBase: 50 + Math.random() * 50,
						snowDepthSummit: 100 + Math.random() * 50,
						isSnowmakingPossible: Math.random() > 0.5,
						precipitationType: 'SNOW',
						precipitationIntensity: Math.random(),
						precipitationChance: Math.random(),
						stormWarning: Math.random() > 0.8,
						cloudCoverage: Math.random(),
						uvIndex: Math.floor(Math.random() * 10),
						sunriseTime: new Date(date.setHours(6, 0, 0, 0)),
						sunsetTime: new Date(date.setHours(18, 0, 0, 0)),
					},
				});
			}
		}

		for (const mountain of createdMountains) {
			const areas = await prisma.area.findMany({ where: { mountainId: mountain.id } });

			// Used names sets per entity type, per mountain
			const usedTrailNames: Set<string> = new Set<string>();
			const usedLiftNames: Set<string> = new Set<string>();
			const usedHutNames: Set<string> = new Set<string>();
			const usedLodgeNames: Set<string> = new Set<string>();
			const usedAidRoomNames: Set<string> = new Set<string>();

			const allRolesFromDb = await prisma.role.findMany();
			const allRoles = allRolesFromDb.map((role) => ({
				...role,
				department: DEPARTMENT[role.department as keyof typeof DEPARTMENT],
				level: ROLE_LEVEL[role.level as keyof typeof ROLE_LEVEL],
			}));

			const employeeEmails = new Set<string>();
			const employees = [];
			let empAttempts = 0;
			const maxEmpAttempts = 2000;

			while (employees.length < 100 && empAttempts < maxEmpAttempts) {
				const emp = generateEmployee(allRoles, undefined, true);
				const email = emp.email?.toLowerCase();
				if (email && !employeeEmails.has(email)) {
					employeeEmails.add(email);
					employees.push({ ...emp, email });
				}
				empAttempts++;
			}
			if (employees.length < 100) {
				throw new Error(`Could not generate 100 unique employees for ${mountain.name}.`);
			}
			await prisma.employee.createMany({ data: employees });
			console.log(chalk.green(`  - Seeded 100 employees for ${mountain.name}`));

			const mountainEmployees = await prisma.employee.findMany({
				orderBy: { id: 'desc' },
				take: 100,
			});
			const now = new Date();
			const assignments = mountainEmployees.map((emp) => ({
				employeeId: emp.id,
				mountainId: mountain.id,
				startDate: now,
				endDate: undefined,
			}));
			await prisma.employeeMountainAssignment.createMany({ data: assignments });
			console.log(chalk.green(`  - Seeded and assigned 100 employees for ${mountain.name}`));
			allEmployeeIds.push(...mountainEmployees.map((e) => e.id));

			for (const area of areas) {
				const makeAndAttach = async (
					generator: (mountainId: string, withType?: boolean) => any,
					count: number,
					entityType: LOCATION_TYPE,
					usedNames: Set<string>
				): Promise<void> => {
					let created = 0;
					let attempts = 0;
					const maxAttempts = count * 10;

					while (created < count && attempts < maxAttempts) {
						const entityData = generator(mountain.id, true);

						// Enforce Title Case for trail and lift names
						if (entityType === LOCATION_TYPE.TRAIL || entityType === LOCATION_TYPE.LIFT) {
							entityData.name = toTitleCase(entityData.name);
						}

						if (usedNames.has(entityData.name)) {
							attempts++;
							continue;
						}
						usedNames.add(entityData.name);

						let createdEntity;
						switch (entityType) {
							case LOCATION_TYPE.TRAIL:
								createdEntity = await prisma.trail.create({ data: entityData });
								break;
							case LOCATION_TYPE.LIFT:
								createdEntity = await prisma.lift.create({ data: entityData });
								break;
							case LOCATION_TYPE.HUT:
								createdEntity = await prisma.hut.create({ data: entityData });
								break;
							case LOCATION_TYPE.LODGE:
								createdEntity = await prisma.lodge.create({ data: entityData });
								break;
							case LOCATION_TYPE.AIDROOM:
								createdEntity = await prisma.aidRoom.create({ data: entityData });
								break;
							default:
								throw new Error('Unknown entity type');
						}
						// 1. Create the location
						const location = await prisma.location.create({
							data: {
								name: toTitleCase(createdEntity.name),
								mountainId: mountain.id,
								entityId: createdEntity.id,
								entityType,
								areaId: area.id,
							},
						});
						// 2. Update the entity to set its locationId
						switch (entityType) {
							case LOCATION_TYPE.TRAIL:
								await prisma.trail.update({
									where: { id: createdEntity.id },
									data: { locationId: location.id },
								});
								break;
							case LOCATION_TYPE.LIFT:
								await prisma.lift.update({
									where: { id: createdEntity.id },
									data: { locationId: location.id },
								});
								break;
							case LOCATION_TYPE.HUT:
								await prisma.hut.update({
									where: { id: createdEntity.id },
									data: { locationId: location.id },
								});
								break;
							case LOCATION_TYPE.LODGE:
								await prisma.lodge.update({
									where: { id: createdEntity.id },
									data: { locationId: location.id },
								});
								break;
							case LOCATION_TYPE.AIDROOM:
								await prisma.aidRoom.update({
									where: { id: createdEntity.id },
									data: { locationId: location.id },
								});
								break;
						}
						created++;
						attempts++;
					}
					if (created < count) {
						throw new Error(`Could not generate ${count} unique ${entityType} names for ${mountain.name}.`);
					}
				};

				await makeAndAttach(generateTrail, 15, LOCATION_TYPE.TRAIL, usedTrailNames);
				await makeAndAttach(generateLift, 15, LOCATION_TYPE.LIFT, usedLiftNames);
				await makeAndAttach(generateHut, 2, LOCATION_TYPE.HUT, usedHutNames);
				await makeAndAttach(generateLodge, 2, LOCATION_TYPE.LODGE, usedLodgeNames);
				await makeAndAttach(generateAidRoom, 2, LOCATION_TYPE.AIDROOM, usedAidRoomNames);
			}

			console.log(chalk.green(`  - Seeded and attached locations for all areas of ${mountain.name}`));

			// --- Seed 10 checks for each hut, aid room, lift, and trail ---
			const huts = await prisma.hut.findMany({ where: { mountainId: mountain.id } });
			const aidRooms = await prisma.aidRoom.findMany({ where: { mountainId: mountain.id } });
			const lifts = await prisma.lift.findMany({ where: { mountainId: mountain.id } });
			const trails = await prisma.trail.findMany({ where: { mountainId: mountain.id } });
			const mountainEmployeesForChecks = await prisma.employee.findMany({
				where: {
					mountainAssignments: {
						some: { mountainId: mountain.id },
					},
				},
			});

			const randomEmployee = () =>
				mountainEmployeesForChecks[Math.floor(Math.random() * mountainEmployeesForChecks.length)]?.id;

			for (const hut of huts) {
				for (let i = 0; i < 10; i++) {
					await prisma.hutCheck.create({
						data: {
							mountainId: mountain.id,
							hutId: hut.id,
							employeeId: randomEmployee(),
							notes: `Hut check #${i + 1} for ${hut.name}`,
							equipmentIssues: Math.random() > 0.7,
							equipmentNotes: Math.random() > 0.7 ? 'Broken lantern' : null,
							paperworkStocked: Math.random() > 0.5,
						},
					});
				}
			}

			for (const aidRoom of aidRooms) {
				for (let i = 0; i < 10; i++) {
					await prisma.aidRoomCheck.create({
						data: {
							mountainId: mountain.id,
							aidRoomId: aidRoom.id,
							employeeId: randomEmployee(),
							notes: `Aid room check #${i + 1} for ${aidRoom.name}`,
							equipmentIssues: Math.random() > 0.7,
							equipmentNotes: Math.random() > 0.7 ? 'Restock needed' : null,
							paperworkStocked: Math.random() > 0.5,
						},
					});
				}
			}

			for (const lift of lifts) {
				for (let i = 0; i < 10; i++) {
					await prisma.liftCheck.create({
						data: {
							mountainId: mountain.id,
							liftId: lift.id,
							employeeId: randomEmployee(),
							notes: `Lift check #${i + 1} for ${lift.name}`,
							hazards: Math.random() > 0.8,
							status: Math.random() > 0.5 ? 'OPEN' : 'CLOSED',
						},
					});
				}
			}

			for (const trail of trails) {
				for (let i = 0; i < 10; i++) {
					await prisma.trailCheck.create({
						data: {
							mountainId: mountain.id,
							trailId: trail.id,
							employeeId: randomEmployee(),
							notes: `Trail check #${i + 1} for ${trail.name}`,
							status: Math.random() > 0.5 ? 'OPEN' : 'CLOSED',
							condition: 'PACKED_POWDER',
							hazards: Math.random() > 0.8,
							snowmaking: Math.random() > 0.5,
						},
					});
				}
			}

			console.log(
				chalk.green(`  - Seeded 10 checks for each hut, aid room, lift, and trail for ${mountain.name}`)
			);

			const allLocations = await prisma.location.findMany({
				where: { mountainId: mountain.id },
				include: {
					trail: true,
					lift: true,
					hut: true,
					lodge: true,
					aidRoom: true,
				},
			});

			// Get patrol employees (fallback to all if none)
			const patrolEmployees = mountainEmployeesForChecks.filter((e) => e.primaryDepartment === 'PATROL');
			const employeesForIncidents = patrolEmployees.length > 0 ? patrolEmployees : mountainEmployeesForChecks;

			// Helper to get a random item from an array
			const randomFrom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

			// Shuffle locations to avoid repeats until all are used
			const shuffledLocations = [...allLocations].sort(() => Math.random() - 0.5);

			for (let i = 0; i < 20; i++) {
				// Cycle through locations, then allow repeats
				const location = shuffledLocations[i % shuffledLocations.length];

				// Spread times over the last 20 days, randomize within the day
				const baseDate = new Date();
				baseDate.setDate(baseDate.getDate() - i);
				baseDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);

				const callTime = new Date(baseDate);
				const onSceneTime = new Date(callTime.getTime() + (3 + Math.floor(Math.random() * 7)) * 60000); // +3-10 min
				const stableTime = new Date(onSceneTime.getTime() + (5 + Math.floor(Math.random() * 10)) * 60000); // +5-15 min
				const transportTime = new Date(stableTime.getTime() + (10 + Math.floor(Math.random() * 20)) * 60000); // +10-30 min

				// Get lat/long from related entity or fallback to mountain
				const baseLat =
					location.trail?.latitude ??
					location.lift?.latitude ??
					location.hut?.latitude ??
					location.lodge?.latitude ??
					location.aidRoom?.latitude ??
					mountain.latitude ??
					44.0;
				const baseLong =
					location.trail?.longitude ??
					location.lift?.longitude ??
					location.hut?.longitude ??
					location.lodge?.longitude ??
					location.aidRoom?.longitude ??
					mountain.longitude ??
					-71.0;
				const latitude = Number(baseLat) + (Math.random() - 0.5) * 0.02;
				const longitude = Number(baseLong) + (Math.random() - 0.5) * 0.02;

				// Random status
				const statusList = Object.keys(INCIDENT_STATUS);
				const status = statusList[Math.floor(Math.random() * statusList.length)];

				// Pick 1-3 employees, mostly patrol
				const numEmployees = 1 + Math.floor(Math.random() * 3);
				const selectedEmployees: typeof employeesForIncidents = [];
				for (let j = 0; j < numEmployees; j++) {
					const emp =
						Math.random() < 0.8 && patrolEmployees.length > 0
							? randomFrom(patrolEmployees)
							: randomFrom(mountainEmployeesForChecks);
					selectedEmployees.push(emp);
				}
				// Remove duplicates by id
				const uniqueEmployees = Array.from(new Set(selectedEmployees.map((e) => e.id))).map(
					(id) => selectedEmployees.find((e) => e.id === id)!
				);

				const incident = await prisma.incident.create({
					data: {
						description: `Incident at ${location.name}`,
						status: status as INCIDENT_STATUS,
						latitude,
						longitude,
						mountainId: mountain.id,
						locationId: location.id,
						startTime: callTime,
						onSceneTime: onSceneTime,
						stableTime: stableTime,
						transportTime: transportTime,
						employees: {
							connect: uniqueEmployees.map((e) => ({ id: e.id })),
						},
					},
				});
				await LocationModel.addIncidentToLocation(location.id, { incidentId: incident.id });
			}
			console.log(chalk.green(`  - Seeded 20 incidents for ${mountain.name}`));

			const equipmentWithMountain = Array.from({ length: 100 }, (_, i) =>
				generateEquipment(mountain.id, i + 1, true)
			);
			await prisma.equipment.createMany({ data: equipmentWithMountain });
			console.log(chalk.green(`  - Seeded 100 equipment for ${mountain.name}`));
		}

		const equipmentWithoutMountain = Array.from({ length: 10 }, (_, i) => generateEquipment(undefined, i + 1));
		await prisma.equipment.createMany({ data: equipmentWithoutMountain });
		console.log(chalk.green('✅ Seeded 10 equipment without mountainId.'));

		const employeesWithoutMountain = Array.from({ length: 10 }, () => generateEmployee([], undefined, true));
		await prisma.employee.createMany({ data: employeesWithoutMountain });
		console.log(chalk.green('✅ Seeded 10 employees without mountain assignment.'));

		console.log(chalk.bgGreen.black('🎉 Seeding completed successfully!'));
	} catch (e) {
		console.error(chalk.bgRed.white('❌ Seeding failed!'), e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
