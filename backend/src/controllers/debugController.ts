import { Request, Response } from 'express';
import Employee from '../models/employeeModel';
import Mountain from '../models/mountainModel';
import AidRoom from '../models/aidRoomModel';
import Area from '../models/areaModel';
import DispatchAssignment from '../models/dispatchAssignmentModel';
import Equipment from '../models/equipmentModel';
import Hours from '../models/hoursModel';
import Hut from '../models/hutModel';
import Lift from '../models/liftModel';
import Location from '../models/locationModel';
import Trail from '../models/trailModel';

export const getAllData = async (req: Request, res: Response) => {
    try {
        console.log('Fetching employees...');
        const employees = await Employee.findAll();
        console.log('Employees fetched:', employees);

        console.log('Fetching mountains...');
        const mountains = await Mountain.findAll();
        console.log('Mountains fetched:', mountains);

        console.log('Fetching aidRooms...');
        const aidRooms = await AidRoom.findAll();
        console.log('AidRooms fetched:', aidRooms);

        console.log('Fetching areas...');
        const areas = await Area.findAll();
        console.log('Areas fetched:', areas);

        console.log('Fetching dispatchAssignments...');
        const dispatchAssignments = await DispatchAssignment.findAll();
        console.log('DispatchAssignments fetched:', dispatchAssignments);

        console.log('Fetching equipment...');
        const equipment = await Equipment.findAll();
        console.log('Equipment fetched:', equipment);

        console.log('Fetching hours...');
        const hours = await Hours.findAll();
        console.log('Hours fetched:', hours);

        console.log('Fetching huts...');
        const huts = await Hut.findAll();
        console.log('Huts fetched:', huts);

        console.log('Fetching lifts...');
        const lifts = await Lift.findAll();
        console.log('Lifts fetched:', lifts);

        console.log('Fetching locations...');
        const locations = await Location.findAll();
        console.log('Locations fetched:', locations);

        console.log('Fetching trails...');
        const trails = await Trail.findAll();
        console.log('Trails fetched:', trails);

        res.json({
            employees,
            mountains,
            aidRooms,
            areas,
            dispatchAssignments,
            equipment,
            hours,
            huts,
            lifts,
            locations,
            trails,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data', error });
    }
};