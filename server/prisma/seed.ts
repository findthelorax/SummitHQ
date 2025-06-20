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
import { DEPARTMENT, ROLE_LEVEL, LOCATION_TYPE } from '../../client/src/types/generated-enums.js';
import LocationModel from '../src/models/mountains/locationModel.js';

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
            const areas = await prisma.area.findMany({ where: { mountainId: mountain.id } });

            for (const area of areas) {
                const makeAndAttach = async (
                    generator: (mountainId: string, withType?: boolean) => any,
                    count: number,
                    entityType: LOCATION_TYPE
                ): Promise<void> => {
                    const usedNames = new Set<string>();
                    let created = 0;
                    let attempts = 0;
                    const maxAttempts = count * 10;

                    while (created < count && attempts < maxAttempts) {
                        const entityData = generator(mountain.id, true);
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
                                name: createdEntity.name,
                                mountainId: mountain.id,
                                entityId: createdEntity.id,
                                entityType,
                                areaId: area.id,
                            }
                        });
                        // 2. Update the entity to set its locationId
                        switch (entityType) {
                            case LOCATION_TYPE.TRAIL:
                                await prisma.trail.update({
                                    where: { id: createdEntity.id },
                                    data: { locationId: location.id }
                                });
                                break;
                            case LOCATION_TYPE.LIFT:
                                await prisma.lift.update({
                                    where: { id: createdEntity.id },
                                    data: { locationId: location.id }
                                });
                                break;
                            case LOCATION_TYPE.HUT:
                                await prisma.hut.update({
                                    where: { id: createdEntity.id },
                                    data: { locationId: location.id }
                                });
                                break;
                            case LOCATION_TYPE.LODGE:
                                await prisma.lodge.update({
                                    where: { id: createdEntity.id },
                                    data: { locationId: location.id }
                                });
                                break;
                            case LOCATION_TYPE.AIDROOM:
                                await prisma.aidRoom.update({
                                    where: { id: createdEntity.id },
                                    data: { locationId: location.id }
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

                await makeAndAttach(generateTrail, 5, LOCATION_TYPE.TRAIL);
                await makeAndAttach(generateLift, 5, LOCATION_TYPE.LIFT);
                await makeAndAttach(generateHut, 2, LOCATION_TYPE.HUT);
                await makeAndAttach(generateLodge, 2, LOCATION_TYPE.LODGE);
                await makeAndAttach(generateAidRoom, 2, LOCATION_TYPE.AIDROOM);
            }
            console.log(chalk.green(`  - Seeded and attached locations for all areas of ${mountain.name}`));

            // Seed incidents for this mountain (5 per mountain)
            const allLocations = await prisma.location.findMany({ where: { mountainId: mountain.id } });
            // ...existing code...
            for (let i = 0; i < 20; i++) {
                const location = allLocations[Math.floor(Math.random() * allLocations.length)];
                // Generate times
                const callTime = new Date();
                const onSceneTime = new Date(callTime.getTime() + 5 * 60000); // +5 min
                const stableTime = new Date(onSceneTime.getTime() + 10 * 60000); // +10 min
                const transportTime = new Date(stableTime.getTime() + 15 * 60000); // +15 min
            
                const incident = await prisma.incident.create({
                    data: {
                        description: `Incident at ${location.name}`,
                        status: 'REPORTED',
                        latitude: (location as any).latitude ?? 0,
                        longitude: (location as any).longitude ?? 0,
                        mountainId: mountain.id,
                        locationId: location.id,
                        startTime: callTime,
                        onSceneTime: onSceneTime,
                        stableTime: stableTime,
                        transportTime: transportTime,
                    }
                });
                await LocationModel.addIncidentToLocation(location.id, { incidentId: incident.id });
            }
            console.log(chalk.green(`  - Seeded 5 incidents for ${mountain.name}`));

            const equipmentWithMountain = Array.from({ length: 100 }, (_, i) =>
                generateEquipment(mountain.id, i + 1, true)
            );
            await prisma.equipment.createMany({ data: equipmentWithMountain });
            console.log(chalk.green(`  - Seeded 100 equipment for ${mountain.name}`));

            const allRolesFromDb = await prisma.role.findMany();
            const allRoles = allRolesFromDb.map((role) => ({
                ...role,
                department: DEPARTMENT[role.department as keyof typeof DEPARTMENT],
                level: ROLE_LEVEL[role.level as keyof typeof ROLE_LEVEL],
            }));
            const rolesByDepartment = allRoles.reduce((acc, role) => {
                acc[role.department] = acc[role.department] || [];
                acc[role.department].push(role);
                return acc;
            }, {} as Record<string, typeof allRoles>);

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
        }

        // Equipment without mountainId (10)
        const equipmentWithoutMountain = Array.from({ length: 10 }, (_, i) => generateEquipment(undefined, i + 1));
        await prisma.equipment.createMany({ data: equipmentWithoutMountain });
        console.log(chalk.green('✅ Seeded 10 equipment without mountainId.'));

        // Employees without mountain assignment (10)
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