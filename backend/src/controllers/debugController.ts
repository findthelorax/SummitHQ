import { Request, Response } from 'express';
import Employee from '../models/employees/employeeModel';
import DispatchAssignment from '../models/employees/dispatchAssignmentModel';
import EmployeeMountainAssignmentModel from '../models/employees/employeeMountainAssignmentModel';

import Mountain from '../models/mountains/mountainModel';
import Hours from '../models/mountains/hoursModel';
import Equipment from '../models/mountains/equipmentModel';
import Area from '../models/mountains/areaModel';
import Location from '../models/mountains/locationModel';
import AidRoom from '../models/mountains/aidRoomModel';
import Hut from '../models/mountains/hutModel';
import Lift from '../models/mountains/liftModel';
import Trail from '../models/mountains/trailModel';
import Lodge from '../models/mountains/lodgeModel';

import Incident from '../models/mountains/incidentModel';

export const getAllData = async (req: Request, res: Response) => {
    try {
        console.log('Fetching employees...');
        const employees = await Employee.findAll();
        console.log('Employees fetched:', employees);

        console.log('Fetching dispatchAssignments...');
        const dispatchAssignments = await DispatchAssignment.findAll();
        console.log('DispatchAssignments fetched:', dispatchAssignments);

        console.log('Fetching employeeMountainAssignments...');
        const employeeMountainAssignments = await EmployeeMountainAssignmentModel.findAll();
        console.log('EmployeeMountainAssignments fetched:', employeeMountainAssignments);

        console.log('Fetching mountains...');
        const mountains = await Mountain.findAll();
        console.log('Mountains fetched:', mountains);

        console.log('Fetching hours...');
        const hours = await Hours.findAll();
        console.log('Hours fetched:', hours);

        console.log('Fetching equipment...');
        const equipment = await Equipment.findAll();
        console.log('Equipment fetched:', equipment);

        console.log('Fetching areas...');
        const areas = await Area.findAll();
        console.log('Areas fetched:', areas);

        console.log('Fetching locations...');
        const locations = await Location.findAll();
        console.log('Locations fetched:', locations);

        console.log('Fetching aidRooms...');
        const aidRooms = await AidRoom.findAll();
        console.log('AidRooms fetched:', aidRooms);

        console.log('Fetching huts...');
        const huts = await Hut.findAll();
        console.log('Huts fetched:', huts);

        console.log('Fetching lifts...');
        const lifts = await Lift.findAll();
        console.log('Lifts fetched:', lifts);

        console.log('Fetching trails...');
        const trails = await Trail.findAll();
        console.log('Trails fetched:', trails);

        console.log('Fetching lodges...');
        const lodges = await Lodge.findAll();
        console.log('Lodges fetched:', lodges);

        console.log('Fetching incidents...');
        const incidents = await Incident.findAll();
        console.log('Incidents fetched:', incidents);

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
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data', error });
    }
};