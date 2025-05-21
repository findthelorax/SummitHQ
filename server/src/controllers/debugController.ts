import logger from '../config/logger.js';
import { Request, Response } from 'express';
import Employee from '../models/employees/employeeModel.js';
import DispatchAssignment from '../models/employees/dispatchAssignmentModel.js';
import EmployeeMountainAssignmentModel from '../models/employees/employeeMountainAssignmentModel.js';

import Mountain from '../models/mountains/mountainModel.js';
import Hours from '../models/mountains/hoursModel.js';
import Equipment from '../models/equipment/equipmentModel.js';
import Area from '../models/mountains/areaModel.js';
import Location from '../models/mountains/locationModel.js';
import AidRoom from '../models/mountains/aidRoomModel.js';
import Hut from '../models/mountains/hutModel.js';
import Lift from '../models/mountains/liftModel.js';
import Trail from '../models/mountains/trailModel.js';
import Lodge from '../models/mountains/lodgeModel.js';

import Incident from '../models/mountains/incidentModel.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

export const getAllData = asyncWrapper(async (req: Request, res: Response) => {
    logger.info('Fetching employees...');
    const employees = await Employee.findAll();
    logger.info({ employees }, 'Employees fetched');

    logger.info('Fetching dispatchAssignments...');
    const dispatchAssignments = await DispatchAssignment.findAll();
    logger.info({ dispatchAssignments }, 'DispatchAssignments fetched');

    logger.info('Fetching employeeMountainAssignments...');
    const employeeMountainAssignments = await EmployeeMountainAssignmentModel.findAll();
    logger.info({ employeeMountainAssignments }, 'EmployeeMountainAssignments fetched');

    logger.info('Fetching mountains...');
    const mountains = await Mountain.findAll();
    logger.info({ mountains }, 'Mountains fetched');

    logger.info('Fetching hours...');
    const hours = await Hours.findAll();
    logger.info({ hours }, 'Hours fetched');

    logger.info('Fetching equipment...');
    const equipment = await Equipment.findAll();
    logger.info({ equipment }, 'Equipment fetched');

    logger.info('Fetching areas...');
    const areas = await Area.findAll();
    logger.info({ areas }, 'Areas fetched');

    logger.info('Fetching locations...');
    const locations = await Location.findAll();
    logger.info({ locations }, 'Locations fetched');

    logger.info('Fetching aidRooms...');
    const aidRooms = await AidRoom.findAll();
    logger.info({ aidRooms }, 'AidRooms fetched');

    logger.info('Fetching huts...');
    const huts = await Hut.findAll();
    logger.info({ huts }, 'Huts fetched');

    logger.info('Fetching lifts...');
    const lifts = await Lift.findAll();
    logger.info({ lifts }, 'Lifts fetched');

    logger.info('Fetching trails...');
    const trails = await Trail.findAll();
    logger.info({ trails }, 'Trails fetched');

    logger.info('Fetching lodges...');
    const lodges = await Lodge.findAll();
    logger.info({ lodges }, 'Lodges fetched');

    logger.info('Fetching incidents...');
    const incidents = await Incident.findAll();
    logger.info({ incidents }, 'Incidents fetched');

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
    });
});