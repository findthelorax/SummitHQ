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
    const employees = await Employee.findAll();
    const dispatchAssignments = await DispatchAssignment.findAll();
    const employeeMountainAssignments = await EmployeeMountainAssignmentModel.findAll();
    const mountains = await Mountain.findAll();
    const hours = await Hours.findAll();
    const equipment = await Equipment.findAll();
    const areas = await Area.findAll();
    const locations = await Location.findAll();
    const aidRooms = await AidRoom.findAll();
    const huts = await Hut.findAll();
    const lifts = await Lift.findAll();
    const trails = await Trail.findAll();
    const lodges = await Lodge.findAll();
    const incidents = await Incident.findAll();

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