import logger from '../config/logger.js';
import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

export const getAllData = asyncWrapper(async (req: Request, res: Response) => {
    logger.info('GET /api/debug/all-data - Fetching all data');

    const employees = await prisma.employee.findMany();
    const dispatchAssignments = await prisma.dispatcherAssignment.findMany();
    const employeeMountainAssignments = await prisma.employeeMountainAssignment.findMany();

    const roles = await prisma.role.findMany();
    
	const equipment = await prisma.equipment.findMany();

    const mountains = await prisma.mountain.findMany();
    const hours = await prisma.hours.findMany();
    const areas = await prisma.area.findMany();
    const locations = await prisma.location.findMany();
    const aidRooms = await prisma.aidRoom.findMany();
    const huts = await prisma.hut.findMany();
    const lifts = await prisma.lift.findMany();
    const trails = await prisma.trail.findMany();
    const lodges = await prisma.lodge.findMany();
    
	const incidents = await prisma.incident.findMany();

    res.json({
        employees,
        dispatchAssignments,
        employeeMountainAssignments,
        mountains,
        hours,
        equipment,
        areas,
        locations,
        aidRooms,
        huts,
        lifts,
        trails,
        lodges,
        incidents,
        roles,
    });
});

export const deleteAllData = asyncWrapper(async (req: Request, res: Response) => {
    logger.warn('DELETE /api/debug/all-data - Deleting ALL data including roles!');

    // Delete in dependency-safe order
    await prisma.employeeRole.deleteMany();
    await prisma.employeeMountainAssignment.deleteMany();
    await prisma.dispatcherAssignment.deleteMany();
    await prisma.certification.deleteMany();
    await prisma.incidentEquipmentUsageLog.deleteMany();
    await prisma.equipmentServiceLog.deleteMany();
    await prisma.equipmentCheck.deleteMany();
    await prisma.liftCheck.deleteMany();
    await prisma.trailCheck.deleteMany();
    await prisma.aidRoomCheck.deleteMany();
    await prisma.hutCheck.deleteMany();

    await prisma.incident.deleteMany();
    await prisma.equipment.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.aidRoom.deleteMany();
    await prisma.hut.deleteMany();
    await prisma.lodge.deleteMany();
    await prisma.lift.deleteMany();
    await prisma.trail.deleteMany();
    await prisma.location.deleteMany();
    await prisma.area.deleteMany();
    await prisma.weather.deleteMany();
    await prisma.mountain.deleteMany();

    await prisma.role.deleteMany();

    res.json({ message: 'All data deleted.' });
});